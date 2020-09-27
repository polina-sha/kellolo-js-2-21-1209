export default class Item {
    constructor(item, type) {
        this.item = item;
        this.type = type;
    }

    render() {
        switch (this.type) {
            case 'catalog':
                return renderCatalogItem(this.item);
            case 'basket':
                return renderBasketItem(this.item);
        }
    }
}

function renderCatalogItem (item) {
    return `  
        <div class="item">
                <div class="itemImg">
                    <div class="itemImgHover">
                        <button
                            name="add"
                            data-id="${item.productId}"
                            data-name="${item.productName}"
                            data-price="${item.productPrice}"
                            data-img="${item.productImg}"
                        >
                            <img src="../src/assets/imgs/cart2.png" alt="imgCart">
                            Add to Cart
                        </button>
                    </div>
                    <img src="${item.productImg}" alt="imgProduct">
                </div>
                <div class="itemText">
                    <a href="#">"${item.productName}"</a>
                    <p>"${item.productPrice}"</p>
                </div>
            </div>
        `
}

function renderBasketItem(item) {
    return `
        <div class="headerCartWrapIn">
            <div class="basketItemImg"><img src="${item.productImg}" alt="productPhoto" width="85" height="100></div>
            
            <div class="basketInfoProduct">
                <div class="BasketItemName">${item.productName}</div>
                <span>
                    <i class="fas fa-star goldenStar"></i>
                    <i class="fas fa-star goldenStar"></i>
                    <i class="fas fa-star goldenStar"></i>
                    <i class="fas fa-star goldenStar"></i>
                    <i class="fas fa-star-half-alt goldenStar"></i>
                </span>
                <div class="headerCartWrapPrice">${item.amount}<span>x</span> $${item.productPrice}</div>
            </div>
            <button class="fas fa-times-circle" data-id="${item.productId}" name="remove"></button>     
        </div>
        `;
}