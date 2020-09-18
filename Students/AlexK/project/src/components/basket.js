export let basket = {
    items: [],
    container: null,
    containerItems: null,
    // shown: false,
    url: 'https://raw.githubusercontent.com/kulyamzin/GeekBrain/master/Files/GeekBrains/basket.json',
    init() {
        this.container = document.querySelector('.b-basket');
        // this.containerItems = document.querySelector('#basket-items');
        this._get(this.url)
            .then(basket => {
                this.items = basket.content;
            })
            .finally(() => {
                this._render();
                this._handleActions();
            })
    },
    _get(url) {
        return fetch(url).then(d => d.json());
    },
    _render() {
        let htmlStr = `<div class="b-basket__top">
                        <div class="b-basket-main">Product Details</div>
                        <div class="b-basket-info">unite Price</div>
                        <div class="b-basket-info">Quantity</div>
                        <div class="b-basket-info">shipping</div>
                        <div class="b-basket-info">Subtotal</div>
                        <div class="b-basket-info">ACTION</div>
                       </div>`;
        this.items.forEach(item => {
            htmlStr += `
            <div class="b-basket__row">
            <div class="b-basket__row__item b-basket-main">
                <div class="b-basket__row__item-img"><img src="${item.productImg}" alt="basket"></div>
                <div class="b-basket__row__item-txt">
                    <h3><a href="#">${item.productName}</a></h3>
                    <p><b>Color:</b> ${item.productColor}<br>
                       <b>Size:</b> ${item.productSize}</p>
                </div>
            </div>
            <div class="b-basket-info">${item.productPrice}</div>
            <div class="b-basket-info"><input type="text" maxlength="4" value="${item.amount}"></div>
            <div class="b-basket-info">free</div>
            <div class="b-basket-info">${item.productPrice*item.amount}</div>
            <div class="b-basket-info">
                <button>   
                    <i class="fa fa-times-circle-o" aria-hidden="true" data-id="${item.productId}" name="remove"></i>
                </button>
            </div>
        </div>`

        });
        this.container.innerHTML = htmlStr;
    },
    _handleActions() {
        // document.querySelector('#basket-toggler').addEventListener('click', () => {
        //     this.container.classList.toggle('invisible');
        //     // document.querySelector('#basket').classList.toggle('invisible');
        //     this.shown = !this.shown;
        // })

        this.container.addEventListener('click', ev => {
            if (ev.target.getAttribute('name')== 'remove') {
                this._remove(ev.target.dataset.id);
            }
        })
    },
    add(item) {
        let find = this.items.find(el => el.productId == item.productId);
        if (find) {
            find.amount++;
        } else {
            this.items.push(item);
        }
        this._render();
    },
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
