class CatalogItem {
    constructor(item) {
        this.item = item;
    }

    render() {
        return `
            <section class="product">
                <a href="#"><img class="product__img" src="${this.item.productImg}" alt="photo"></a>
                <div class="product__content">
                    <h2><a href="#" class="product__name">${this.item.productName}</a></h2>
                    <p class="product__price">$${this.item.productPrice}</p>
                </div>
                <a href="#" class="product__add"
                            name="add"
                            data-id="${this.item.productId}"
                            data-name="${this.item.productName}"
                            data-price="${this.item.productPrice}"
                            data-img="${this.item.productImg}"
                ><img src="../src/assets/imgs/addToCart.png" alt="Корзина"> Add to Cart</a>
            </section>
        `
    }
}

class CatalogInit {
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
}

export default class Catalog extends CatalogInit {
    constructor(basket, container = '#catalog', url = '/catalog.json') {
        super(url);
        this.container = document.querySelector(container);
        this.items = [];
        this.basket = basket;
        this.url = 'https://raw.githubusercontent.com/kellolo/static/master/JSON' + url;
        this.init();
    }

    _fillCatalog() { //Инкапсуляция (условная для JS)
        this.items = getArrayOfObjects();
    }

    _render() {
        let htmlStr = '';
        this.items.forEach(item => {
            htmlStr += new CatalogItem(item).render();
        });
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
}