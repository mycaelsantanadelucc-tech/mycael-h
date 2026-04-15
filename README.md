<!DOCTYPE html>
<html lang="pt-pt">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Workjammers - SaaS Performance Arena</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;500;700&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Space Grotesk', sans-serif;
            background-color: #0d1117;
            color: #ffffff;
            overflow: hidden;
            height: 100vh;
        }

        /* Cores e Estilos do Jogo */
        .arcade-top-bar {
            background-color: #1a2230;
            border-bottom: 3px solid #000;
        }

        .sidebar {
            background-color: #1b263b;
            border-right: 2px solid #000;
        }

        .arena-container {
            background-color: #f1d592; /* Cor da areia */
            background-image: 
                radial-gradient(#e6c17a 15%, transparent 16%),
                radial-gradient(#e6c17a 15%, transparent 16%);
            background-size: 30px 30px;
            background-position: 0 0, 15px 15px;
            position: relative;
        }

        .court-border {
            border: 4px solid #ffffff;
            box-shadow: 0 0 0 4px #000;
        }

        .net-line {
            background: repeating-linear-gradient(
                to bottom,
                #ffffff,
                #ffffff 10px,
                #cbd5e1 10px,
                #cbd5e1 20px
            );
        }

        .kpi-zone-yellow { background-color: #fff200; border-right: 4px solid #000; }
        .kpi-zone-red { background-color: #ed1c24; border-left: 4px solid #000; }

        .mono { font-family: 'JetBrains Mono', monospace; }

        /* Animações e Efeitos */
        .disc-glow {
            filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.8));
        }

        .player-shadow {
            background: rgba(0, 0, 0, 0.2);
            border-radius: 50%;
            width: 50px;
            height: 15px;
            position: absolute;
            bottom: -5px;
            left: 50%;
            transform: translateX(-50%);
        }

        .scanlines {
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
            background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.1) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.03), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.03));
            background-size: 100% 3px, 3px 100%;
            pointer-events: none;
            z-index: 50;
        }
    </style>
