import List from './LIST.js';

export default class Basket extends List {
    constructor(url = '/basket.json', container='.cart-list-content',sumTotal= '.cart-list__total-span' ){
        super(url,container)
            this.shown= false;
            this.sumTotal = document.querySelector(sumTotal);

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

