### **Kompletní plán vývoje (5 fází)**

**Fáze 1: Základní rozhraní (UI), prostředí a mapa**

* **Tvoje práce (Grafika):** Nakreslíš černo-červené pozadí, šedé ikony, tlačítka akcí a podobu mřížkového inventáře. Dále připravíš 2D statické pohledy na lokace "zepředu" a navrhneš design 8 tlačítek pro spodní akční lištu.  
* **Práce antigravity (Kód):** Nastaví základní okno hry v JavaScriptu a vygeneruje logickou mapu s biomy. Naprogramuje zobrazování UI a zajistí, aby se při přesunu (pomocí WASD nebo šipek) správně přepínalo pozadí lokací.

**Fáze 2: Statistiky postavy a herní smyčka**

* **Tvoje práce (Design a Grafika):** Určíš v tabulce, jak rychle klesají potřeby. Nakreslíš ikony pro 6 statistik: Jídlo, Voda, Energie, Zdraví, Příčetnost a Teplo. Připravíš vizuály pro změny počasí (slunce, déšť, sníh).  
* **Práce antigravity (Kód):** Naprogramuje klesání statistik, denní cyklus (den a noc) a vliv počasí na postavu. Implementuje systém permadeath – při smrti postavy se uložená pozice smaže, ale odhalené příběhové informace se uloží do Hlavního menu.

**Fáze 3: Inventář a Crafting**

* **Tvoje práce (Grafika a Text):** Nakreslíš předměty tak, aby v mřížce zabíraly odlišný počet čtverečků. Navrhneš recepty a stacionární objekty, jako je přístřešek a ohniště.  
* **Práce antigravity (Kód):** Vytvoří logiku pro mřížkový inventář (aby po zaplnění nešly přidat další věci). Rozdělí crafting na stacionární objekty (tvořené přes spodní tlačítka) a přenosné předměty (přímo v inventáři).

**Fáze 4: Příběh, cutscény a halucinace (Visual Novel prvky)**

* **Tvoje práce (Scénář a Grafika):** Do tabulky sepíšeš texty pro cutscény (visual novel styl) a deníky, které budou mít podobu bílých nebo žlutých papírků. Pro stavy s nízkou příčetností vymyslíš měnící se texty v dialozích (prolomení 4\. stěny), podivné stíny a změněný vzhled postav.  
* **Práce antigravity (Kód):** Vytvoří systém pro přehrávání dialogů. Napojí úroveň příčetnosti (Sanity) hráče na automatické spouštění textových halucinací a změnu grafiky.

**Fáze 5: Řízená správa týmu a souboje**

* **Tvoje práce (Scénář a Grafika):** Nakreslíš vizuály pro hrozby (divoká zvířata, nepřátelští přeživší, skinwalkeři, stíny) a portréty pro NPC do pravého horního rohu. Sepíšeš hlášky pro zanedbávané NPC a vytvoříš v tabulce specifické cutscény pro propouštění členů týmu a odhalení skinwalkera.  
* **Práce antigravity (Kód):** Vytvoří slotový systém pro maximálně 3 aktivní členy týmu a naprogramuje plnění jejich úkolů (Hledání, Hlídání, Stavba). Zajistí, že při propuštění systém sáhne do tabulky a přehraje tvou cutscénu. Implementuje reakční minihru pro souboj s 3 vteřinami na volbu akce (útok/obrana).