// main.js

// Run the init() function when the page has loaded
window.addEventListener('DOMContentLoaded', init);

// Starts the program, all function calls trace back here
function init() {
  // Get the recipes from localStorage
  let recipes = getRecipesFromStorage();
  // Add each recipe to the <main> element
  addRecipesToDocument(recipes);
  // Add the event listeners to the form elements
  initFormHandler();
}

/**
 * Reads 'recipes' from localStorage and returns an array of
 * all of the recipes found (parsed, not in string form). If
 * nothing is found in localStorage for 'recipes', an empty array
 * is returned.
 * @returns {Array<Object>} An array of recipes found in localStorage
 */
function getRecipesFromStorage() {
  // A9. Complete the functionality as described in this function
  let recipes = localStorage.getItem('recipes')
  if (!recipes) return []
  return JSON.parse(recipes)
}

/**
 * Takes in an array of recipes and for each recipe creates a
 * new <recipe-card> element, adds the recipe data to that card
 * using element.data = {...}, and then appends that new recipe
 * to <main>
 * @param {Array<Object>} recipes An array of recipes
 */
function addRecipesToDocument(recipes) {
  const main = document.querySelector('main');

  recipes.forEach(recipe => {
    const recipeCard = document.createElement('recipe-card')
    recipeCard.data = recipe
    main.appendChild(recipeCard)
  })
}

/**
 * Takes in an array of recipes, converts it to a string, and then
 * saves that string to 'recipes' in localStorage
 * @param {Array<Object>} recipes An array of recipes
 */
function saveRecipesToStorage(recipes) {
  // EXPLORE - START (All explore numbers start with B)
  // B1.
  const recipesString = JSON.stringify(recipes)
  localStorage.setItem('recipes', recipesString)
}

/**
 * Adds event listeners to the form elements (B4-B9)
 * @param {HTMLFormElement} form The <form> element
 */
const formRequest = (event, form) => {
  event.preventDefault();
  console.log('form submitted')

  // B4 - B5
  const formData = new FormData(form)
  const recipeObject = {};
  formData.forEach((value, key) => {
    // Special cases
    if (key === 'rating' || key === 'numRatings') {
      value = Number(value)
    } else if (key === 'ingredients') {
      value = value.split('\n')
    }

    // Otherwise, just set the value
    recipeObject[key] = value
  })

  // B6 - B7
  const recipeCard = document.createElement('recipe-card');
  recipeCard.data = recipeObject

  // B8. Append this new <recipe-card> to <main>
  const main = document.querySelector('main');
  main.appendChild(recipeCard)

  // B9. Get the recipes array from localStorage, add this new recipe to it, and
  //            then save the recipes array back to localStorage
  const recipes = getRecipesFromStorage()
  recipes.push(recipeObject)
  saveRecipesToStorage(recipes)
}


/**
 * Adds the necesarry event handlers to <form> and the clear storage
 * <button>.
 */
function initFormHandler() {
  const main = document.querySelector('main')
  // B2 + B10
  const form = document.querySelector('form#new-recipe')
  const clearButton = document.querySelector('#new-recipe button.danger')

  // B3. Add an event listener for the 'submit' event
  form?.addEventListener('submit', (event) => formRequest(event, form))

  // B11. Add a click event listener to clear local storage button
  clearButton?.addEventListener('click',
    // B12. Clear the local storage
    // B13. Delete the contents of <main>
    () => {
      localStorage.clear()
      main.innerHTML = ''
    })
}
