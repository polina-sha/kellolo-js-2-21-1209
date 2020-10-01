

export default class Items {
    constructor(item,type){
        this.item = item;
        this.type = type;
    }
    render(){
        if(this.type == 'basket'){
          return  renderBascetItems(this.item);
        } return renderCatalogItems(this.item);
    }

}

function renderBascetItems(item){
    return   `            
    <div class="cart-list__product">
            <a href="product.html" class="cart-list__product_image"><img src="${item.productImg}" alt="tee-shirt"></a>
                <div class="cart-list__product_data">
                    <a href="product.html"><h3>${item.productName}</h3></a>
                        <div class="star-rating">
                            <img src="../src/assets/img/promo/star-rating.png" alt="star-rating">    
                        </div>
                        <span><span class="product-count" data-id="${item.productIdd}">${item.amount} </span>x $ ${item.productPrice}</span>
        </div>
        <input class="product-remove-btn" 
            data-id="${item.productId}" 
            type="image" 
            src="../src/assets/img/promo/arrow_cancel.png"
            name="remove" 
            alt="arrow_cancel">
    </div>       
    `
}

function renderCatalogItems(item){
    return `
         <div href="shoppingCart.html" class="catalog__product">
             <div class="catalog__mango">
                <img class="mango" src="${item.productImg}" alt="mango">
                    <button type="button" class="AddToCart AddToCart-clic "
                        name = "add"
                        data-id="${item.productId}" 
                        data-price="${item.productPrice}" 
                        data-name="${item.productName}" 
                        data-img="${item.productImg}">
                        <img class="AddToCart-clic" name = "add" src="../src/assets/img/FeturedItems/AddToCart.png" alt="AddToCart"><span class="AddToCart-clic" name = "add">Add to Cart</span>
                    </button>
                </div>
            <div class="product__name">${item.productName}</div>
            <div class="product__price">$${item.productPrice}</div>
        </div>           
    `
}