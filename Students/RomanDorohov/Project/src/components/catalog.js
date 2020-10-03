import List from './LIST.js';

export default class Catalog extends List{
    constructor(basket, search, container = '#catalog', url = '/catalog.json') {
        super(container, url, basket);
        this.search = search;
        this.filtered = [];
    }
    
    _handleActions() {
        this.container.addEventListener('click', ev => {
            if (ev.target.name == 'add') {
                let dataset = ev.target.dataset;
                this.basket.add({
                    productId: dataset.Id,
                    productImg: dataset.Img,
                    productPrice: dataset.Price,
                    productName: dataset.Name,
                });
            }
        })
    }

    _filter() {
        this.filtered = this.items.filter(item => item.productName.match(this.search.regularExpression))
        this._render();
    }

}