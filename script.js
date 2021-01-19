$("#food-recipe").click(function () {
  $("#welcome-box").empty();
  $("#recipe-box").empty();
  generateLettersForFood();
  generateWelcomeFoodHTML();
  $(".letter").click(function (event) { 
    $("#welcome-box").empty();
    var letter = event.target.innerText.toLowerCase();
    $("#recipe-box").empty();
    generateFood(letter);
  });
});
$("#drink-recipe").click(function () {
  $("#welcome-box").empty();
  $("#recipe-box").empty();
  generateLettersForCocktails();
  generateWelcomeDrinkHTML ();
  $(".letter").click(function (event) {
    $("#welcome-box").empty();
    var letter = event.target.innerText.toLowerCase();
    $("#recipe-box").empty();
    generateCocktail(letter);
  });
});
$("#search-button").click(function () {
  $("#first-page-welcome").empty();
  $("#recipe-box").empty();
  var userInput = $("#search-input").val();
  $("#search-input").val(" ");
  generateFoodOrDrink(userInput);
});
function generateLettersForFood() {
  $("#first-page-welcome").empty();
  var html = " ";
  var c;
  for (var i = 65; 89 >= i; i++) {
    // A-64, Z-90
    if (
      String.fromCharCode(i) === "Q" ||
      String.fromCharCode(i) === "X" ||
      String.fromCharCode(i) === "U"
    ) {
      continue;
    }
    c = String.fromCharCode(i);
    html += "<button class='button is-rounded letter'>" + c + "</button> <br>";
  }
  var welcome = `  <div id="welcome-area"><img class="is-centered" src="img/food.png"><br> <h3>Click one of the letters above to generate a random food recipe!</h3></div><br>`;
  document.getElementById("letters-area").innerHTML = html;
  $("#welcome-area").append(welcome);
};
function generateLettersForCocktails() {
  $("#first-page-welcome").empty();
  var html = " ";
  var c;
  for (var i = 65; 89 >= i; i++) {
    // A-64, Z-90
    if (String.fromCharCode(i) === "X" || String.fromCharCode(i) === "U") {
      continue;
    }
    c = String.fromCharCode(i);
    html += "<button class='button is-rounded letter'>" + c + "</button>";
  }
  document.getElementById("letters-area").innerHTML = html;
};
function generateFood(userLetter) {
  var foodUrl =
    "http://www.themealdb.com/api/json/v1/1/search.php?f=" + userLetter;

  $.ajax({
    url: foodUrl,
    method: "GET",
  }).then(function (data) {
    var randNumber = generateNumber(data.meals.length);
    let generatedIngList = generateIngredientsHTML(data.meals[randNumber]);
    var recipeInstruction = generateSelectedRecipe(
      data.meals[randNumber].strMeal,
      data.meals[randNumber].strMealThumb,
      data.meals[randNumber].strInstructions
    );
    $("#recipe-box").append(recipeInstruction);
    $("#ingredients-list").append(generatedIngList);
  });
};
function generateCocktail(userLetter) {
  var drinksUrl =
    " http://www.thecocktaildb.com/api/json/v1/1/search.php?f=" + userLetter;
  $.ajax({
    url: drinksUrl,
    method: "GET",
  }).then(function (obj) {
    var randNumber = generateNumber(obj.drinks.length);
    let generatedIngList = generateIngredientsHTML(obj.drinks[randNumber]);
    var recipeInstruction = generateSelectedRecipe(
      obj.drinks[randNumber].strDrink,
      obj.drinks[randNumber].strDrinkThumb,
      obj.drinks[randNumber].strInstructions
    );
    $("#recipe-box").append(recipeInstruction);
    $("#ingredients-list").append(generatedIngList);
  });
};
function generateNumber(number) {
  return Math.floor(Math.random() * number);
};
function generateIngredientsHTML(ingPath) {
  var allHTML = "";
  let section;
  for (let i = 1; i < 15; i++) {
    var ingredient = "strIngredient" + i;
    var measurement = "strMeasure" + i;

    if (ingPath[ingredient] === "" || ingPath[ingredient] === null) {
      break;
    }
    if (ingPath[measurement] === "" || ingPath[measurement] === null) {
      ingPath[measurement] = "To taste";
    }
    section = generateIngredientHTML(ingPath[ingredient], ingPath[measurement]);

    allHTML += section;
  }
  return allHTML;
};
function generateIngredientHTML(ingredient, measurement) {
  var recipeIngredients =
    "<li class='ingredients-list is-centered'>" +
    ingredient +
    " : " +
    measurement +
    "</li>";
  return recipeIngredients;
};

