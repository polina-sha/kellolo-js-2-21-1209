export default class Catalog {
    constructor(basket) {
        this.container = null;
        this.items = [];
        this.url = 'https://raw.githubusercontent.com/kellolo/static/master/JSON/catalog.json';
        this.basket = basket;
        this._init();
    }

    _init() {
        this.container = document.querySelector('#catalog');
        this._get(this.url)
            .then(arr => {
                this.items = arr.map(p => new Product(p.productName, p.productPrice, p.productImg, p.productId));
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
        let html = '';
        this.items.forEach(item => {
            html += item.render();
        })

        this.container.innerHTML = html;
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

class Product {
    constructor(productName, productPrice, productImg, productId) {
        this.productName = productName;
        this.productPrice = productPrice;
        this.productImg = productImg;
        this.productId = productId;
    }

    render() {
        return `  
        <div class="item">
                <div class="itemImg">
                    <div class="itemImgHover">
                        <button
                            name="add"
                            data-id="${this.productId}"
                            data-name="${this.productName}"
                            data-price="${this.productPrice}"
                            data-img="${this.productImg}"
                        >
                            <img src="../src/assets/imgs/cart2.png" alt="imgCart">
                            Add to Cart
                        </button>
                    </div>
                    <img src="${this.productImg}" alt="imgProduct">
                </div>
                <div class="itemText">
                    <a href="#">"${this.productName}"</a>
                    <p>"${this.productPrice}"</p>
                </div>
            </div>
        `
    }
}