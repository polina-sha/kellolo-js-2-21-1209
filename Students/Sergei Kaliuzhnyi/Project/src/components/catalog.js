export default class Catalog {
    constructor(basket, url = '/catalog.json', container = '.featured__items'){
        this.container = document.querySelector(container);
        this.items = [];
        this.basket = basket;
        this.url = 'https://raw.githubusercontent.com/kellolo/static/master/JSON' + url;
        this.init();
    }
    init() {
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
        this.item = item;
    }
    render(){
        return `<div class="featured__items_block">
                    <a href="single_page.html">
                        <div class="featured__items_block-image-1 featured__hover"><img class="feturedProduct" src="${this.item.productImg}" alt="product1"></div>
                        <h3 class="featured__items_block-name">${this.item.productName}</h3>
                        <p class="featured__items_block-price">$${this.item.productPrice}</p>
                    </a>
                    <button 
                        class="featured__add"
                        name="add"
                        data-id="${this.item.productId}"
                        data-name="${this.item.productName}"
                        data-price="${this.item.productPrice}"
                        data-img="${this.item.productImg}"
                    >
                        <i class="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                </div>
                `
    }
};


