// When the food-recipe button is clicked, on the screen is generated s list of letters for food choices and a welcome message!
$("#food-recipe").click(function () {
  $("#no-recipe-found").empty();
  $("#welcome-box").empty();
  $("#recipe-box").empty();
  generateLettersForFood();
  generateWelcomeFoodHTML();
  // when a letter is clicked, a random  food recipe is generated.
  $(".letter").click(function (event) {
    $("#no-recipe-found").empty();
    $("#welcome-box").empty();
    var letter = event.target.innerText.toLowerCase();
    $("#recipe-box").empty();
    generateFood(letter);
  });
});

// When the drink-recipe button is clicked, on the screen is generated s list of letters for drinks choices and a welcome message!
$("#drink-recipe").click(function () {
  $("#no-recipe-found").empty();
  $("#welcome-box").empty();
  $("#recipe-box").empty();
  generateLettersForCocktails();
  generateWelcomeDrinkHTML();
  //when a letter is clicked, a random drink recipe is generated. 
  $(".letter").click(function (event) {
    $("#no-recipe-found").empty();
    $("#welcome-box").empty();
    var letter = event.target.innerText.toLowerCase();
    $("#recipe-box").empty();
    generateCocktail(letter);
  });
});
//When the user is writing a food/drink in the input field, the search button reacts ang generate a food or a drink on the screen.
$("#search-button").click(function () {
  $("#no-recipe-found").empty();
  $("#error-box").empty();
  $("#first-page-welcome").empty();
  $("#recipe-box").empty();
  var userInput = $("#search-input").val();
  $("#search-input").val(" ");
  generateFoodByInput(userInput);
  //generateDrinkByInput(userInput);
});

//This function generates letters for food selections.
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
  var welcome = `<div id="welcome-area"><img class="is-centered" src="img/food.png"><br> <h3>Click one of the letters above to generate a random food recipe!</h3></div><br>`;
  document.getElementById("letters-area").innerHTML = html;
  $("#welcome-area").append(welcome);
}

//This function generates letters for drink selections.
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
}

//This function generates foods recipe.
function generateFood(userLetter) {
  var foodUrl =
    "https://www.themealdb.com/api/json/v1/1/search.php?f=" + userLetter;

  $.ajax({
    url: foodUrl,
    method: "GET",
  }).then(function (data) {
    var randNumber = generateNumber(data.meals.length);
    let generatedIngList = generateIngredientsHTML(data.meals[randNumber]);
    var recipeInstruction = generateSelectedRecipe(
      data.meals[randNumber].strMeal,
      data.meals[randNumber].strMealThumb,
      data.meals[randNumber].strInstructions,
    );
    $("#recipe-box").append(recipeInstruction);
    $("#ingredients-list").append(generatedIngList);
  });
}

//This function generates drinks recipe.
function generateCocktail(userLetter) {
  var drinksUrl =
    " https://www.thecocktaildb.com/api/json/v1/1/search.php?f=" + userLetter;
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
}

//This function generate a random number(a random item from ajax return).
function generateNumber(number) {
  return Math.floor(Math.random() * number);
}

//This function generates ingredients and measures for the picked recipe. 
function generateIngredientsHTML(ingPath) {
  var allHTML = "";
  let section;
  for (let i = 1; i < 15; i++) {
    var ingredient = "strIngredient" + i;
    var measurement = "strMeasure" + i;
    if (ingPath[measurement] === "" || ingPath[measurement] === null) {
    ingPath[measurement] = "To taste";
    } 
    if (ingPath[ingredient] === "" || ingPath[ingredient] === null) {
      break;
    }
  section = generateIngredientHTML(ingPath[ingredient], ingPath[measurement]);
  allHTML += section;
  } 
  return allHTML;
}
// This function generates ingredients in form of list. 
function generateIngredientHTML(ingredient, measurement) {
  var recipeIngredients =
    "<li class='ingredients-list is-centered'>" +
    ingredient +
    " : " +
    measurement +
    "</li>";
  return recipeIngredients;
}
//This function generates welcome message after the food-recipe button is clicked.
function generateWelcomeFoodHTML() {
  var content = `<div id="welcome-food-area" class="container"><img id="welcome-img" class="columns is-centered" src="img/food.png"><br> <h3 class="columns is-centered">Click one of the letters above to generate a random meal recipe!</h3></div>`;
  $("#welcome-box").append(content);
  return content;
}

//This function generates welcome message after the drink-recipe button is generated.
function generateWelcomeDrinkHTML() {
  var content = `<div id="welcome-drink-area" class="container"><img id="welcome-img" class="columns is-centered" src="img/cocktail.png"><br> <h3 class="columns is-centered">Click one of the letters above to generate a random cocktail recipe!</h3></div>`;
  $("#welcome-box").append(content);
  return content;
}

//This function generates the name, image, and instruction of the picked recipe.
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
}

//This function generates a food recipe by user input.
function generateFoodByInput(input) {
  var foodInputUrl =
    "https://www.themealdb.com/api/json/v1/1/search.php?s=" + input;
  $.ajax({
    url: foodInputUrl,
    method: "GET",
  }).then(function (foodData) {
    if (foodData.meals === null) {
      generateDrinkByInput();
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
  }).catch(function (error) {
    console.log(error);
  });
};

//This function generates drink recipe by user input. 
function generateDrinkByInput(input) {
  var drinkInputUrl =
    "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + input;
  $.ajax({
    url: drinkInputUrl,
    method: "GET",
  }).then(function (inputResponse) {
    console.log(inputResponse);
    if (inputResponse.drinks === null) {
      generateUndefinedInput();
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
  }).catch(function (error) {
    console.log(error);
  });
}


//This function generates a sorry message if the user input is not found under any  recipes. 
function generateUndefinedInput() {
  var notFound = `<div id="no-recipe-found" class="container"><img id="error-img" class="columns is-centered" src="img/sorry.png"><br> <h3 class="columns is-centered"> We couldn't find a recipe with this name! Please type another recipe name or click one of the letters above to get a random recipe...</h3></div>`;
  $("#error-box").append(notFound);
  return notFound;
}
