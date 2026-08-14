Extra instrukce:  
Jsem začátečník, udržuj kód jednoduchý (nepřidávej zbytečné knihovny třetích stran)  
Vše automaticky posílej do githubu  
Přidávej do kódu občasné poznámky s vysvětlením, co daná část dělá  
Nezakládej bez přímého příkazu nové md soubory  
Udržuj v md souboru s názvem ToDo záznamy, co je ještě potřeba udělat

---

## Mapa projektu a poznámky (Survivello)

Tato sekce slouží jako přehled o tom, kde se co v projektu nachází, abychom se v něm neztráceli.

### Struktura souborů a dokumentace
* **`AGENTS.md`**: Tento soubor, obsahuje instrukce, pravidla a mapu projektu.
* **`Zaznamy/ToDo.md`**: Záznamy o úkolech (průběžně aktualizováno).
* **`PostupACil/Survival_VisualNovellHra.md`**: Hlavní Game Design Document (GDD). Obsahuje celkový koncept (příběh, permadeath, meta-progrese, 6 statistik, inventář, crafting, správu týmu a boj).
* **`PostupACil/Faze.md`**: Rozdělení celého vývoje do 5 hlavních fází s rozdělením práce na kód (Antigravity) a grafiku/scénář (Uživatel).
* **`PostupACil/RozpracovanaFaze1.md`**: Detailní plán 1. fáze (od nuly k průzkumu) – pohyb, generování mapy (Perlin Noise), Fog of War a příprava UI/grafiky (poměr 16:9).

### Klíčové body pro vývoj
* **Technologie**: Čistý JavaScript, HTML/CSS. Hra je 2D grid-based, žádné 3D (bez zbytečných knihoven třetích stran).
* **Základ mechanik**: Hráč se pohybuje pomocí WASD/šipek po skryté logické mapě (šachovnici), odkrývá Fog of War a podle biomu se mění statické pozadí.
* **Role**: Já (Antigravity) řeším kód a generování. Ty řešíš grafiku a scénáře. Musím ti včas předat rozměry pro grafiku (pixely pro grid, UI, pozadí), abys mohl kreslit.
* **Další postup**: Podle Fáze 1 se aktuálně chystáme nastavit základní engine, okno a skrytou mapu s generováním biomů.