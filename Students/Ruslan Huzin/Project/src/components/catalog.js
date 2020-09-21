import Parent from "./parent";

export default class Catalog extends Parent {
    constructor(basket, container = '#catalog', items, url = 'catalog.json') {
        super(container, items)
        this.basket = basket;
        this.url = super.showParentUrl() + url;
        this._init();
    }

    _init() {
        this._get(this.url)
            .then(arr => {
                this.items = arr.map(p => new Product(p.productName, p.productPrice, p.productImg, p.productId));
            })
            .finally(() => {
                this._render();
                this._handleActions();
            })
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
        return `<div class="col-10 offset-1 col-sm-6 offset-sm-0 col-md-4 col-lg-3 feturedItems ">
                    <div class="feturedItem">
                        <div class="feturedImgWrap">
                            <div class="feturedBuy">
                                <button
                                    name="add"
                                    data-id="${this.productId}"
                                    data-name="${this.productName}"
                                    data-price="${this.productPrice}"
                                    data-img="${this.productImg}"
                                >
                                    <div><i class="fas fa-shopping-cart"></i> Add to Cart</div>
                                </button>
                            </div>
                            <img class="feturedProduct" src="${this.productImg}" alt="product1">
                        </div>
                        <div>
                            <div class="feturedBuySm d-flex flex-column justify-content-around align-items-center align-items-md-start">
                                <div class="feturedItemName">${this.productName}</div>
                                <div class="feturedItemPrice">$${this.productPrice}</div>
                                <button 
                                    class="d-md-none"
                                    name="add"
                                    data-id="${this.productId}"
                                    data-name="${this.productName}"
                                    data-price="${this.productPrice}"
                                    data-img="${this.productImg}"
                                >
                                    <i class="fas fa-shopping-cart"></i> Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
        `
    }
}