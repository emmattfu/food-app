// Global app controller
import Search from '../models/search';
import Recipe from  '../models/recipe';
import List from '../models/list';
import Likes from '../models/likes';
import * as searchView from './view/searchView';
import * as recipeView from './view/recipeView';
import * as listView from './view/listView';
import * as likesView from './view/likesView';
import { elements, clearLoader, renderLoader } from './view/base';
import Store from './store'

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

// List controller
const controlList = e => {
    e.stopPropagation();
    const btn = e.target.closest('.recipe__btn');
    const btnRemove = e.target.closest('.shopping__delete');
    if (btn) {
        if (!state.list) {
            state.list = new List();
            state.recipe.result.ingredients.forEach(engredient => {
                state.list.addItem(engredient);
            });
        } else {
            state.recipe.result.ingredients.forEach(engredient => {
                state.list.addItem(engredient);
            })
        }

        listView.listClear();
        state.list.items.forEach(item => listView.listRender(item));
    }

    if (btnRemove) {
        const li = btnRemove.closest('li');
        state.list.items.forEach(item => {
            if (item.id === li.id) {
                state.list.deleteItem(item.id);
            }
        });
    }

};

elements.recipe.addEventListener('click', controlList);
elements.shoppingList.addEventListener('click', controlList);

// Likes controller
const controlLikes = e => {
    const store = new Store();
    const btnLike = e.target.closest('.recipe__love');
    const result = state.recipe.result;
    if (btnLike) {
        if (!state.likes) {
            state.likes = new Likes();
            state.likes.addLike(result.recipe_id, result.title, result.publisher, result.image_url);
            store.addLike(state.likes.likesArr[state.likes.likesArr.length-1]);
        } else {
            if (state.likes.likesArr.every(isEqual)) {
                state.likes.addLike(result.recipe_id, result.title, result.publisher, result.image_url);
                store.addLike(state.likes.likesArr[state.likes.likesArr.length-1]);
            }
        }
    }

    function isEqual(like) {
        if (like.id !== result.recipe_id) {
            return true;
        }
    }

    likesView.likesClear();
    state.likes.likesArr.forEach(like => likesView.likesRender(like));
};

elements.recipe.addEventListener('click', controlLikes);

window.addEventListener('load', () => {
    const store = new Store();
    if (!state.likes) {
        state.likes = new Likes();
    }
    const likes = store.getLikes();
    likes.forEach(like => {
        likesView.likesRender(like);
        state.likes.addLike(like.id, like.title, like.publisher, like.img);
    });
    console.log(state.likes.likesArr)
});

elements.likesList.addEventListener('click', (e) => {
    const btnRemove = e.target.closest('.likes__delete');
    const store = new Store();
    if (btnRemove) {
        const li = btnRemove.closest('li');
        state.likes.likesArr.forEach(like => {
            if (like.id === li.id) {
                state.likes.removeLike(like.id);
                store.removeLikes(like.id)
            }
        });
    }
});
