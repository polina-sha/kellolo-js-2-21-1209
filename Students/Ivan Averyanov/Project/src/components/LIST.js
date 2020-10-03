import  Items from './ITEMS';

let type = {
    Catalog: 'catalog',
    Basket: 'basket'
}

export default class List {
    constructor(url,container,basket = null){
        this.container = document.querySelector(container);
        this.basket = basket;
        this.items = [];
        this.url = 'https://raw.githubusercontent.com/xorrou1/responses/master/JSON%20carts%20marcet' + url;
        this.init();
    }
    init(){
        this._get(this.url)
            .then(data => {
                this.items = this.basket ? data: data.content;
            })
            .finally(() => {
                this._render();
                this.buyButton = document.querySelectorAll(this.button);
                this._handleActions();
            })
    }
    _get(url) {
        return fetch(url).then(d => d.json());
    }

    _render() {
        let htmlStr = '';
        this.items.forEach(item => {
            htmlStr += new Items(item,type[this.constructor.name]).render()
        });
        this.container.innerHTML = htmlStr;
    }
        
}