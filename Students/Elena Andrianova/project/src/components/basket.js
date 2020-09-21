export default class Basket {
    constructor() {
        this.items = [];
        this.container = null;
        this.containerItems = null;
        this.shown = false;
        this.url = 'https://raw.githubusercontent.com/kellolo/static/master/JSON/basket.json';
        this._init()
    }
    _init(){
        this.container = document.querySelector('#basket');
        this.containerItems = document.querySelector('#basket-items');
        this._get(this.url)
            .then(bask => {
                this.items = bask.content.map(prod => new BasketProduct(prod.productName, prod.productPrice, prod.productImg, prod.productId, prod.amount));
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
        let htmlStr= '';
        this.items.forEach(item => {
            htmlStr += item.render();
        })

        this.container.innerHTML = htmlStr;
    }
    _handleActions() {
        document.querySelector('#basket-toggler').addEventListener('click', () => {
            this.container.classList.toggle('invisible');
            // document.querySelector('#basket').classList.toggle('invisible');
            this.shown = !this.shown;
        })
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
            this.items.push(new BasketProduct (item.productName, item.productPrice, item.productImg, item.productId, item.amount));
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


}

class BasketProduct {
    constructor(productName, productPrice, productImg, productId, amount) {
        this.productName = productName;
        this.productPrice = productPrice;
        this.productImg = productImg;
        this.productId = productId;
        this.amount = amount;
    }

    render() {
        return `
        <div class="headerCartWrapIn">
            <div class="basketItemImg"><img src="${this.productImg}" alt="productPhoto" width="85" height="100></div>
            
            <div class="basketInfoProduct">
                <div class="BasketItemName">'${this.productName}'</div>
                <span>
                    <i class="fas fa-star goldenStar"></i>
                    <i class="fas fa-star goldenStar"></i>
                    <i class="fas fa-star goldenStar"></i>
                    <i class="fas fa-star goldenStar"></i>
                    <i class="fas fa-star-half-alt goldenStar"></i>
                </span>
                <div class="headerCartWrapPrice">${this.amount}<span>x</span> $${this.productPrice}</div>
            </div>
            <button class="fas fa-times-circle" data-id="${this.productId}"name="remove"></button>
        
        </div>
        `;
    }
}