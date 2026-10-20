"use strict";

// tjekker om der er hul igennem
console.log("test");

// definerer min url (altså linket som indeholder min data - de ingredienser jeg skal bruge)
// sætter ``på for at lave den om til en string literal med interchangeable elementer i
// her siger jeg gerne vil hente opskrifter fra min json
const recipesURL = `https://dummyjson.com/recipes`;

// laver en constant der tager fat i min section som har class´en productlist_container (her vil jeg have mit interchangeable indhold ind)
const listContainer = document.querySelector(".productlist_container");

// global variabel. Den laver vi fordi vi skal have mulighed for at tage fat i vores data for at kunne filtrere på det.
// den konstant sætter vi ind i vores fetch for at have et nedslag hvor vi kan gå ind i fetch og gribe fat i vores data
let allData;

// vi fetcher vores data fra vores json og sætter den ind i vores showProducts funktion
function getData(url) {
  fetch(url).then((response) => {
    response.json().then((recipes) => {
      allData = recipes;
      showProducts(recipes.recipes);
    });
  });
}

function showProducts(recipes) {
  // tjekker om der er hul igennem
  console.log("first product: ", recipes[0]);

  //  så definerer vi hvilket indhold der skal være i vores listContainer (hvilken datatype).
  // dvs. vi fjerner ikke indhodlet i listContainer, men siger at der skal være noget indhold i, som skal være tomt (laver en tom kasse)
  // altså jeg laver en tom string som overskriver det der står i min html i forvejen
  listContainer.innerHTML = "";

  recipes.forEach((recipes) => {
    // let soldOutClass = "";

    listContainer.innerHTML += `

                <article class="product">

                    <img src="https://cdn.dummyjson.com/recipe-images/${recipes.id}.webp" alt="billede">

                    <h3>${recipes.name}</h3>

                </article>
    `;
  });
}
// kalder min funktion
getData(recipesURL);
