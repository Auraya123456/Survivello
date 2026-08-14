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
    
    // Aktuální pozice hráče (zatím fixní do implementace kroku 1.2)
    playerX: 0,
    playerY: 0,

    init: function() {
        console.log("Inicializace enginu (Krok 1.1) spuštěna...");
        this.updateView();
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

    // Aktualizuje vizuál podle aktuálního biomu
    updateView: function() {
        const currentBiome = this.getBiome(this.playerX, this.playerY);
        
        // Aktualizujeme UI texty
        document.getElementById('biome-title').innerText = currentBiome;
        document.getElementById('debug-info').innerText = `Souřadnice: X:${this.playerX}, Y:${this.playerY}`;

        // Změna provizorní barvy pozadí podle biomu
        const gameView = document.getElementById('game-view');
        if (currentBiome === "Jezero") {
            gameView.style.backgroundColor = "#122a3a"; // Tmavě modrá
        } else if (currentBiome === "Louka") {
            gameView.style.backgroundColor = "#2a3a12"; // Vybledlá zelená
        } else if (currentBiome === "Les") {
            gameView.style.backgroundColor = "#0f1a0f"; // Velmi tmavě zelená
        } else if (currentBiome === "Město") {
            gameView.style.backgroundColor = "#2b0a0a"; // Černo-červená
        }
    }
};

// Spuštění po plném načtení HTML
window.onload = () => {
    Game.init();
};
