'use strict'

class ProductItem{
    constructor(item, container) {
        this.item = item;
        this.container = container;
    }

    render() {
        console.log(this.container);
        if (this.container.attributes.id.nodeValue == 'basket-items'){
            return `
                <div class="d-flex headerCartWrapIn mb-1 p-2 dropDown--product">
                        <img src="${this.item.productImg}" alt="" width="85" height="100>
                        <div>
                            <div>${this.item.productName}</div>
                            <span>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star-half-alt"></i>
                            </span>
                            <div class="headerCartWrapPrice">${this.item.amount} 
                                <span>x</span> $${this.item.productPrice}
                            </div>
        
                    <button 
                        class="fas fa-times-circle" 
                        data-id="${this.item.productId}"
                        name="remove"
                    ></button>
                </div>
                `
        } else if(this.container.attributes.id.nodeValue == 'catalog') {
            return `<div class="col-10 offset-1 col-sm-6 offset-sm-0 col-md-4 col-lg-3 feturedItems ">
                <div class="feturedItem fetured_items__link">
                    <div class="feturedImgWrap">
                        <div class="feturedBuy">
                            <button
                                class="hover_cart"
                                name="add"
                                data-id="${this.item.productId}"
                                data-name="${this.item.productName}"
                                data-price="${this.item.productPrice}"
                                data-img="${this.item.productImg}"
                            >
                                <div><i class="fas fa-shopping-cart"></i> Add to Cart</div>
                            </button>
                        </div>
                        <img class="feturedProduct" src="${this.item.productImg}" alt="product1">
                    </div>
                    <div>
                        <div class="feturedBuySm d-flex flex-column justify-content-around align-items-center align-items-md-start">
                            <div class="feturedItemName">${this.item.productName}</div>
                            <div class="feturedItemPrice price">$${this.item.productPrice}</div>
                        </div>
                    </div>
                </div>
            </div>`
        }
    }
}

export default class ProductBox{
    constructor(container, url) {
        this.container = document.querySelector(container);
        this.items = [];
        this.url = 'https://raw.githubusercontent.com/AlinaNasibullina/static/master/JSON' + url;
        // this.init();
    }

    // init() {
    //     this._get(this.url)
    //         .then(arr => {
    //             this.items = arr.content;
    //         })
    //         .finally(() => {
    //             this._render();
    //             this._handleActions();
    //         })
    // }

    
    _get(url) {
        return fetch(url).then(d => d.json());
    }

    _render() {
        let htmlStr = '';
        this.items.forEach((item) => {
            htmlStr += new ProductItem(item, this.container).render();
        });
        this.container.innerHTML = htmlStr;
    }
}