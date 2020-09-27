import List from "./LIST";

export default class  Catalog extends List{
    constructor(basket, container = '#catalog', url = '/catalog.json') {
       super(container, url, basket);
    }

    _handleActions() {
        this.container.addEventListener('click', ev => {
            if (ev.target.name == 'add') {
                let dataset = ev.target.dataset;
                this.basket.add({
                    productId: dataset.id,
                    productImg: dataset.img,
                    productPrice: +dataset.price,
                    productName: dataset.name
                });
            }
        })
    }

}
