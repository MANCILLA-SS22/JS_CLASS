import { API_URL } from "./config.js";
import { getJSON } from "./helpers.js"

export const state = {
    recipe: {}
};

//This function doesn't return anything, so therefore, we are not storing any result into any new variable. Instead, we'll get access state.recipe. So to that state.recipe that is going to be manipulated right up. loadRecipe function is not a pure function. So it has the side effect of manipulating this variable that is outside of it.
export const loadRecipe = async function(id){ 
    try {
        const data = await getJSON(`${API_URL}/${id}`)
    
        const {recipe} = data.data;
        state.recipe = {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            sourceUrl: recipe.source_url,
            image_url: recipe.image_url,
            servings: recipe.servings,
            cooking_time: recipe.cooking_time,
            ingredients: recipe.ingredients
        };
        console.log(state.recipe);
    } catch (err) {
        console.error(`${err} 🥶`);
        throw err; //We re-throw this error so the other file (controller.js) can recive it.
    }
}