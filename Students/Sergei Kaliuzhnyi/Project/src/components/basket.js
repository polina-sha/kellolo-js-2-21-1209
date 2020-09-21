class Basket {
    constructor() {
        this.items = [];
        this.container = null;
        // this.containerItems =null,
        this.shown = false;
        this.url = 'https://raw.githubusercontent.com/kellolo/static/master/JSON/basket.json';
        this._init();
    }
    _init() {
        this.container = document.querySelector('.header__drop');
        //this.containerItems = document.querySelector('');
        this._get(this.url)
            .then(basket => {
                this.items = basket.content;
            })
            .finally(() => {
                this._render();
                this._handleActions();
                console.log(this.items);
            })
    }
    _get(url) {
        return fetch(url).then(d => d.json());
    }
    _render() {
        let htmlStr = '';
        this.items.map(item => {
            htmlStr += new BasketItem(item).render();
        });
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
};

class BasketItem {
    constructor(item) {
        this.name = item.productName;
        this.img = item.productImg;
        this.price = item.productPrice;
        this.amount = item.amount;
        this.id = item.productId;
    }
    render() {
        return ` <div class="header__dropbox">
                    <a href="single_page.html">
                        <img src="${this.img}" class="header__dropimg" alt="" width="85" height="100>
                    </a>
                    <div class="header__dropcontent">
                        <a href="single_page.html">
                            <h3 class="header__dropname">${this.name}</h3>
                            <img src="../src/assets/img/headerdropstars.jpg" alt="">
                            <p class="header__dropprice">${this.amount} Х $${this.price}</p>
                        </a>
                    </div>
                    <button 
                        class="header__cart-drop-button fas fa-times-circle" 
                        data-id="${this.id}"
                        name="remove"
                    ></button>
                </div>
                `
    }
};

export let basket = new Basket();




