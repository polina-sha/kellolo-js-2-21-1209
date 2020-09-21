export class cart{
    constructor() {
        this.items = [];
        this.selector = null;
        this.url = "https://raw.githubusercontent.com/kulyamzin/GeekBrain/master/Files/GeekBrains/basket.json";
    }
    init() {
        this.selector = document.querySelector('.b-basket');
        this._get(this.url)
            .then(jsonTxt => {
                this.items = jsonTxt.content;
                this.total = jsonTxt.totalPrice;
            })
            .finally(() => {
                this._render();
                this._handle();
            })
    }
    _get(url) {
        return fetch(url).then(document => document.json());
    }
    _handle() {
        this.selector.addEventListener('click', event => {
            switch (event.target.dataset.command) {
                case 'rm':
                    this.removeFullObj(event.target.dataset.id);
                    break;
            }
            this.selector.addEventListener('change', event => {
                if (event.target.dataset.command == 'ca') {
                    this.changeAmount(event.target.dataset.id,event.target.value);
                };
            })
        })
    }
    _render() {
        let htmlToRend =`
    <div class="b-basket__top">
        <div class="b-basket-main">Product Details</div>
        <div class="b-basket-info">unite Price</div>
        <div class="b-basket-info">Quantity</div>
        <div class="b-basket-info">shipping</div>
        <div class="b-basket-info">Subtotal</div>
        <div class="b-basket-info">ACTION</div>
    </div>`;
        this.items.forEach(item => {
            let renderResult = new genShopingCartHtml(item);
            htmlToRend += renderResult._rend();
        })
        this.selector.innerHTML = htmlToRend;
    }
    removeFullObj(id) {
        let elemDelId = this.items.find(element => element.productId == id);
        this.items.splice(this.items.indexOf(elemDelId), 1);
        this._render();
    }
    changeAmount(id,newVal) {
        let elemCaId = this.items.find(element => element.productId == id);
        elemCaId.amount = newVal;
        this._render();
    }
}

class genShopingCartHtml {
    constructor(item) {
        this.productId = item.productId;
        this.productImg = item.productImg;
        this.productPrice = item.productPrice;
        this.productName = item.productName;
        this.productColor = item.productColor;
        this.productSize = item.productSize;
        this.amount = item.amount;
    }
    _rend() { 
        let renderResult ='';
        return renderResult =
        `<div class="b-basket__row">
        <div class="b-basket__row__item b-basket-main">
          <div class="b-basket__row__item-img"><img src="${this.productImg}" alt="basket"></div>
          <div class="b-basket__row__item-txt">
            <h3><a href="#">${this.productName}</a></h3>
            <p><b>Color:</b> ${this.productColor}<br>
            <b>Size:</b> ${this.productSize}</p>
          </div>
        </div>
        <div class="b-basket-info">${this.productPrice}</div>
        <div class="b-basket-info"><input type="text" maxlength="4" value="${this.amount}" data-id="${this.productId}" data-command="ca"></div>
        <div class="b-basket-info">free</div>
        <div class="b-basket-info">${this.productPrice*this.amount}</div>
        <div class="b-basket-info">
          <button>   
            <i class="fas fa-times-circle" aria-hidden="true" data-id="${this.productId}" data-command="rm" style="font-size:15px"></i>
          </button>
        </div>
      </div>`
    }
}