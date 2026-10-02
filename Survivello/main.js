/**
 * Modul pro generování 2D šumu (Perlin/Value noise přístup).
 * Jelikož nemáme používat zbytečné knihovny 3. stran, toto je 
 * minimalistická vlastní implementace šumu pro generování mapy v krocích.
 */
const MapGenerator = {
    // Jednoduchá pseudonáhodná hash funkce pro souřadnice
    random2D: function(x, y) {
        // Deterministický náhodný generátor založený na souřadnicích
        let n = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
        return n - Math.floor(n);
    },

    // Plynulá interpolace mezi dvěma body
    interpolate: function(a, b, t) {
        // Cosine interpolace pro jemnější přechody
        const f = (1 - Math.cos(t * Math.PI)) * 0.5;
        return a * (1 - f) + b * f;
    },

    // Získání vyhlazené hodnoty (šumu) na konkrétních souřadnicích
    smoothNoise: function(x, y) {
        const intX = Math.floor(x);
        const intY = Math.floor(y);
        const fracX = x - intX;
        const fracY = y - intY;

        // Hodnoty v rozích čtverce
        const v1 = this.random2D(intX, intY);
        const v2 = this.random2D(intX + 1, intY);
        const v3 = this.random2D(intX, intY + 1);
        const v4 = this.random2D(intX + 1, intY + 1);

        // Interpolace na ose X
        const i1 = this.interpolate(v1, v2, fracX);
        const i2 = this.interpolate(v3, v4, fracX);
        
        // Interpolace na ose Y
        return this.interpolate(i1, i2, fracY);
    },

    // Hlavní funkce pro získání hodnoty mapy (skládání oktáv pro reálnější shluky)
    getNoiseValue: function(x, y, scale = 0.2) {
        const val1 = this.smoothNoise(x * scale, y * scale);
        const val2 = this.smoothNoise(x * scale * 2, y * scale * 2) * 0.5;
        return (val1 + val2) / 1.5; // Vrací zhruba 0.0 až 1.0
    }
};

/**
 * Hlavní objekt hry (Engine)
 */
