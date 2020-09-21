import Parent from "./parent";

export default class Basket extends Parent {
    constructor(container = '#basket', containerItems = '#basket-items', items, url = 'basket.json') {
        super(container, items)
        this.containerItems = document.querySelector(containerItems);
        this.shown = false;
        this.url = super.showParentUrl() + url
        this._init();
    }

    _init() {
        this._get(this.url)
            .then(bask => {
                this.items = bask.content.map(bProd => new BasketProduct(bProd.productName, bProd.productPrice, bProd.productImg, bProd.productId, bProd.amount));
            })
            .finally(() => {
                this._render();
                this._handleActions();
            })
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
            /* this.items.push(item); */
            this.items.push(new BasketProduct(item.productName, item.productPrice, item.productImg, item.productId, item.amount));
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
        return `<div class="d-flex headerCartWrapIn mb-1 p-2">
                <img src="${this.productImg}" alt="" width="85" height="100>
                <div>
                    <div>${this.productName}</div>
                    <span>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star-half-alt"></i>
                    </span>
                    <div class="headerCartWrapPrice">${this.amount} 
                        <span>x</span> $${this.productPrice}
                    </div>

            <button 
                class="fas fa-times-circle" 
                data-id="${this.productId}"
                name="remove"
            ></button>
        </div>
        `
    }
}