export class cat{
    constructor() {
        this.container = null;
        this.items = [];
        this.url = 'https://raw.githubusercontent.com/kellolo/static/master/JSON/catalog.json';
    }
    init() {
        this.container = document.querySelector('#catalog');
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
    _fillCatalog() {
        this.items = getArrayOfObjects();
    }
    _handleActions() {
        this.container.addEventListener('click', ev => {
            if (ev.target.name == 'add') {
                let dataset = ev.target.dataset;
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
    _render() {
        let htmlToRend = '';
        this.items.forEach(item => {
            let renderResult = new genShopingCartHtml(item);
            htmlToRend += renderResult._rend();
        });
        this.container.innerHTML = htmlToRend;
    }
}

class genShopingCartHtml {
    constructor(item) {
        this.productId = item.productId;
        this.productImg = item.productImg;
        this.productPrice = item.productPrice;
        this.productName = item.productName;
    }
    _rend() { 
        let renderResult ='';
        return renderResult =`
        <div class="b-item" id="${this.productId}">
        <div class="b-item-pic">
            <img src="${this.productImg}" alt="1">
        </div>
        <div class="b-item-txt">
            <span>${this.productName}</span>
            <span>$${this.productPrice}.00</span>
        </div>
        <div class="b-item-overlay">
            <button                                       
                name="add"
                data-id="${this.productId}"
                data-name="${this.productName}"
                data-price="${this.productPrice}"
                data-img="${this.productImg}"
            >
                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-basket3" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M10.243 1.071a.5.5 0 0 1 .686.172l3 5a.5.5 0 1 1-.858.514l-3-5a.5.5 0 0 1 .172-.686zm-4.486 0a.5.5 0 0 0-.686.172l-3 5a.5.5 0 1 0 .858.514l3-5a.5.5 0 0 0-.172-.686z" />
                    <path d="M0 6.5A.5.5 0 0 1 .5 6h15a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H.5a.5.5 0 0 1-.5-.5v-1zM.81 9c0 .035.004.07.011.105l1.201 5.604A1 1 0 0 0 3 15.5h10a1 1 0 0 0 .978-.79l1.2-5.605A.495.495 0 0 0 15.19 9h-1.011L13 14.5H3L1.821 9H.81z" />
                </svg>
                Add to Cart
            </button>
        </div>
    </div>`;
    }
}
