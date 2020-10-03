 export default class Catalog {
    constructor(basket) {
        this.container= null;
        this.items= [];
        this.basket=null;
        this.url='https://raw.githubusercontent.com/kellolo/static/master/JSON/catalog.json';
        this.init(basket);
    }

    init(basket) {
        this.container = document.querySelector('.f-blocks');
        this.basket = basket;
        this._get(this.url)
            .then(arr => {
                this.items = arr;
            })
            .finally(() => {
                this._render();
                this._handleActions();
            })
    }
    _get(url) {
        return fetch(url).then(d => d.json());
    }
    _fillCatalog() { //Инкапсуляция (условная для JS)
        this.items = getArrayOfObjects();
    }
    _render() {
        let htmlStr = '';
        this.items.forEach(item => {
            htmlStr += `<div class="f-content">
    <div class="visible">
    <a href="#"><img src="${item.productImg}" alt="l2"></a>
    <div class="f-textbox">
    <a href="#"><p>${item.productName}</p>
<p>$${item.productPrice}</p></a>
</div>
</div>
<div class="shadow">
    <div class="shadow_box">
    <a><button
class="add"
data-id="${item.productId}"
data-name="${item.productName}"
data-price="${item.productPrice}"
data-img="${item.productImg}"
    ><img class="add" src="../src/assets/imgs/cart1.svg" alt="cart1"><p class="add">Add to card</p></button></a>
</div>
</div>
</div>`
        });
        this.container.innerHTML = htmlStr;
    }
    _handleActions() {
        this.container.addEventListener('click', ev => {
            if (ev.target.classList.contains('add') && ev.target.tagName=="BUTTON") {
                let dataset = ev.target.dataset;
                this.basket.add(this._createNewItem(dataset));
            } else if(ev.target.classList.contains('add') && ev.target.tagName!=="BUTTON"){
                let dataset = ev.target.parentNode.dataset;
                this.basket.add(this._createNewItem(dataset));
            }

        })
    }
    _createNewItem(dataset) {
        return {
            productId: dataset.id,
            productName: dataset.name,
            productImg: dataset.img,
            productPrice: +dataset.price,
            amount: 1
        }
    }
}