import "regenerator-runtime/runtime"; //This is for polyfilling async/await
import "core-js/stable";
import * as model from "./model.js";
import recipeView from "./views/recipeView.js";

init();

async function controlRecipe(){
  try {

    const id = window.location.hash.slice(1);  //console.log(id);
    if(!id) return;
    recipeView.renderSpinner();

    // 1) Loading the recipe
    await model.loadRecipe(id); //This is an async function calling another asyinc function. That's why we use await.

    // 2) Rendering recipe
    recipeView.render(model.state.recipe);  //This is the same as the following line of code: const res = new recipeView(model.state.recipe);

  } catch (err) {
    console.error(`${err} 😈`)
    recipeView.renderError(); //We catch the re-thrown error from model.js and then call the renderError() function from the same file.
  }
}

//We can't export functions from controller to the view becuase:
// 1) Controller is the main module that controls what happens in the app. It delegates tasks to models and views.
// 2) The controller.js file is linked with the index.html file, which makes it an entry point for all other JavaScript modules.
function init(){
  recipeView.addHandlerrender(controlRecipe);
}








