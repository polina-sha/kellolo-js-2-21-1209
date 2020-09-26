class BasketIint{
    constructor(item){
        this.item= item;
    }
    render(init){
        return   `            
        <div class="cart-list__product">
                <a href="product.html" class="cart-list__product_image"><img src="${this.item.productImg}" alt="tee-shirt"></a>
                    <div class="cart-list__product_data">
                        <a href="product.html"><h3>${this.item.productName}</h3></a>
                            <div class="star-rating">
                                <img src="../src/assets/img/promo/star-rating.png" alt="star-rating">    
                            </div>
                            <span><span class="product-count" data-id="${this.item.productIdd}">${this.item.amount} </span>x $ ${this.item.productPrice}</span>
            </div>
            <input class="product-remove-btn" 
                data-id="${this.item.productId}" 
                type="image" 
                src="../src/assets/img/promo/arrow_cancel.png"
                name="remove" 
                alt="arrow_cancel">
        </div>       
        `
    }
}

export default class Basket {
    constructor(url = '/basket.json', container='.cart-list-content',sumTotal= '.cart-list__total-span' ){
        this.items= [];
        this.container = document.querySelector(container);
        this.shown= false;
        this.url= 'https://raw.githubusercontent.com/xorrou1/responses/master/JSON%20carts%20marcet' + url;
        this.sumTotal = document.querySelector(sumTotal);
        this.init();
    }
    
    init() {       
        this._get(this.url)
            .then(basket => {
                this.items = basket.content;
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
        let htmlStr = '';
        this.items.forEach(item => {
            htmlStr += new BasketIint(item).render() 
        });

        this.container.innerHTML = htmlStr;
        this.renderTotalSum();
    }
    _handleActions() {
        this.container.addEventListener('click', ev => {
            if (ev.target.name == 'remove') {
                this._remove(ev.target.dataset.id);
            }
        })
    }
    add(item) {
        let find = this.items.find(el => el.productId == item.productId);
        if (find) {
            find.amount++;
        } else {
            this.items.push(item);
        }
        this._render();
    }
    _remove(id) {
        let find = this.items.find(el => el.productId == id);
        if (find.amount > 1) {
            find.amount--;
        } else {
            this.items.splice(this.items.indexOf(find), 1);
        }
        this._render();
    }

    renderTotalSum() {
        this.sumTotal.textContent = this._getTotalSum();
    }

    _getTotalSum() {
        let sum = 0;
        for (let key in this.items) {
            sum += this.items[key].productPrice * this.items[key].amount;
        }
        return sum;
    }

}

/* let basket = new Basket(); */
