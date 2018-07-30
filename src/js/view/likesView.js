import { elements } from "./base";

export const likesRender = like => {
   const markup = `
        <li id="${like.id}">
            <a class="likes__link" href="#">
                <button class="likes__delete btn-tiny">
                 <svg>
                    <use href="img/icons.svg#icon-circle-with-cross"></use>
                 </svg>
               </button>
                <figure class="likes__fig">
                    <img src="${like.img}" alt="Test">
                </figure>
                <div class="likes__data">
                    <h4 class="likes__name">${like.title}</h4>
                    <p class="likes__author">${like.publisher}</p>
                </div>
            </a>         
        </li>   
   `;

   elements.likesList.insertAdjacentHTML('beforeend', markup);
};

export const likesClear = () => {
    elements.likesList.innerHTML = '';
};

