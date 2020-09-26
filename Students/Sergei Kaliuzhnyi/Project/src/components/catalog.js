import Item from './item';
import Page from './page';
export default class Catalog extends Page {
    constructor(basket, url = '/catalog.json', container = '.featured__items'){
        super(url, container);
        this.basket = basket;
    }
    _handleActions() {
        document.querySelector(this.container).addEventListener('click', ev => {
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

