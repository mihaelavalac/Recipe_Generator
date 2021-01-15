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
  var welcome= `  <div id="welcome-area"><img class="is-centered" src="img/food.png"><br> <h3>Click one of the letters above to generate a random food recipe!</h3></div>`
  document.getElementById("letters-area").innerHTML = html;
  $("welcome-area").append(welcome);
  

}
function generateLettersForCocktails() {
  $("#first-page-welcome").empty();
  var html = " ";
  var c;
  for (var i = 65; 89 >= i; i++) {
    // A-64, Z-90
    if (
      String.fromCharCode(i) === "X" ||
      String.fromCharCode(i) === "U"
    ) {
      continue;
    }
    c = String.fromCharCode(i);
    html += "<button class='button is-rounded letter'>" + c + "</button>";
  }
  document.getElementById("letters-area").innerHTML = html;
}

$("#food-recipe").click(function () {
  $("#recipe-box").empty();
  generateLettersForFood();
  $(".letter").click(function (event) {
    var letter = event.target.innerText.toLowerCase();
    $("#recipe-box").empty();
    generateFood(letter);
  });
});

$("#drink-recipe").click(function () {
  $("#recipe-box").empty();
  generateLettersForCocktails();
  $(".letter").click(function (event) {
    var letter = event.target.innerText.toLowerCase();
    $("#recipe-box").empty();
    generateCocktail(letter);
  });
});

function generateFood(userLetter) {
  var foodUrl =
    "http://www.themealdb.com/api/json/v1/1/search.php?f=" + userLetter;

  $.ajax({
    url: foodUrl,
    method: "GET",
  }).then(function (data) {
    console.log(data);
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
}

function generateNumber(number) {
  return Math.floor(Math.random() * number);
}
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
}
function generateIngredientHTML(ingredient, measurement) {
  var recipeIngredients = "<li class='ingredients-list'>" + ingredient + " : " + measurement + "</li>";
  return recipeIngredients;
}

function generateSelectedRecipe(name, img, instructions) {
  return `
  <div id="recipe-title" class="columns is-centered is-full">
    <h1>${name}</h1>
  </div>
  <div class="columns is-mobile">
    <div class="column" id="img-area"><img src="${img}"></div>
    <div class="column" id="ingredients">
      <ul id= "ingredients-list"><h4 class ="cooking instruction" style="font-style:italic"> Ingredients</h4><br>
      </ul>
    </div>
  </div>
  <div id="instructions" class="column-is-full"> <h4 class="cooking-instruction" style="font-style:italic"> Cooking Instruction:</h4> <br> ${instructions}</div><br><br><br><br>`;
}

function generateCocktail(userLetter) {
  var drinksUrl =
    " http://www.thecocktaildb.com/api/json/v1/1/search.php?f=" + userLetter;
  $.ajax({
    url: drinksUrl,
    method: "GET",
  }).then(function (obj) {
    console.log(obj);
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
