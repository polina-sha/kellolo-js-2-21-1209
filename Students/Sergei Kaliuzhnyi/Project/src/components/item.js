export default class Item {
    constructor(item, type) {
        this.item = item;
        this.type = type;
    }

    render() {
            switch (this.type) {
                case 'catalog': {
                    return renderCatalogItem(this.item)
                }

                case 'basket': {
                    return renderBasketItem(this.item)
                }
            }
    }
}


function renderCatalogItem(item) {
    return `<div class="featured__items_block">
                <a href="single_page.html">
                    <div class="featured__items_block-image-1 featured__hover"><img class="feturedProduct" src="${item.productImg}" alt="product1"></div>
                    <h3 class="featured__items_block-name">${item.productName}</h3>
                    <p class="featured__items_block-price">$${item.productPrice}</p>
                </a>
                <button 
                    class="featured__add"
                    name="add"
                    data-id="${item.productId}"
                    data-name="${item.productName}"
                    data-price="${item.productPrice}"
                    data-img="${item.productImg}"
                >
                    <i class="fas fa-shopping-cart"></i> Add to Cart
                </button>
            </div>
            `
}

function renderBasketItem(item) {
    return ` <div class="header__dropbox">
                <a href="single_page.html">
                    <img src="${item.productImg}" class="header__dropimg" alt="" width="85" height="100>
                </a>
                <div class="header__dropcontent">
                    <a href="single_page.html">
                        <h3 class="header__dropname">${item.productName}</h3>
                        <img src="../src/assets/img/headerdropstars.jpg" alt="">
                        <p class="header__dropprice">${item.amount} Х $${item.productPrice}</p>
                    </a>
                </div>
                <button 
                    class="header__cart-drop-button fas fa-times-circle" 
                    data-id="${item.productId}"
                    name="remove"
                ></button>
            </div>
            `
}