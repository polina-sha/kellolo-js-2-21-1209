'use strict'

import ProductBox from './productBox'

export default class Basket extends ProductBox {
    constructor(container = '#basket-items', url = '/basket.json'){
        super(container = '#basket-items', url = '/basket.json')
        this.containerItems = document.querySelector('#basket');
        // this.url = 'https://raw.githubusercontent.com/AlinaNasibullina/static/master/JSON' + url;
        this.shown = false;
        this.init();
    }

    init() {
        this._get(this.url)
            .then(basketItems => {
                this.items = basketItems.content;
            })
            .finally(() => {
                this._render();
                this._handleActions();
            })
    }

    // _get(url) {
    //     return fetch(url).then(d => d.json());
    // }
    
    // _render() {
    //     let htmlStr = '';
    //     this.items.forEach(item => {
    //         htmlStr += new BasketItem(item).render();
    //     });
    //     this.container.innerHTML = htmlStr;
    // }
    _handleActions() {
        document.querySelector('#basket-toggler').addEventListener('click', () => {
            // this.container.classList.toggle('invisible');
            document.querySelector('#basket').classList.toggle('invisible');
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
