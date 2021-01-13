


function generateFood(userLetter) {
  var foodUrl =
  "http://www.themealdb.com/api/json/v1/1/search.php?f=" + userLetter;

  $.ajax({
    url: foodUrl,
    method: "GET",
  }).then(function (data) {
    var randNumber = generateNumber(data.meals.length);
    var recipeGenerator = displayFoodSection (
      data.meals[randNumber].strMeal,
      data.meals[randNumber].strMealThumb,
      data.meals[randNumber].strInstructions,
    );
    $("#food-box").append(recipeGenerator); 
  });
};
 
function generateNumber(number) {
  return Math.floor(Math.random() *  number);
}

function displayFoodSection (foodName, foodImg, foodInstructions) {
    return ` <h3 id= "choice-name">${foodName}</h3>
    <img id= "choice-image" src="${foodImg}">
    <div id = "instructions">Cooking Instruction: ${foodInstructions}</div>`
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



// This for loop generates buttons with letters.

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
  localStorage.setItem("userLetter", "letter");
  console.log(letter);
  generateCocktail(letter);
  generateFood(letter);

});
