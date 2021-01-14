var html = " ";
var c;
for (var i = 65; 89 >= i; i++) {
  // A-64, Z-90
  if(String.fromCharCode(i) === "Q"){
    continue;
  }
  c = String.fromCharCode(i);
  html += "<button class='letter'>" + c + "</button>";
}
document.getElementById("box").innerHTML = html;

$(".letter").click(function (event) {
  var letter = event.target.innerText.toLowerCase();
  // localStorage.setItem("userLetter", "letter");
  // console.log(letter);
  $("#food-box").empty();
  generateCocktail(letter);
  generateFood(letter);
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
    if (randNumber === null) {
      console.log(randNumber);
    }
    let generatedIngList = generateIngredientsHTML(data.meals[randNumber]);
    console.log(data.meals[randNumber])
    console.log(generatedIngList);
    $("#ingredients-list").empty().append(generatedIngList);
    //generateIngredients(list);
    var recipeInstruction = generateSelectedSection(
      data.meals[randNumber].strMeal,
      data.meals[randNumber].strMealThumb,
      data.meals[randNumber].strInstructions
    );
    $("#food-box").append(recipeInstruction);
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

    if (ingPath[ingredient] === "") {
      break;
    }
    if (ingPath[measurement] === "") {
      ingPath[measurement] = "To taste";
    }
    section = generateIngredientHTML(
      ingPath[ingredient],
      ingPath[measurement]
    );
    
    allHTML += section;
  }
  return allHTML;
}
function generateIngredientHTML(ingredient, measurement) {
  var recipeIngredients = "<li>" + ingredient + " : " + measurement + "</li>";
  return recipeIngredients;
}

function generateSelectedSection(name, img, instructions) {
  return ` <h2 id= "choice-name">${name}</h2>
    <img id= "choice-image" src="${img}">
    <div id = "instructions"><h5 class="name">Cooking Instruction:</h5> ${instructions}</div>`;
}

function generateCocktail(userLetter) {
  var drinksUrl =
    " http://www.thecocktaildb.com/api/json/v1/1/search.php?f=" + userLetter;
  $.ajax({
    url: drinksUrl,
    method: "GET",
  }).then(function (response) {});
}
