import uniqid from 'uniqid';

export default class List {
    constructor() {
        this.items = [];
    }

    addItem(ingredient) {
        const newItem = {
            id: uniqid(),
            ingredient
        };
        this.items.push(newItem);
    }

    deleteItem(id) {
        document.getElementById(id).remove();
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].id === id) {
                this.items.splice(i, 1);
            }
        }
    }


}