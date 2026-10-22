"use strict";

// Læser query-parametrene fra URL'en (fx produkt.html?id=1525)
const param = new URLSearchParams(window.location.search);
// Henter værdien af "id", så vi ved hvilket produkt brugeren har klikket på
const selectedID = param.get("id");
// Test i konsollen: tjek at id'et er hentet korrekt
console.log("selectedID", selectedID);

// API-url'en til ét enkelt produkt, med id'et sat ind til sidst
const detailURL = `https://dummyjson.com/recipes`;
// Test i konsollen: tjek at url'en ser rigtig ud
console.log("detailURL", detailURL);

// Henter data om produktet fra API'et
function loadData(url) {
  fetch(url).then((response) => {
    // Konverterer svaret fra JSON til et JavaScript-objekt
    response.json().then((data) => {
      // Sender produktdata videre til funktionen, der viser det på siden
      showDetails(data);
    });
  });
}

// Finder det element i HTML'en, hvor produktet skal vises
const productContainer = document.querySelector(".card product_page");

// Tømmer containeren, så der ikke ligger noget gammelt indhold i den
productContainer.innerHTML = "";

// Viser detaljerne for det valgte produkt
function showDetails(recipes) {
  // Test i konsollen: se hele produktobjektet
  console.log("recpies", recipes);

  // Bygger HTML'en til produktsiden og sætter den ind i containeren
  productContainer.innerHTML += `
  <img class="card-image" src="https://cdn.dummyjson.com/recipe-images/${recipes.id}.webp" alt="${recipes.name}">

<h1>${recipes.name}</h1>
            <p>${recipes.ingredients.join(",")}</p>
            <p>${recipes.instructions.join(",")}</p>
            <p>${recipes.prepTimeMinutes} min</p>
            <p>${recipes.mealType.join(",")}</p>

       
// Fået hjælp af chat
<select id="servings">
  ${[2, 4, 6, 8].map((n) => `<option value="${n}" ${n === recipe.servings ? "selected" : ""}>${n}</option>`).join("")}
</select>


            <button>Gem som favorit</button>`;

  // Sætter billedets src igen (det er faktisk allerede sat i HTML'en ovenfor)
  document.querySelector(".card-image").src = "https://cdn.dummyjson.com/recipe-images/${recipes.image}.webp";
}

// Starter det hele ved at hente produktdata fra API'et
loadData(detailURL);
