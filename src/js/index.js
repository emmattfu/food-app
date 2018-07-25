// Global app controller
import Search from '../models/search';
import Recipe from  '../models/recipe';
import * as searchView from './view/searchView';
import * as recipeView from './view/recipeView';
import { elements, clearLoader, renderLoader } from './view/base';

/** Global state of the app
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Favorite recipe object
 */

const state = {};

// search controler
const controlSearch = async () => {
   // Получать данные из view
    const query = searchView.getSearchInputValue();


    if (query) {
       // 2. создаем новый объект Search
      state.search = new Search(query);

      // 3. подготовим UI для результата
        searchView.clearForm();
        searchView.clearResult();
        renderLoader(elements.searchRes);

      // 4. делаем поиск
        await state.search.getResult();

     // 5. render result
        searchView.renderResult(state.search.result);
        clearLoader();
    }
};

// Set events
elements.searchFrom.addEventListener('submit', e => {
   e.preventDefault();
   controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
   const btn = e.target.closest('.btn-inline');

   if (btn) {
      const goToPage = parseInt(btn.dataset.goto);
      searchView.clearResult();
      searchView.renderResult(state.search.result, goToPage);
   }
});

// Recipe controller
const controlRecipe = async () => {
    // get id from url
    const id = window.location.hash.replace('#', '');

    if (id) {

        if (state.search) searchView.highLightSelected(id);
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        // create new recipe object
        state.recipe = new Recipe(id);

        // get recipe data
        await state.recipe.getRecipe();

        clearLoader();
        recipeView.renderRecipe(state.recipe.result);

    }
};

window.addEventListener('hashchange', controlRecipe);
window.addEventListener('load', controlRecipe);