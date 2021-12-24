# Recipe Generator

This project is created to help an user to chose an food or drink recipe! The requirements of the project are to involve at least two API's and a different CSS framework (other than Bootstrap), I selected Bulma. This is one of my first large projects, and because I am a self learner, I wasn't able to build this application with a team, therefor I did it independently. The API's that I used are themealDB and thecocktailDB. The project offers users the opportunity to ether generate a random meal by selecting from a string of letters, or user can introduce the recipe name in the searchbox.  

The meal DB - https://www.themealdb.com/api.php

The cocktail DB - https://www.thecocktaildb.com/api.php

## Website Layout 

When the user access the page for the first time, on the screen display a Welcome Image and an instructive message!

![image](./img/welcome.png)

If the user chose to generate a random recipe, the screen displays a string of letters from whish the user should chose the one with which the name of the recipe starts and a image that represents the category of recipe.

### For food-recipes:

![image](./img/food-button.png)

### For cocktail-recipe:

![image](./img/drinks-button.png)

When the user select the desired letter-button, the screen displays a random recipe from the selection. 

### Example for food recipe selection for letters "C", "L" and "R" :

![image](./img/meal1.png)

![image](./img/meal2.png)

![image](./img/meal3.png)

### Example for cocktails recipe selection for letters "A", "E" and "Q" :

![image](./img/drink1.png)

![image](./img/drink2.png)

![image](./img/drink3.png)

Users also can type in the Search box the name of the recipe they are looking for.

If the user is searching for a pizza recipe: 

![image](./img/pizza-search.png)

The program will generate a random pizza recipe.

![image](./img/pizza.png)

If the user types in the search box an invalid input:

![image](./img/invalid.png)

The program will generate an unavailable recipe message:

![image](./img/sorry-page-copy.png)

## Deployment Link 

https://mihaelavalac.github.io/Project-1/