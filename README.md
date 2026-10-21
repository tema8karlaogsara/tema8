# Teknisk dokumentation – [Site med dynamisk indhold]

## Om projektet

Dette projekt er lavet som en del af Tema 8.
Vi har lavet et dynamisk website med HTML, CSS og JavaScript, hvor indholdet bliver hentet fra et Rest API.

Sitet består af flere sider, hvor brugeren kan:

- se en liste med indhold
- klikke sig videre til en detaljeside
- bruge filtrering

## Links

- GitHub repository: [https://github.com/tema8karlaogsara/tema8]
- GitHub Pages: [https://tema8karlaogsara.github.io/tema8/]
- Figma: [https://www.figma.com/board/NoKPd3Ev699B82HkD1oWqg/Tema-8?t=8fR6Sfq3Qap0MaJN-1] og [https://www.figma.com/design/7TGRObHV ABmoAMSEP6dCGz/Tema-8?m=auto&t=8fR6Sfq3Qap0MaJN-1]

---

## Projektstruktur

Projektet er opdelt i HTML, CSS og JavaScript-filer.

```
project/
├── index.html
├── productlist.html
├── singleview.html
├── css/
│   └── global.css
│   └── style.css
│   └── singleview.css
├── js/
│   ├── burger.js
│   ├── index.js
│   ├── productlist.js
│   └── singleview.js
└── README.md
```

### Filbeskrivelser

- **index.html** – forsiden
- **productlist.html** – viser en liste med data fra API'et
- **singleview.html** – viser detaljer om en valgt opskrift
- **global.css** – styrer designet på de globale elementer og indeholder burgermenuen
- **style.css** – styrer designet
- **singleview.css** – styrer designet for singleview siden
- **JavaScript-filer** – styrer det dynamiske indhold på de forskellige sider

---

## Hvordan koden fungerer

Vi har opdelt JavaScript, så hver side har sin egen fil.

### index.js

Bruges på forsiden.
Her bliver indhold vist dynamisk, fx links eller kategorier.

### productlist.js

Henter data fra Rest API'et og viser en liste med opskrifter på siden.

**Flow:**

1. Siden loader
2. JavaScript kører
3. Data hentes fra Rest API
4. Data bliver gennemgået med loop
5. HTML bliver indsat i DOM'en
6. Brugeren kan klikke på en opskrift

### singleview.js

Bruges til detaljesiden. Den læser et id fra URL'en og henter derefter den rigtige opskrift fra Rest API'et.

Det gør det muligt at genbruge den samme HTML-side til mange opskrifter. I stedet for at lave én side per opskrift, bruger vi ét id i URL'en til at vise det rigtige indhold.

---

## Navngivning

Vi har navngivet vores filer, variabler og funktioner så de så tydeligt som muligt er selvforklarende.

### Eksempler på variabler

```javascript
const recipesURL;
const listContainer;
```

### Eksempler på funktioner

```javascript
getData(url);
showProducts(filteredRecipe);
```

Vi har brugt camelCase i JavaScript, fordi det gør koden mere ensartet og lettere at læse, og fordi det er sådan vi gjorde i undervisningen, så for at undgå at vi forvirrer os selv holder vi fast i den fremgangsmåde.

## Kommentarer i koden

Vi har kommenteret de steder i koden, hvor det giver mening.
Fx ved funktioner, fetch-kald og steder hvor der sker DOM-manipulation.

**Eksempel:**

```javascript
// vi fetcher vores data fra vores json og sætter den ind i vores showProducts funktion
function getData(url) {
  fetch(url).then((response) => {
    response.json().then((recipes) => {
      allData = recipes;
      showProducts(recipes.recipes);
    });
  });
}
```

Vi har prøvet ikke at skrive kommentarer til helt åbenlyse ting, men kun dér hvor det hjælper forståelsen, og har især brugt det i javascript fordi det stadig er relativt nyt for os at bruge javascript på denne måde, og det at skrive kommentarer hjælper os til at forstå og huske hvad de forskellige ting dele af koden gør og hvorfor.

---

## Data og JSON-struktur

Vi henter data fra et API i JSON-format.

**Et objekt kan fx se sådan ud:**

```json
{
  "id": 1,
  "name": "Opskriftsnavn",
  "ingrediens": "liste over ingredienser",
  "instructions": "beskrivelse af fremgangsmåde",
  "prepTimeMinutes": 45,
  "cookTimeMinutes": 45,
  "servings": 4,
  "difficulty": "beskrivelse af sværhedsgrad, fx easy",
  "cuisine": "køkken som retten stammer fra, fx Italian",
  "caloriesPerServing": 300,
  "tags": "fx Pizza og Italian"
  "image": "link",
  "rating": 4.6,
  "reviewCount": 98,
  "mealType": "fx Dinner eller Lunch"
}
```

### Felter vi bruger

- **id** – bruges til at sende brugeren videre til detaljesiden
- **name** – opskriftsnavn
- **ingrediens** – liste over ingredienser
- **instructions** – beskrivelse af fremgangsmåde
- **prepTimeMinutes** – forberedelsestid i minutter
- **cookTimeMinutes** – tilberedningstid i minutter
- **servings** – antal portioner
- **image** – opskriftsbillede

---

## Git og branches

Vi har brugt GitHub til at samarbejde om projektet.

Vi har arbejdet med branches, så vi ikke sad og ændrede i det samme på samme tid, udover da vi lavede vores globale styling. Eftersom vi kun er to i gruppen lavede vi forsiden sammen og glemte her at branche ud.

Vi navngav branchene med den side der blev arbejdet på i den branch efterfulgt af \_v + det nummer version vi var i.

### Eksempler på branches

- `productlist_v1`
- `singleview_v1`

### Workflow

1. Lave en branch med side navn efterfulgt af version 1, 2, 3 osv.
2. Kode en feature
3. Committe ændringer
4. Pushe til GitHub
5. Merge til main når det virkede

Det gjorde det nemmere at holde styr på, hvem der lavede hvad.

---

## Bæredygtighed

Vi har tænkt bæredygtighed ind i projektet ved at forsøge at holde kode så kort som muligt og holde en enkel informationasarkitektur.

**Tiltag:**

- Genbruge af kode
- brug af dynamisk data som loopes igennem vha. forEach frem for at hardcode en lang kode med statiske elementer.

---

MANGLER

## Udfordringer undervejs

En af vores udfordringer var at få data fra Rest API’et vist korrekt på siderne, da vi i vores fetch skulle et lag længere ind i API´en end vi oprindeligt troede.
Vi havde også udfordringer med at lave vores filtrering på siderne, fordi vi gerne ville filtrere efter tid, og vi skulle derfor lægge to tider sammen til en totaltid i en funktion og så derefter brug den funktion i en if statement.

**Løsninger:**

- Console.logge data undervejs
- Teste fetch-kald med en consol log så vi opdager hvis det er her fejlen er, og derefter spørge om hjælp til at forstå hvorfor det ikke blev vist
- bruge data-filter til at forbinde vores javascript med html, samt bruge arrow functions da de tillader os at bruge funktioner i vores if-statements

---

## Mulige forbedringer

vi ville ønske vi havde haft mere tid eller flere hænder til at kode, da der er en del ting vi gerne ville have implementeret.
Hvis vi skulle arbejde videre med projektet, kunne vi forbedre det ved at tilføje:

- Søgefunktion
- Tilbage-pil
- Tydeligere logo
- Lysere skrift i logoet (kontrast)
- vise den samlede madlavningstid på cards´ne
- teste på vores færdigkodede site med henblik på at forbedre brugeroplevelse og evt. lave en design itteration to.
- tilføje URL Params
- lave sortering så cardsne sorteret med hurtigste retter først

## Gruppemedlemmer

- Karla Nodin Friis Jensen
- Sara Kvistgaard Wæber
