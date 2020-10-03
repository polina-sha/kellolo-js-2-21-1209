export default class Basket {
    constructor() {
        this.height= 400;
        this.items=[];
        this.container= null;
        this.containerItems= null;
        this.shown=false;
        this.url= 'https://raw.githubusercontent.com/kellolo/static/master/JSON/basket.json';
        this.init();
    }

    init() {
        this.container = document.querySelector('.dropdown-buy');
        this.containerItems = document.querySelector('.cart-products');
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
            htmlStr += `
            <div class="product-drop">
    <div class="sell-block">
    <img src="${item.productImg}" alt="pic">
    <div class="product-drop-textbox">
    <div>${item.productName}</div>
    <span>
    <i class="fas fa-star"></i>
    <i class="fas fa-star"></i>
    <i class="fas fa-star"></i>
    <i class="fas fa-star"></i>
    <i class="fas fa-star-half-alt"></i>
    </span>
<div> ${item.amount} <span>x</span>   $${item.productPrice}</div>
</div>
</div>
<div class="action">
    <button 
                    class="fas fa-times-circle" 
                    data-id="${item.productId}"
                    name="remove"
                ></button>
</div>
</div>

            `
        });
        this.containerItems.innerHTML = htmlStr;
        this.totalPrice();
    }
    totalPrice(){
        let sum=0;
        this.items.forEach(item=>{
            sum+=item.amount*item.productPrice;
        })
        let tPrice=document.querySelector("#total-cart-price");
        tPrice.innerHTML="$"+sum;
    }
    _handleActions() {
        document.querySelector('.header__cart').addEventListener('click', () => {
            this.container.classList.toggle('invisible');
            this.shown = !this.shown;
        })
        let remove=document.querySelectorAll(".action > button");
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
            this.height+=105
            this.container.style.height=this.height+'px';
        }
        this.totalPrice();
        this._render();
    }
    _remove(id) {
        let find = this.items.find(el => el.productId == id);
        if (find.amount > 1) {
            find.amount--;
        } else {
            this.items.splice(this.items.indexOf(find), 1);
            this.height-=105;
            this.container.style.height=this.height+'px';
        }
        this.totalPrice();
        this._render();
    }
}
