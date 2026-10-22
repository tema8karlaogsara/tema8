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
    response.json().then((data) => {
      allData = data.recipes;
      showProducts(allData);
    });
  });
}

// kalder min funktion
getData(recipesURL);

function showProducts(recipes) {
  // tjekker om der er hul igennem
  console.log(recipes);

  //  så definerer vi hvilket indhold der skal være i vores listContainer (hvilken datatype).
  // dvs. vi fjerner ikke indhodlet i listContainer, men siger at der skal være noget indhold i, som skal være tomt (laver en tom kasse)
  // altså jeg laver en tom string som overskriver det der står i min html i forvejen
  listContainer.innerHTML = "";

  recipes.forEach((recipe) => {
    listContainer.innerHTML += `
  
                <article class="product">

                    <a href="singleview.html">
                    <img src="https://cdn.dummyjson.com/recipe-images/${recipe.id}.webp" alt="billede">
                    </a>
                    
                    <h2>${recipe.name}</h2>
                    
                    
  
                </article>
    `;
  });

  // henter vores knap med klassen filter-btn
  // med 'filter' inde i if-statement kommunikerer vi med data-filter i HTML'en (forbinder de to)
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", (event) => {
      const filter = event.target.dataset.filter;
      let filteredRecipe = [];

      //hvis filteret er 0-20 (hvis den knap der hedder 0-20) er klikket på, så gå ind i allData og
      // filtrer efter recipes og filtrer yderligere efter den funktion der hedder getRecipeTime, som lægger preptime sammen med cooktime,
      // og vis de objekter hvor getRecipeTime er under 30
      if (filter === "0-35") {
        filteredRecipe = allData.filter((recipe) => getRecipeTime(recipe) <= 35);
      }

      // hvis der trykkes på den knap der har filteret 20-40, så filtrer efter recipes
      // opretter en konstant som sættes lig med retRecipeTime (cooktime + preptime i mine recipes) og kalder den totalTime
      // return de objekter hvor totalTime er større end 30 og samtidig er mindre end eller lig med 60
      else if (filter === "40-60") {
        filteredRecipe = allData.filter((recipe) => {
          const totalTime = getRecipeTime(recipe);
          return totalTime > 35 && totalTime <= 60;
        });
      } else if (filter === "60+") {
        filteredRecipe = allData.filter((recipe) => getRecipeTime(recipe) > 60);
      }

      //kalder min funktion, ovenover lavede jeg min funktion men jeg skal også "aktivere" den, hvilket jeg gør ved at kalde den her
      showProducts(filteredRecipe);
    });
  });
}

// vi vil gerne lave en knap der filtrerer efter tid, og vi skal derfor lave en funktion som lægger prepTimeMinutes sammen med cookTimeMinutes,
function getRecipeTime(recipe) {
  return recipe.prepTimeMinutes + recipe.cookTimeMinutes;
}

// tjekker om funktionen virker, og kna se der kommer 25 frem i min consol så den virker
//console.log(getRecipeTime(10, 15));

// kalder min funktion globalt.
showProducts(allData);