const Game = {
    map: {}, // Uchovává objevené biomy. Klíč je např. "0,0"
    
    // Aktuální pozice hráče
    playerX: 0,
    playerY: 0,
    
    isMapOpen: false, // Zda je zobrazeno rozhraní mapy

    // Krok 2.1: Interní statistiky
    stats: {
        food: 100,
        water: 100,
        energy: 100,
        health: 100,
        sanity: 100,
        temperature: 100
    },

    // Krok 2.1: Čas a prostředí
    time: {
        minutes: 0, // Od 0 do 1440 (24h)
        day: 1,
        isNight: false,
        weather: "Slunce"
    },
    
    timeTickInterval: null,

    init: function() {
        console.log("Inicializace enginu (Krok 1.1 a 2.1) spuštěna...");
        this.setupControls();
        this.updateView();
        
        // Spuštění reálného času (např. 1 herní minuta za každé 2 vteřiny reálného času)
        this.timeTickInterval = setInterval(() => {
            if (!this.isMapOpen) { // Možná nechceme, aby čas plynul při čtení mapy? Pro survival je to spíš lepší.
                this.tickTime(1);
            }
        }, 2000);
    },

    // Krok 1.2: Zprovoznění pohybu a klávesnice
    setupControls: function() {
        window.addEventListener('keydown', (e) => {
            if (this.isMapOpen) {
                // Pokud je mapa otevřená, na M nebo Escape ji zavřeme
                if (e.key === 'm' || e.key === 'M' || e.key === 'Escape') {
                    this.toggleMap();
                }
                return; // Zamezení pohybu, když koukáme do mapy
            }

            let moved = false;
            switch(e.key) {
                case 'ArrowUp':
                case 'w':
                case 'W':
                    this.playerY--;
                    moved = true;
                    break;
                case 'ArrowDown':
                case 's':
                case 'S':
                    this.playerY++;
                    moved = true;
                    break;
                case 'ArrowLeft':
                case 'a':
                case 'A':
                    this.playerX--;
                    moved = true;
                    break;
                case 'ArrowRight':
                case 'd':
                case 'D':
                    this.playerX++;
                    moved = true;
                    break;
                case 'm':
                case 'M':
                    this.toggleMap();
                    break;
            }

            if (moved) {
                // Skok v čase při pohybu (např. 15 minut na políčko)
                this.tickTime(15);
                this.updateView();
            }
        });

        // UI tlačítka pro mapu
        document.getElementById('map-icon').addEventListener('click', () => this.toggleMap());
        document.getElementById('close-map-btn').addEventListener('click', () => this.toggleMap());
    },

    toggleMap: function() {
        this.isMapOpen = !this.isMapOpen;
        const mapOverlay = document.getElementById('map-overlay');
        if (this.isMapOpen) {
            mapOverlay.style.display = 'flex';
            this.drawMap();
        } else {
            mapOverlay.style.display = 'none';
        }
    },

    // Krok 1.2: Vykreslení Fog of War mapy (zobrazí pouze objevené)
    drawMap: function() {
        const canvas = document.getElementById('map-canvas');
        const ctx = canvas.getContext('2d');
        
        // Vyčištění plátna černou barvou (Fog of War pro neobjevená místa)
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const tileSize = 20; // Provizorní velikost jednoho políčka
        
        // Střed mapy (aktuální pozice hráče)
        const centerX = Math.floor(canvas.width / 2);
        const centerY = Math.floor(canvas.height / 2);

        // Zjistíme, kolik políček se vejde na obrazovku pro vykreslení
        const halfTilesX = Math.floor(canvas.width / (tileSize * 2)) + 1;
        const halfTilesY = Math.floor(canvas.height / (tileSize * 2)) + 1;

        // Procházíme souřadnice kolem hráče a vykreslíme jen to, co známe z this.map
        for (let y = this.playerY - halfTilesY; y <= this.playerY + halfTilesY; y++) {
            for (let x = this.playerX - halfTilesX; x <= this.playerX + halfTilesX; x++) {
                const key = `${x},${y}`;
                if (this.map[key]) {
                    // Políčko už bylo objeveno
                    const biome = this.map[key];
                    if (biome === "Jezero") ctx.fillStyle = "#122a3a";
                    else if (biome === "Louka") ctx.fillStyle = "#2a3a12";
                    else if (biome === "Les") ctx.fillStyle = "#0f1a0f";
                    else if (biome === "Město") ctx.fillStyle = "#2b0a0a";
                    
                    const drawX = centerX + (x - this.playerX) * tileSize - (tileSize/2);
                    const drawY = centerY + (y - this.playerY) * tileSize - (tileSize/2);
                    ctx.fillRect(drawX, drawY, tileSize, tileSize);
                }
            }
        }
        
        // Vykreslení ukazatele hráče (bílá tečka)
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(centerX, centerY, tileSize / 4, 0, 2 * Math.PI);
        ctx.fill();
    },

    // Určí biom na základě souřadnic a vygenerovaného šumu
    getBiome: function(x, y) {
        const key = `${x},${y}`;
        
        // Pokud jsme zde už byli, vrátíme uložený biom z naší logické mapy
        if (this.map[key]) {
            return this.map[key];
        }

        // Pokud ne, vygenerujeme ho. Hodnota zhruba 0.0 až 1.0
        const noiseValue = MapGenerator.getNoiseValue(x, y);
        
        let biome = "Neznámý";
        
        // Rozdělení hodnot Perlin noise do 4 biomů, aby tvořily přirozené shluky
        if (noiseValue < 0.3) {
            biome = "Jezero";
        } else if (noiseValue < 0.5) {
            biome = "Louka";
        } else if (noiseValue < 0.7) {
            biome = "Les";
        } else {
            biome = "Město";
        }

        // Uložíme biom do skryté logické mapy, aby tam zůstal trvale
        this.map[key] = biome;
        return biome;
    },

    // Získá konkrétní obrázek biomu (náhodná varianta závislá na souřadnicích)
    getBiomeImage: function(biome, x, y) {
        // Použijeme pseudo-náhodnost, aby se pro stejné souřadnice vrátil vždy stejný obrázek.
        // random2D vrací číslo 0.0 - 1.0. Chceme výsledek 1 nebo 2.
        const variant = Math.floor(MapGenerator.random2D(x * 1.5, y * 1.5) * 2) + 1;
        
        switch (biome) {
            case "Město": return `Pictures/town_${variant}.png`;
            case "Les": return `Pictures/forest_${variant}.png`;
            case "Louka": return `Pictures/field_${variant}.png`;
            case "Jezero": return `Pictures/lake_${variant}.png`;
            default: return "";
        }
    },

    // Krok 2.1: Odbavování času
    tickTime: function(minutesToAdd) {
        this.time.minutes += minutesToAdd;
        
        // Přechod dnů
        while (this.time.minutes >= 1440) {
            this.time.minutes -= 1440;
            this.time.day++;
        }
        
        // Vyhodnocení dne a noci (Noc je např. od 20:00 do 06:00)
        this.time.isNight = (this.time.minutes >= 1200 || this.time.minutes < 360);
        
        // Změna počasí (zjednodušená šance s plynoucím časem)
        // Např. každou minutu je 0.1% šance na změnu, takže při 15 min pohybu je to 1.5% šance
        if (Math.random() < 0.001 * minutesToAdd) {
            const weathers = ["Slunce", "Déšť", "Sníh"];
            this.time.weather = weathers[Math.floor(Math.random() * weathers.length)];
        }
        
        // TODO v Kroku 2.2 a 2.3: Zde budou statistiky (food, water atd.) reálně klesat
        
        this.updateDebugInfo();
    },

    // Oddělená aktualizace UI pro texty (aby se updatovaly i při tikání reálného času)
    updateDebugInfo: function() {
        const h = Math.floor(this.time.minutes / 60);
        const m = this.time.minutes % 60;
        const timeStr = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
        
        document.getElementById('debug-info').innerText = 
            `Souřadnice: X:${this.playerX}, Y:${this.playerY} | Den: ${this.time.day} | Čas: ${timeStr} | Fáze: ${this.time.isNight ? 'Noc' : 'Den'} | Počasí: ${this.time.weather}`;
    },

    // Aktualizuje vizuál podle aktuálního biomu
    updateView: function() {
        const currentBiome = this.getBiome(this.playerX, this.playerY);
        
        // Aktualizujeme UI texty
        document.getElementById('biome-title').innerText = currentBiome;
        this.updateDebugInfo();

        // Změna pozadí za obrázek podle biomu a konkrétní souřadnice
        const gameView = document.getElementById('game-view');
        const imgPath = this.getBiomeImage(currentBiome, this.playerX, this.playerY);
        
        if (imgPath) {
            gameView.style.backgroundImage = `url('${imgPath}')`;
            gameView.style.backgroundSize = "cover";
            gameView.style.backgroundPosition = "center";
            // Zrušíme případnou barvu z placeholderu
            gameView.style.backgroundColor = "transparent";
        } else {
            // Fallback (nemělo by nastat)
            gameView.style.backgroundImage = "none";
            gameView.style.backgroundColor = "#2b0a0a";
        }
    }
};

// Spuštění po plném načtení HTML
window.onload = () => {
    Game.init();
};
