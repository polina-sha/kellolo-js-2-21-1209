export default class Item {
  constructor(item, type) {
    this.item = item;
    this.type = type;
  }

  render() {
    switch (this.type) {
      case "catalog": {
        return renderCatalogItem(this.item);
      }

      case "basket": {
        return renderBasketItem(this.item);
      }
    }
  }
}

function renderCatalogItem(item) {
  return `
            <div class="col-10 offset-1 col-sm-6 offset-sm-0 col-md-4 col-lg-3 feturedItems ">
                <div class="feturedItem">
                    <div class="feturedImgWrap">
                        <div class="feturedBuy">
                            <button
                                name="add"
                                data-id="${item.productId}"
                                data-name="${item.productName}"
                                data-price="${item.productPrice}"
                                data-img="${item.productImg}"
                            >
                                <div><i class="fas fa-shopping-cart"></i> Add to Cart</div>
                            </button>
                        </div>
                        <img class="feturedProduct" src="${item.productImg}" alt="product1">
                    </div>
                    <div>
                        <div class="feturedBuySm d-flex flex-column justify-content-around align-items-center align-items-md-start">
                            <div class="feturedItemName">${item.productName}</div>
                            <div class="feturedItemPrice">$${item.productPrice}</div>
                            <button 
                                class="d-md-none"
                                name="add"
                                data-id="${item.productId}"
                                data-name="${item.productName}"
                                data-price="${item.productPrice}"
                                data-img="${item.productImg}"
                            >
                                <i class="fas fa-shopping-cart"></i> Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
    `;
}

function renderBasketItem(item) {
  return `
            <div class="d-flex headerCartWrapIn mb-1 p-2">
                    <img src="${item.productImg}" alt="" width="85" height="100>
                    <div>
                        <div>${item.productName}</div>
                        <span>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star-half-alt"></i>
                        </span>
                        <div class="headerCartWrapPrice">${item.amount} 
                            <span>x</span> $${item.productPrice}
                        </div>

                <button 
                    class="fas fa-times-circle" 
                    data-id="${item.productId}"
                    name="remove"
                ></button>
            </div>
        `;
}
