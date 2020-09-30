export default class  Catalog {
    constructor(basket, container = '#catalog', url = '/catalog.json') {
        this.container = document.querySelector(container);
        this.items = [];
        this.url = 'https://raw.githubusercontent.com/Alaya95/static/master/JSON'+ url;
        this.basket = basket;
        this._init();
    }

    _init() {
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
        this.items.forEach(item => {
            htmlStr += new CatalogItem(item).render();
        })

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

class CatalogItem {
    constructor(item) {
        this.item = item;
    }

    render() {
        return `  
        <div class="item">
                <div class="itemImg">
                    <div class="itemImgHover">
                        <button
                            name="add"
                            data-id="${this.item.productId}"
                            data-name="${this.item.productName}"
                            data-price="${this.item.productPrice}"
                            data-img="${this.item.productImg}"
                        >
                            <img src="../src/assets/imgs/cart2.png" alt="imgCart">
                            Add to Cart
                        </button>
                    </div>
                    <img src="${this.item.productImg}" alt="imgProduct">
                </div>
                <div class="itemText">
                    <a href="#">"${this.item.productName}"</a>
                    <p>"${this.item.productPrice}"</p>
                </div>
            </div>
        `
    }
}