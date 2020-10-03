export default class generateHtml {
  constructor(type, item) {
    this.type = type;
    this.item = item;
  }
  _render() {
    switch (this.type) {
      case 'catalog':
        return genCatalogHtml(this.item);
      case 'basket':
        return genBasketHtml(this.item);
    }
  }
}

function genCatalogHtml(item) {
  return `
  <div class="b-item" id="${item.productId}">
    <div class="b-item-pic">
      <img src="${item.productImg}" alt="1">
    </div>
    <div class="b-item-txt">
      <span>${item.productName}</span>
      <span>$${item.productPrice}.00</span>
    </div>
    <div class="b-item-overlay">
      <button                                       
          name="add"
          data-id="${item.productId}"
          data-name="${item.productName}"
          data-price="${item.productPrice}"
          data-img="${item.productImg}"
      >
          <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-basket3" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M10.243 1.071a.5.5 0 0 1 .686.172l3 5a.5.5 0 1 1-.858.514l-3-5a.5.5 0 0 1 .172-.686zm-4.486 0a.5.5 0 0 0-.686.172l-3 5a.5.5 0 1 0 .858.514l3-5a.5.5 0 0 0-.172-.686z" />
              <path d="M0 6.5A.5.5 0 0 1 .5 6h15a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H.5a.5.5 0 0 1-.5-.5v-1zM.81 9c0 .035.004.07.011.105l1.201 5.604A1 1 0 0 0 3 15.5h10a1 1 0 0 0 .978-.79l1.2-5.605A.495.495 0 0 0 15.19 9h-1.011L13 14.5H3L1.821 9H.81z" />
          </svg>
          Add to Cart
      </button>
    </div>  
  </div>`
}

function genBasketHtml(item) {
  return `
  <div class="b-basket__row">
  <div class="b-basket__row__item b-basket-main">
    <div class="b-basket__row__item-img"><img src="${item.productImg}" alt="basket"></div>
    <div class="b-basket__row__item-txt">
      <h3><a href="#">${item.productName}</a></h3>
      <p><b>Color:</b> ${item.productName}<br>
      <b>Size:</b> ${item.productSize}</p>
    </div>
  </div>
  <div class="b-basket-info">${item.productPrice}</div>
  <div class="b-basket-info"><input type="text" maxlength="4" value="${item.amount}" data-id="${item.productId}" data-command="ca"></div>
  <div class="b-basket-info">free</div>
  <div class="b-basket-info">${item.productPrice*item.amount}</div>
  <div class="b-basket-info">
    <button>   
      <i class="fas fa-times-circle" aria-hidden="true" data-id="${item.productId}" data-command="rm" style="font-size:15px"></i>
    </button>
  </div>
</div>`
}


