import {api, key, proxy} from '../js/config';

export default class Search {
    constructor(query){
        this.query = query;
        this.result = {};
    }

    async getResult() {
        try {
            const res = await fetch(`${proxy}${api}/search?key=${key}&q=${this.query}`);
            const data = await res.json();
            return this.result = data.recipes;
        } catch (error) {
            alert(error);
        }
    }
}