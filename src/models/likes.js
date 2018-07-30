export default class Likes {
    constructor () {
        this.likesArr = [];
    }

    addLike(id,title, publisher, img) {
        const newLike = {
            id,
            title,
            publisher,
            img
        };

        this.likesArr.push(newLike);

    }

    removeLike(id) {
        document.getElementById(id).remove();
        for (let i = 0; i < this.likesArr.length; i++) {
            if (this.likesArr[i].id === id) {
                this.likesArr.splice(i, 1);
            }
        }
    }


}

