export default class Search {
    constructor(query){
        this.query = query;
        this.result = {};
    }

    async getResult() {
        const key = '56c114c9ee24fd0e851e676502796410';
        try {
            const res = await fetch(`https://cors-anywhere.herokuapp.com/http://food2fork.com/api/search?key=${key}&q=${query}`);
            const data = await res.json();
            return this.result = data.recipes;
        } catch (error) {
            console.log(error);
        }
    }
}