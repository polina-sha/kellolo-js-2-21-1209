export default class Item {
    constructor(item, constrName){
        this.item = item;
        this.constrName = constrName;
    }
    render(){
        if(this.constrName == 'Catalog'){
            return `<div class="featured__items_block">
                    <a href="single_page.html">
                        <div class="featured__items_block-image-1 featured__hover"><img class="feturedProduct" src="${this.item.productImg}" alt="product1"></div>
                        <h3 class="featured__items_block-name">${this.item.productName}</h3>
                        <p class="featured__items_block-price">$${this.item.productPrice}</p>
                    </a>
                    <button 
                        class="featured__add"
                        name="add"
                        data-id="${this.item.productId}"
                        data-name="${this.item.productName}"
                        data-price="${this.item.productPrice}"
                        data-img="${this.item.productImg}"
                    >
                        <i class="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                </div>
                `
        } else {
            return  ` <div class="header__dropbox">
                        <a href="single_page.html">
                            <img src="${this.item.productImg}" class="header__dropimg" alt="" width="85" height="100>
                        </a>
                        <div class="header__dropcontent">
                            <a href="single_page.html">
                                <h3 class="header__dropname">${this.item.productName}</h3>
                                <img src="../src/assets/img/headerdropstars.jpg" alt="">
                                <p class="header__dropprice">${this.item.amount} Х $${this.item.productPrice}</p>
                            </a>
                        </div>
                        <button 
                            class="header__cart-drop-button fas fa-times-circle" 
                            data-id="${this.item.productId}"
                            name="remove"
                        ></button>
                    </div>
                    `
        }
    }
};
