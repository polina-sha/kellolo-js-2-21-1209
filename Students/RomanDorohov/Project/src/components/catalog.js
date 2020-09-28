import List from './LIST.js';

export default class Catalog extends List{
    constructor(basket, container = '#catalog', url = '/catalog.json') {
        super(container, url, basket)
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

}