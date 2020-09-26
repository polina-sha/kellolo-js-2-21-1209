class BasketItem {
    constructor(item) {
        this.item = item;
    }

    render() {
        return `
            <div class="d-flex headerCartWrapIn">
                <a href="#" class="d-flex ">
                    <img src="${this.item.productImg}" alt="photo">
                    <div>
                        <div>${this.item.productName}</div>
                        <span><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i></span>
                        <div class="headerCartWrapPrice">${this.item.amount} <span>x</span> $${this.item.productPrice}</div>
                    </div>
                </a>
                <button 
                    class="fas fa-times-circle" 
                    data-id="${this.item.productId}"
                    name="remove"
                ></button>
            </div>
        `
    }
}

class BasketInit {
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
}

export default class Basket extends BasketInit {
    constructor(container = '#basket', url = '/basket.json') {
        super(url);
        this.items = [];
        this.container = document.querySelector(container);
        this.containerItems = document.querySelector('#basket-items');
        this.shown = false;
        this.url = 'https://raw.githubusercontent.com/kellolo/static/master/JSON' + url;
        this.init();
    }

    _render() {
        let htmlStr = '';
        this.items.forEach(item => {
            htmlStr += new BasketItem(item).render();
        });
        htmlStr += `
            <div class="headerCartWrapTotalPrice">
                <div>total</div>
                <div>$500.00</div>
            </div>

            <button type="button" class="button productsButtonIndex">Checkout</button>
            <button type="button" class="button productsButtonIndex">Go to cart</button>
        `;
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
}