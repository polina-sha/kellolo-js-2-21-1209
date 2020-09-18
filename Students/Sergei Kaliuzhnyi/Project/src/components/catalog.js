// import { basket } from './basket';

class Catalog {
    constructor(){
        this.container = null;
        this.items = [];
        this.basket = null;
        this.url = 'https://raw.githubusercontent.com/kellolo/static/master/JSON/catalog.json';
        // this.init();
    }
    init(basket) {
        this.container = document.querySelector('.featured__items');
        this.basket = basket;
        this._get(this.url)
            .then(arr => {
                this.items = arr;
            })
            .finally(() => {
                this._render();
                this._handleActions();
            })
    }
    _get(url) {
        return fetch(url).then(d => d.json());
    }
    _render() {
        let htmlStr = '';
        this.items.forEach(item => htmlStr += new CatalogItem(item).render());
        this.container.innerHTML = htmlStr;
    }
    _handleActions() {
        this.container.addEventListener('click', ev => {
            if (ev.target.name == 'add') {
                let dataset = ev.target.dataset;
                this.basket.add(this._createNewItem(dataset));
            }
        })
    }
    _createNewItem(dataset) {
        return {
            productId: dataset.id,
            productName: dataset.name,
            productImg: dataset.img,
            productPrice: +dataset.price,
            amount: 1
        }
    }
};

class CatalogItem {
    constructor(item){
        this.img = item.productImg;
        this.name = item.productName;
        this.price = item.productPrice;
        this.id = item.productId;
    }
    render(){
        return `<div class="featured__items_block">
                    <a href="single_page.html">
                        <div class="featured__items_block-image-1 featured__hover"><img class="feturedProduct" src="${this.img}" alt="product1"></div>
                        <h3 class="featured__items_block-name">${this.name}</h3>
                        <p class="featured__items_block-price">$${this.price}</p>
                    </a>
                    <button 
                        class="featured__add"
                        name="add"
                        data-id="${this.id}"
                        data-name="${this.name}"
                        data-price="${this.price}"
                        data-img="${this.img}"
                    >
                        <i class="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                </div>
                `
    }
};

export let catalog = new Catalog();

