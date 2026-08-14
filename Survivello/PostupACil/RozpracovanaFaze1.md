### **Rozpracovaná Fáze 1: Od nuly k fungujícímu průzkumu**

Zde je detailní rozpad prvního kroku, na jehož konci budete mít plně funkční pohyb a mapu, do kterých se následně začnou přidávat survival prvky.

**Krok 1.1: Základní engine, logická mapa a placeholdery (Práce antigravity)**

* **Herní okno:** Antigravity nastaví v JavaScriptu herní okno v poměru 16:9.  
* **Generování logické mapy (Perlin Noise):** Kód na pozadí vytvoří skrytou logickou mapu (šachovnici). Pomocí algoritmu Perlinova šumu zajistí, aby se biomy (Města, Lesy, Louky, Jezera) generovaly v přirozených, ucelených shlucích a nebyly náhodně roztroušené.  
* **Dočasná grafika (Placeholders):** Antigravity vytvoří jednoduché bloky pro ikonu batohu vlevo nahoře, 8 tlačítek lišty a ikonu mapy.

**Krok 1.2: Pohyb, Fog of War a změna obrazovek (Práce antigravity)**

* **Pohyb po mřížce:** Antigravity naprogramuje snímání kláves WASD / šipek. Stisk znamená posunutí hráče na sousední políčko ve skryté mapě. Hra není 3D a nelze se v ní otáčet.  
* **Přepínání lokací:** Po přesunu na nové políčko kód zkontroluje, jaký biom tam je, a podle toho přepne 2D statické pozadí (případně pozadí obohacené o lokální zdroj vody, např. fontánu ve městě).  
* **Logika Fog of War:** Antigravity nastaví systém pro mapu tak, aby na začátku byla zahalena. Jakmile hráč vstoupí na nové políčko, místo se trvale odhalí (zobrazí pouze objevená místa).

**Krok 1.3: Definice rozměrů a předávka štafety (Spolupráce)**

* Na základě fungující kostry (16:9) ti antigravity přesně řekne, jak velké mají být 2D pohledy na lokace.  
* Předá ti rozměry pro UI (ikony, batoh, tlačítka).  
* Určí ti velikost v pixelech pro jedno políčko na mapě, abys věděl, v jakém rozlišení kreslit ikonky biomů a mlhu (Fog of War).

**Krok 1.4: Tvorba finální grafiky (Tvoje práce)**

* **Lokace a UI:** Nakreslíš ponurá 2D černo-červená pozadí "zepředu", šedé ikony a tlačítka akcí.  
* **Kreslení prvků mapy s přesahem:** Podle zadání nakreslíš samotné herní menu mapy, grafiku pro neodhalenou část a ikonky pro jednotlivé biomy. Ikonky biomů nakreslíš s měkkými, průhlednými nebo do ztracena vybledlými okraji (alfa kanál), aby se na mapě organicky slily do jedné plochy.

**Krok 1.5: Kompletace a test průzkumu (Práce antigravity)**

* **Výměna grafiky:** Antigravity vezme tvé hotové obrázky a nahradí jimi své provizorní barevné bloky. Zároveň nastaví překrývání (blending) čtverečků mapy, aby využil tvé měkké okraje.  
* **Testování:** Hra se spustí. Při pohybu (WASD / šipky) se budou plynule měnit tvá 2D pozadí. Na mapě se budou přirozeně odkrývat organicky propojené biomy (města, lesy, louky, jezera) a UI bude pevně sedět na svých místech. Kostra hry bude vizuálně a mechanicky připravená na to, aby postava začala trpět hladem a zimou ve Fázi 2\.