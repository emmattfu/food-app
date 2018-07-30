import { elements } from "./base";

export const listRender = ingredient => {
    const markup = `
        <li class="shopping__item" id="${ingredient.id}">
            <p class="shopping__description">${ingredient.ingredient}</p>
            <button class="shopping__delete btn-tiny">
                <svg>
                    <use href="img/icons.svg#icon-circle-with-cross"></use>
                </svg>
            </button>
        </li>
    `;

    // console.log(ingredient);
    elements.shoppingList.insertAdjacentHTML("beforeend", markup);
};

export const listClear = () => {
   elements.shoppingList.innerHTML = '';
};