var html = " ";
var c;
for (var i = 65; 90 >= i; i++) {
  // A-65, Z-90
  c = String.fromCharCode(i);
  html += "<button class='letter'>" + c + "</button>";
}
document.getElementById("box").innerHTML = html;

$(".letter").click(function (event) {
  var letter = event.target.innerText.toLowerCase();
  // localStorage.setItem("userLetter", "letter");
  // console.log(letter);
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
    console.log(randNumber);
    var ingPath = data.meals[randNumber];
    var array = [];
       for (let i = 1; i < 15; i++) {
        var ingredient = "strIngredient" + i;
        var measurement = "strMeasure" + i;

        if (ingPath[ingredient] === "") {
          break;
        }
         array.push(
          ingPath[ingredient] + " : " + ingPath[measurement]
        );
      }
      console.log(array);
      //generateIngredients(array);
    var recipeGenerator = generateSelectedSection (
      data.meals[randNumber].strMeal,
      data.meals[randNumber].strMealThumb,
      array,
      data.meals[randNumber].strInstructions,
    );
    $("#food-box").append(recipeGenerator); 
  });
};
function generateNumber(number) {
  return Math.floor(Math.random() *  number);
}
function generateIngredients() {
  $("#ingredients").empty();
  for (var i =0; i<array.length; i++) {
    var recipeIngredients = $("<li>" + array[i] + "</li>");
    $("#ingredients").append(recipeIngredients);
  }
}

function generateSelectedSection (name, img, ingredients, instructions) {
    return ` <h3 id= "choice-name">${name}</h3>
    <img id= "choice-image" src="${img}">
    <ul id="ingredients-list">Ingredients: ${ingredients}</ul>
    <div id = "instructions">Cooking Instruction: ${instructions}</div>`
}

function generateCocktail(userLetter) {
  var drinksUrl =
  " http://www.thecocktaildb.com/api/json/v1/1/search.php?f=" + userLetter;
  $.ajax({
    url: drinksUrl,
    method: "GET",
  }).then(function (response) {
  });
}