</head>
<body class="flex flex-col">
    <div class="scanlines"></div>

    <!-- Barra de Topo (Stats) -->
    <header class="arcade-top-bar flex items-center justify-between px-4 py-2 text-[11px] font-bold uppercase tracking-tight z-20">
        <div class="flex items-center gap-6">
            <div class="flex flex-col">
                <span class="text-slate-400 text-[9px]">Featured Contributor:</span>
                <div class="flex items-center gap-2">
                    <span class="bg-white px-1.5 py-0.5 rounded text-black flex items-center gap-1">
                        <span class="w-3 h-2 bg-red-600 rounded-sm"></span>
                    </span>
                    <span class="text-white text-sm">HIROMI MITA (JPN)</span>
                </div>
                <span class="text-slate-400 text-[9px]">Collaboration Score: 15</span>
            </div>
            <div class="text-center border-x border-slate-700 px-4">
                <span class="text-slate-400">Set:</span>
                <div class="text-xl text-white italic">15</div>
            </div>
        </div>

        <div class="text-center">
            <div class="flex items-center justify-center gap-1 text-white italic text-lg leading-none">
                <span class="text-blue-400">WORK</span><span class="text-cyan-300">JAMMERS</span>
            </div>
            <div class="text-[9px] text-slate-300 tracking-[0.2em] font-light">SAAS PERFORMANCE</div>
        </div>

        <div class="flex items-center gap-6">
            <div class="text-center border-x border-slate-700 px-4">
                <span class="text-slate-400">Cycle Time:</span>
                <div class="text-xl text-blue-400 mono italic">0'48"</div>
            </div>
            <div class="text-right flex flex-col items-end">
                <span class="text-slate-400 text-[9px]">Featured Contributor:</span>
                <div class="flex items-center gap-2">
                    <span class="text-white text-sm">GARY SCOTT (USA)</span>
                    <span class="bg-blue-900 px-1.5 py-0.5 rounded flex items-center">
                        <span class="text-[8px]">🇺🇸</span>
                    </span>
                </div>
                <span class="text-slate-400 text-[9px]">Resolution Score: 10</span>
            </div>
        </div>
    </header>

    <div class="flex flex-1 overflow-hidden">
        <!-- Sidebar Esquerda -->
        <aside class="sidebar w-16 lg:w-20 flex flex-col items-center py-6 gap-8 z-20">
            <div class="w-10 h-10 bg-cyan-500 rounded-lg flex items-center justify-center shadow-[0_0_10px_rgba(6,182,212,0.5)]">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            </div>
            <nav class="flex flex-col gap-6 text-slate-400">
                <div class="flex flex-col items-center gap-1 cursor-pointer hover:text-white transition-colors">
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/></svg>
                    <span class="text-[8px] font-bold uppercase">Dashboard</span>
                </div>
                <div class="flex flex-col items-center gap-1 cursor-pointer hover:text-white">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2z"/></svg>
                    <span class="text-[8px] font-bold uppercase">Projects</span>
                </div>
                <div class="flex flex-col items-center gap-1 cursor-pointer hover:text-white">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
                    <span class="text-[8px] font-bold uppercase">Analytics</span>
                </div>
                <div class="flex flex-col items-center gap-1 cursor-pointer hover:text-white">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
                    <span class="text-[8px] font-bold uppercase">Users</span>
                </div>
            </nav>
            <div class="mt-auto mb-4 cursor-pointer text-slate-500 hover:text-white">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
            </div>
        </aside>

        <!-- Arena Principal -->
        <main class="flex-1 arena-container p-8 flex items-center justify-center">
            
            <!-- Campo de Jogo -->
            <div class="w-full h-full max-w-5xl max-h-[600px] court-border relative flex">
                
                <!-- Banners do Topo do Campo -->
                <div class="absolute -top-12 inset-x-0 flex justify-between px-4">
                    <div class="bg-[#1e293b] px-6 py-1 border-2 border-black flex items-center gap-2">
                        <span class="text-blue-400 font-black italic">SNK</span>
                    </div>
                    <div class="bg-red-600 px-6 py-1 border-2 border-black">
                        <span class="text-white font-black italic italic">Jann</span>
                    </div>
                    <div class="bg-black px-6 py-1 border-2 border-black flex items-center gap-2">
                        <span class="text-orange-400 font-black italic">DATA EAST</span>
                    </div>
                </div>

                <!-- Zona Amarela (KPI A) -->
                <div class="kpi-zone-yellow w-24 flex items-center justify-center">
                    <div class="rotate-[-90deg] whitespace-nowrap text-black font-black text-center">
                        <p class="text-[8px] uppercase leading-none">Value Zone:</p>
                        <h3 class="text-2xl leading-none">KPI A</h3>
                        <p class="text-[10px] uppercase">(MIN)</p>
                    </div>
                </div>

                <!-- Centro do Campo -->
                <div class="flex-1 relative flex items-center">
                    <!-- Linha Central (Rede) -->
                    <div class="absolute inset-y-0 left-1/2 -translate-x-1/2 w-4 flex flex-col items-center z-10">
                        <div class="w-6 h-12 bg-blue-500 border-2 border-black -mt-4 rounded-full"></div>
                        <div class="flex-1 w-2 net-line border-x-2 border-black"></div>
                        <div class="w-6 h-12 bg-blue-500 border-2 border-black -mb-4 rounded-full"></div>
                    </div>

                    <!-- Linhas do Campo -->
                    <div class="absolute inset-0 grid grid-cols-2">
                        <div class="border-r-2 border-cyan-400/40 opacity-50"></div>
                        <div></div>
                    </div>

                    <!-- Jogador 1 (Esquerda) -->
                    <div class="absolute left-20 top-1/2 -translate-y-1/2 z-20">
                        <div class="player-shadow"></div>
                        <!-- Emoji/Representação Visual -->
                        <div class="relative text-6xl animate-bounce" style="animation-duration: 0.8s">
                            👩🏻‍🎤
                        </div>
                    </div>

                    <!-- O DISCO (SaaS Data) -->
                    <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
                        <div class="w-16 h-10 bg-orange-400 rounded-full border-4 border-white disc-glow flex items-center justify-center shadow-lg transform rotate-[-15deg]">
                            <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"/><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"/></svg>
                        </div>
                        <!-- Efeito de rasto -->
                        <div class="absolute right-full top-1/2 -translate-y-1/2 w-32 h-4 bg-gradient-to-l from-white/60 to-transparent"></div>
                    </div>

                    <!-- Jogador 2 (Direita) -->
                    <div class="absolute right-20 top-1/3 z-20">
                        <div class="player-shadow"></div>
                        <div class="relative text-7xl transform -scale-x-100">
                            🤾🏼‍♂️
                        </div>
                    </div>
                </div>

                <!-- Zona Vermelha (KPI B) -->
                <div class="kpi-zone-red w-24 flex items-center justify-center">
                    <div class="rotate-[-90deg] whitespace-nowrap text-white font-black text-center">
                        <p class="text-[8px] uppercase leading-none">Value Zone:</p>
                        <h3 class="text-2xl leading-none">KPI B</h3>
                        <p class="text-[10px] uppercase">(MAX)</p>
                    </div>
                </div>

                <!-- Banners do Fundo do Campo -->
                <div class="absolute -bottom-12 inset-x-0 flex justify-center gap-8 px-4">
                    <div class="bg-blue-800 px-6 py-1 border-2 border-black flex items-center gap-2">
                        <span class="text-white font-black italic">SNK SYNC</span>
                    </div>
                    <div class="bg-slate-800 px-6 py-1 border-2 border-black flex items-center gap-2">
                        <span class="text-cyan-400 font-black italic">NEO GEO CORE</span>
                    </div>
                </div>
            </div>

            <!-- Público Lateral (Direita) -->
            <div class="absolute right-4 inset-y-0 flex flex-col justify-center gap-2 opacity-80 scale-75 lg:scale-100">
                <div class="w-12 h-16 bg-blue-900 border-2 border-black rounded relative overflow-hidden flex flex-col items-center p-1">
                    <span class="text-xs">👤</span>
                    <span class="text-[8px] font-bold">ENG</span>
                </div>
                <div class="w-12 h-16 bg-slate-800 border-2 border-black rounded relative overflow-hidden flex flex-col items-center p-1">
                    <span class="text-xs">👤</span>
                    <span class="text-[8px] font-bold">SALE</span>
                </div>
                <div class="w-12 h-16 bg-red-900 border-2 border-black rounded relative overflow-hidden flex flex-col items-center p-1">
                    <span class="text-xs">👤</span>
                    <span class="text-[8px] font-bold">DEV</span>
                </div>
            </div>

            <!-- Palmeiras Decorativas -->
            <div class="absolute bottom-4 left-4 text-6xl animate-pulse">🌴</div>
            <div class="absolute bottom-4 right-4 text-6xl animate-pulse" style="animation-delay: 1s">🌴</div>
        </main>
    </div>

    <!-- Barra Inferior de Navegação de Atletas -->
    <footer class="h-10 bg-slate-900 border-t-2 border-black flex items-center justify-center gap-12 text-[10px] font-bold uppercase tracking-widest overflow-hidden">
        <div closs="flex items-center gap-4 text-blue-400">
            <span class="border-b-2 border-blue-400">SNK Sync Active</span>
            <span class="text-slate-600">|</span>
            <div class="flex -space-x-1">
                <div class="w-4 h-4 rounded-full bg-yellow-500 border border-black"></div>
                <div class="w-4 h-4 rounded-full bg-blue-500 border border-black"></div>
            </div>
        </div>
        <div class="flex items-center gap-4 text-slate-400">
            <span class="text-slate-600 italic">Neo Geo Analytics v.4.0</span>
        </div>
    </footer>

</body>
</html>
