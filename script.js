function generateLettersForFood() {
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
    html += "<button class='letter'>" + c + "</button> <br>";
  }
  document.getElementById("letters-area").innerHTML = html;
}
function generateLettersForCocktails() {
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
    html += "<button class='letter'>" + c + "</button>";
  }
  document.getElementById("letters-area").innerHTML = html;
}

// $(".letter").click(function (event) {
//   var letter = event.target.innerText.toLowerCase();
//   $("#recipe-box").empty();
//   generateFood(letter);
// });

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
    var recipeInstruction = generateSelectedSection(
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
    if (ingPath[measurement] === "") {
      ingPath[measurement] = "To taste";
    }
    section = generateIngredientHTML(ingPath[ingredient], ingPath[measurement]);

    allHTML += section;
  }
  return allHTML;
}
function generateIngredientHTML(ingredient, measurement) {
  var recipeIngredients = "<li>" + ingredient + " : " + measurement + "</li>";
  return recipeIngredients;
}

function generateSelectedSection(name, img, instructions) {
  return `
  <div id="recipe-title" class="column is-full is-centered">
    <h2>${name}</h2>
  </div>
  <div class="columns is-mobile">
    <div class="column" id="img-area"><img id= "recipe-image" src="${img}"></div>
    <div class="column" id="ingredients">
      <ul id= "ingredients-list"><h5 class ="cooking instruction"> Ingredients</h5><br>
      </ul>
    </div>
  </div>
  <div id="instructions" class="column-is-full"> <h5 class="cooking-instruction">Cooking Instruction:</h5> <br> ${instructions}</div>`;
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
    var recipeInstruction = generateSelectedSection(
      obj.drinks[randNumber].strDrink,
      obj.drinks[randNumber].strDrinkThumb,
      obj.drinks[randNumber].strInstructions
    );
    $("#recipe-box").append(recipeInstruction);
    $("#ingredients-list").append(generatedIngList);
  });
}
