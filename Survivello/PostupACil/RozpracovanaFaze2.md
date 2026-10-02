### **Krok 2.1: Časová smyčka a interní proměnné (Práce antigravity)**

* **Základní proměnné:** Antigravity v kódu vytvoří 6 neviditelných číselných hodnot pro statistiky postavy: Jídlo, Voda, Energie, Zdraví, Příčetnost a Teplo. Každá dostane počáteční hodnotu (např. 100/100).  
* **Běh času (Ticky):** Nastavíš herní čas. Určíš, zda čas ubíhá reálně (vteřiny), nebo tahově (s každým přesunem na nové políčko z Kroku 1). S každým posunem času začnou statistiky neviditelně klesat.  
* **Střídání cyklů:** V kódu se vytvoří generátor pro denní cyklus (střídání Dne a Noci) a generátor pro počasí (Slunce, Déšť, Sníh). Zatím jen jako textový výpis v programátorské konzoli.

### **Krok 2.2: Vyvážení přežití a tvorba grafiky (Tvoje práce)**

* **Tabulka přežití (Design):** Vytvoříš tabulku (např. v Excelu), kde určíš pravidla pro klesání. Například: Jak rychle klesá Jídlo? Když klesne Jídlo na 0, jak rychle začne klesat Zdraví? Tato tabulka umožní hru později snadno ztěžovat nebo zlehčovat bez zásahu do kódu.  
* **Grafika statistik:** Nakreslíš 6 šedých ikon pro jednotlivé statistiky (např. kapka pro vodu, teploměr pro teplo, mozek pro příčetnost). Přidáš k nim i vizuál ukazatelů (např. klesající pruhy nebo měnící se barvy).  
* **Grafika počasí a noci:** Nakreslíš poloprůhledné překryvné vrstvy (overlays). Například vrstvu padajících kapek pro déšť, vrstvu sněhových vloček a vrstvu temnoty (černá vrstva s průhledností), protože v noci se zhoršuje viditelnost.

### **Krok 2.3: Zobrazení a vlivy prostředí (Práce antigravity)**

* **Oživení UI:** Antigravity vezme tvé ikony a ukazatele z Kroku 2.2 a umístí je na obrazovku. Propojí je s interními čísly, takže uvidíš, jak statistiky reálně klesají.  
* **Aplikace noci a počasí:** Programátor napojí tvé překryvné vrstvy na generátor času. Když padne noc, obrazovka ztmavne. Když začne pršet, objeví se tvá animace deště.  
* **Zásah do statistik:** Kód se propojí s prostředím. V noci a při srážkách (déšť/sníh) začne postava rychleji ztrácet Teplo.  
* **Příprava na akci:** Programátor nastaví podmínku pro jedno z 8 tlačítek na spodní liště – konkrétně "chytání vody". To se odemkne (rozsvítí se) pouze tehdy, když prší nebo sněží.

### **Krok 2.4: Permadeath a ukládání (Práce antigravity)**

* **Ukládání při odchodu:** Antigravity naprogramuje funkci, která při běžném ukončení hry uloží aktuální stav (pozici, mapu, statistiky) pro možnost pozdějšího navázání.  
* **Smrtící podmínka:** Jakmile hodnota Zdraví klesne na 0, kód spustí proceduru smrti.  
* **Logika Permadeath:** Při smrti se okamžitě smaže uložená pozice, takže hru je nutné hrát od začátku.  
* **Meta-progrese:** Programátor zajistí, že odhalené informace a lore, které hráč do momentu smrti získal, se bezpečně uloží do odděleného souboru, který si přečte Hlavní menu.

### **Krok 2.5: Testování smyčky zmaru (Spolupráce)**

* Spustíte hru. Budeš se pohybovat po mapě vytvořené ve Fázi 1\.  
* Uvidíš, jak se střídá den a noc, jak se spouští déšť a sníh.  
* Budeš sledovat, jak tvé postavení venku v noci nebo v dešti drasticky snižuje Teplo a jak zanedbání potřeb vede ke ztrátě Zdraví.  
* Hra vyvrcholí tvou nevyhnutelnou smrtí, smazáním pozice a uložením případných fiktivních poznatků do Hlavního menu.