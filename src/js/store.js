export default class Store {
    getLikes() {
        let likes;
        if(!localStorage.getItem('likes')) {
            likes = [];
        } else {
            likes = JSON.parse(localStorage.getItem('likes')); // Перегоняем их из json в обычный массив
        }

        return likes;
    }

    addLike(like) {
        // Get books from localstorage
        const likes = this.getLikes();
        // Add new book
        likes.unshift(like);
        console.log(likes);
        // Save localstorage;
        localStorage.setItem('likes', JSON.stringify(likes));

    }

    removeLikes(likeId) {
        const likes = this.getLikes();
        for (let i = 0; i < likes.length; i++) {
            if (likes[i].id === likeId){
                likes.splice(i, 1);
                localStorage.setItem('likes', JSON.stringify(likes));
            }
        }
    }
}