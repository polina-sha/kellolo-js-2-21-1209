import Item from "./ITEM";

let type = {
    Catalog: 'catalog',
    Basket: 'basket',
}

export default class List {
    constructor(container, url, basket = null) {
        this.container = document.querySelector(container);
        this.items = [];
        this.url = 'https://raw.githubusercontent.com/Alaya95/static/master/JSON'+ url;
        this.basket = basket;
        this._init();
    }

    _init() {
        this._get(this.url)
            .then(data => {
                this.items = this.basket ? data : data.content;
                this._render();
                this._handleActions()
            })
    }
    _get(url) {
        return fetch(url).then(d => d.json());
    }

    _render() {
        let htmlStr = '';
        this.items.forEach(item => {
            htmlStr += new Item(item, type[this.constructor.name]).render()
        })
        this.container.innerHTML = htmlStr;
    }

    _handleActions() {
        return true
    }

}