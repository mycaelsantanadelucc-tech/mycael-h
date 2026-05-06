const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const gameState = {
  players: {},
  playersReady: { 1: false, 2: false },
  disc: { x: 0, z: 0, vx: 0.35, vz: 0 },
  scores: { a: 0, b: 0 },
  running: false,
  startTime: null,
  duration: 5 * 60 * 1000
};

const ARENA_X = 20;
const ARENA_Z = 12.5;
const DISC_RADIUS = 1.2;

function launchDisc() {
  gameState.disc.x = 0;
  gameState.disc.z = 0;
  gameState.disc.vx = (Math.random() > 0.5 ? 1 : -1) * 0.35;
  gameState.disc.vz = (Math.random() - 0.5) * 0.4;
}

function updateGame() {
  if (!gameState.running || !gameState.startTime) return;

  const elapsed = Date.now() - gameState.startTime;
  if (elapsed >= gameState.duration) {
    gameState.running = false;
    io.emit('gameOver', gameState.scores);
    return;
  }

  gameState.disc.x += gameState.disc.vx;
  gameState.disc.z += gameState.disc.vz;

  if (Math.abs(gameState.disc.z) > ARENA_Z - DISC_RADIUS) {
    gameState.disc.vz *= -1;
    gameState.disc.z = Math.sign(gameState.disc.z) * (ARENA_Z - DISC_RADIUS);
  }

  if (gameState.disc.x > ARENA_X + 2) {
    gameState.scores.a++;
    io.emit('scoreUpdate', gameState.scores);
    launchDisc();
  } else if (gameState.disc.x < -ARENA_X - 2) {
    gameState.scores.b++;
    io.emit('scoreUpdate', gameState.scores);
    launchDisc();
  }

  Object.values(gameState.players).forEach(player => {
    if (player.id === gameState.disc.x < 0 ? 1 : 2) {
      const p1 = gameState.players[1];
      const p2 = gameState.players[2];
      if (p1 && p2) {
        if (gameState.disc.x < -17 && Math.abs(gameState.disc.z - p1.z) < 3.5 && gameState.disc.vx < 0) {
          gameState.disc.vx *= -1.05;
        }
        if (gameState.disc.x > 17 && Math.abs(gameState.disc.z - p2.z) < 3.5 && gameState.disc.vx > 0) {
          gameState.disc.vx *= -1.05;
        }
      }
    }
  });

  io.emit('gameState', gameState);
}

setInterval(updateGame, 1000 / 60);

io.on('connection', (socket) => {
  const playerCount = Object.keys(gameState.players).length;
  
  if (playerCount >= 2) {
    socket.emit('full');
    return;
  }

  const playerId = playerCount === 0 ? 1 : 2;
  gameState.players[playerId] = {
    id: playerId,
    x: playerId === 1 ? -18.5 : 18.5,
    z: 0
  };

  socket.playerId = playerId;

  socket.emit('init', { playerId, gameState });
  io.emit('playerCount', Object.keys(gameState.players).length);

  if (playerCount === 1) {
    io.emit('waiting', false);
  }

  socket.on('playerMove', (data) => {
    const player = gameState.players[socket.playerId];
    if (player) {
      player.z = Math.max(-9.5, Math.min(9.5, data.z));
      socket.broadcast.emit('playerMove', { playerId: socket.playerId, z: player.z });
    }
  });

  socket.on('setReady', (ready) => {
    gameState.playersReady[socket.playerId] = ready;
    io.emit('readyUpdate', gameState.playersReady);
  });

  socket.on('playerVisuals', (data) => {
    socket.broadcast.emit('playerVisuals', data);
  });

  socket.on('startGame', () => {
    if (Object.keys(gameState.players).length === 2) {
      gameState.running = true;
      gameState.startTime = Date.now();
      gameState.scores = { a: 0, b: 0 };
      launchDisc();
      io.emit('gameStarted');
    }
  });

  socket.on('disconnect', () => {
    delete gameState.players[socket.playerId];
    gameState.playersReady[socket.playerId] = false;
    gameState.running = false;
    io.emit('playerDisconnected', socket.playerId);
    io.emit('playerCount', Object.keys(gameState.players).length);
    io.emit('readyUpdate', gameState.playersReady);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});