function generateWelcomeFoodHTML () {
  var content = `<div id="welcome-food-area" class="container"><img id="welcome-img" class="columns is-centered" src="img/food.png"><br> <h3 class="columns is-centered">Click one of the letters above to generate a random meal recipe!</h3></div>`
  $("#welcome-box").append(content);
  return content;
  
}

function generateWelcomeDrinkHTML () {
  var content = `<div id="welcome-drink-area" class="container"><img id="welcome-img" class="columns is-centered" src="img/cocktail.png"><br> <h3 class="columns is-centered">Click one of the letters above to generate a random cocktail recipe!</h3></div>`
  $("#welcome-box").append(content);
  return content;
  
}


function generateSelectedRecipe(name, img, instructions) {
  return `
  <div id="recipe-title" class="columns is-full is-centered">
    <h1 >${name}</h1>
  </div>
  <br>
  <div class="columns is-mobile">
    <div class="column is-4" id="img-area"><img src="${img}"></div>
    <div class="column is-3 is-centered" id="ingredients">
      <ul id= "ingredients-list" class="is-mobile is-centered"><h4 class ="is-centered" style="font-style:italic"> Ingredients</h4><br>
      </ul>
    </div>
    <div class="column is-mobile is-5" id="instructions"> <h4 class="cooking-instruction" style="font-style:italic"> Instruction </h4><br> ${instructions}</div>
  </div>
 `;
};
function generateFoodByInput(input) {
  var foodInputUrl =
    "https://www.themealdb.com/api/json/v1/1/search.php?s=" + input;
  $.ajax({
    url: foodInputUrl,
    method: "GET",
  })
    .then(respondToFoodInput(foodData))
    .catch(function (error) {
      console.log(error);
    });
};

function respondToFoodInput (foodData) {
    console.log(foodData);
    if (foodData.meals === null) {
      return;
    } else {
      var randNumber = generateNumber(foodData.meals.length);
      let generatedIngList = generateIngredientsHTML(foodData.meals[randNumber]);
      var recipeInstruction = generateSelectedRecipe(
        foodData.meals[randNumber].strMeal,
        foodData.meals[randNumber].strMealThumb,
        foodData.meals[randNumber].strInstructions
      );
      $("#recipe-box").append(recipeInstruction);
      $("#ingredients-list").append(generatedIngList);
    }

};

function generateDrinkByInput(input) {
  var drinkInputUrl =
    "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + input;
  $.ajax({
    url: drinkInputUrl,
    method: "GET",
  })
  .then(respondToDrinkInput(inputResponse))
  .catch(function (error) {
    console.log(error);
  });
};


function respondToDrinkInput (inputResponse) {
  console.log(inputResponse);
    if (inputResponse.drinks === null) {
      return;
    } else {
      var randNumber = generateNumber(inputResponse.drinks.length);
      let generatedIngList = generateIngredientsHTML(inputResponse.drinks[randNumber]);
      var recipeInstruction = generateSelectedRecipe(
        inputResponse.drinks[randNumber].strDrink,
        inputResponse.drinks[randNumber].strDrinkThumb,
        inputResponse.drinks[randNumber].strInstructions
        );
      $("#recipe-box").append(recipeInstruction);
      $("#ingredients-list").append(generatedIngList);
    }
  };

function generateFoodOrDrink (input) {
  if ((respondToDrinkInput(input) !== null) && (respondToFoodInput(input) !== null)) {
    respondToFoodInput(input);
  }
};