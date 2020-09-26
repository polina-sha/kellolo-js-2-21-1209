import Item from './item';
import Page from './page';
export default class Basket extends Page {
    constructor(url = '/basket.json', container = '.header__drop') {
        super(url, container);
        this.shown = false;
    }
    _handleActions() {
        document.querySelector('#basket-toggler').addEventListener('click', () => {
            this.container.classList.toggle('invisible');
            this.shown = !this.shown;
        })

        document.querySelector(this.container).addEventListener('click', ev => {
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





