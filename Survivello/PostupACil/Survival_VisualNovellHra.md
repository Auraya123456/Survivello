# **Survival / Visual Novel Hra (Game Design Document)**

## **1\. Základní informace a koncept**

> * **Žánr:** Survival hra pro počítač s prvky visual novel (2D)  
> * **Platforma/Technologie:** PC / Programováno v JavaScriptu  
> * **Herní filosofie:** Fatalistický survival – přežití není možné, hra vždy končí smrtí hráče. Cílem je během svého života odhalit co nejvíce z tajemství města.  
> * **Meta-progrese (Hlavní menu):** V hlavním menu je k dispozici přehled všech odhalených informací, záznamů a lore, které hráč získal napříč všemi odehranými běhy.

## **2\. Příběh, vyprávění a rozkrývání tajemství**

> * **Zápletka:** Hráč se probudí ve zpustošeném městě se ztrátou paměti. Kolem nikdo není.  
> * **Cíl hry:** Přežít co nejdéle a rozkrýt, co se vlastně stalo.  
> * **Příběhové prvky:**  
  * **Cutscény:** Interakce s postavami ve stylu visual novel.  
  * **Deníky a dopisy:** Bílé nebo žluté papírky vykukující zpoza stromů a v lokacích.  
> * **Konec hry:** Postava dříve či později neodvratně podlehne prostředí či hrozbám. (Příběhový mód bez permadeath je případným nápadem do budoucna).

## **3\. Vizuální styl, prostředí a atmosféra**

> * **Atmosféra:** Ponurá, vyvolávající strach s nádechem do zachmuřena.  
> * **Barevná paleta:** Černo-červené pozadí, šedé ikony a tlačítka akcí.  
> * **Perspektiva:** 2D statické pohledy na lokace "zepředu". Při přesunu (WASD / šipky) se pozadí přepne. Hra není 3D a nelze se v ní otáčet.  
> * **Biomy a teplota:** Různé biomy mají odlišnou základní teplotu (roční období jsou stálá).

## **4\. Přežití, statistiky a Permadeath**

> * **6 Statistik postavy:** Jídlo, Voda, Energie, Zdraví, Příčetnost (Sanity) a Teplo.  
> * **Halucinace (Příčetnost):** Měnící se texty v dialozích (prolomení 4\. stěny), změněný vzhled postav, podivné stíny.  
  * **Stíny:** Neútočí první, lze na ně zaútočit a mohou hráče zranit. Po porážce nezanechávají žádný loot.  
> * **Ukládání a Permadeath:**  
  * Při ukončení hry se postup uloží pro možnost navázání.  
  * Při smrti postavy dochází k **trvalé smrti (permadeath)** – uložená pozice se smaže a hru je nutné hrát od začátku. Odhalené příběhové informace se však ukládají do Hlavního menu.

## **5\. Počasí a denní cyklus**

> * **Denní cyklus:** Den a Noc (v noci klesá teplo a zhoršuje se viditelnost).  
> * **Počasí:** Slunce vs. Déšť / Sníh (při srážkách klesá teplo, ale lze chytat vodu do nádob).

## **6\. Inventář, Předměty a Crafting**

> * **Mřížkový inventář (Grid System):** Předměty mají různé velikosti a zabírají odlišný počet čtverečků. Po zaplnění všech čtverečků nelze přidávat další věci.  
> * **Typy předmětů a zbraní:** Nože, pochodně, obvazy, suroviny a jídlo/nápoje (čaje, pečené maso).  
> * **Příprava jídel a nápojů:** Pokročilejší recepty (pečení masa, vaření čaje) vyžadují k realizaci rozdělaný oheň.  
> * **Crafting:** Stacionární objekty (přístřešek, ohniště) přes spodní tlačítka; přenosné nástroje a předměty přímo v inventáři.

## **7\. Členové týmu (NPC) a úkoly**

> * **Správa týmu:** Až 3 rekrutovaní členové v pravém horním rohu.  
> * **Potřeby NPC:** Skrytý hlad a žízeň. Spotřebovávají ze zásob jídlo a vodu. Pokud jsou zanedbáváni, stěžují si a odejdou.  
> * **Průběh úkolů:** Plnění úkolů (Hledání, Hlídání, Stavba) trvá určitou dobu. Hráč během toho nesmí opustit lokaci, ale může akci kdykoliv zrušit.  
> * **Hlídání a odhalení zrady:** Během hlídání může NPC odhalit blížícího se útočníka nebo zrádce v týmu, což hráče okamžitě vzbudí a spustí cutscénu či reakční minihru.  
> * **Zrada a Skinwalkeři:** Člen týmu může hráče zradit nebo se z něj vyklubat skinwalker nečekaně i během dne.

## **8\. Soubojový systém a hrozby**

> * **Hrozby:** Divoká zvířata, nepřátelští přeživší, skinwalkeři a stíny (halucinace).  
> * **Minihra na reakce:**  
  * Hráč má 3 vteřiny na volbu akce (útok/obrana).  
  * Pokud bytost útočí první, hráč má 3 bonusové vteřiny na přípravu před spuštěním odpočtu.

## **9\. Ovládání a uživatelské rozhraní (UI)**

> * **Pohyb:** WASD / šipky.  
> * **Inventář (Batoh):** Ikona vlevo nahoře nebo klávesa 'B'. Zobrazuje obrázek postavy a mřížku s předměty různé velikosti. Obsahuje tlačítka pro crafting.  
> * **Mapa:** Ikona vedle batohu, zobrazuje pouze objevená místa (Fog of War). Na začátku hry se generuje skrytá logická mapa.  
> * **Spodní akční lišta (8 tlačítek):** Hledání jídla, dřeva, materiálů, nabrání vody, útok/lov, stavba přístřešku, rozdělání ohniště, chytání vody (aktivní jen za vhodných podmínek).