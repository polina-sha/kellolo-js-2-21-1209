import Item from './ITEM.js';

let type = {
    Catalog: 'catalog',
    Basket: 'basket'
}

export default class List {
    constructor(container, url, basket = null) {
        this.items = [];
        this.container = document.querySelector(container);
        this.url = 'https://raw.githubusercontent.com/kellolo/static/master/JSON' + url;
        this.basket = basket;
        this._init();
    }

    _init() {
        this._get(this.url)
            .then(data => {
                this.items = this.basket ? data : data.content; 
                if (this.filtered) {
                    this.filtered = data;
                }
                
                this._render();
                this._handleActions();
            })
    }

    _get(url) {
        return fetch(url).then(d => d.json())
    }

    _render() {
        let str = '';
        let arr = this.filtered ? this.filtered : this.items;
        arr.forEach(item => {
            str += new Item(item, type[this.constructor.name]).render()
        })
        this.container.innerHTML = str;
    }

    _handleActions() {
        return true
    }
}