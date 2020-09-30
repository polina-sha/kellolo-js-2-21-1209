import List from "./LIST";

export default class Catalog extends List {
    constructor(basket, container = '#catalog', url = '/catalog.json') {
        super(container, url, basket)
        this.basket = basket;
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
}
