class CatalogItem {
    constructor(item){
        this.item = item
    }
    render(){
        return `
             <div href="shoppingCart.html" class="catalog__product">
                 <div class="catalog__mango">
                    <img class="mango" src="${this.item.productImg}" alt="mango">
                        <button type="button" class="AddToCart AddToCart-clic "
                            name = "add"
                            data-id="${this.item.productId}" 
                            data-price="${this.item.productPrice}" 
                            data-name="${this.item.productName}" 
                            data-img="${this.item.productImg}">
                            <img class="AddToCart-clic" name = "add" src="../src/assets/img/FeturedItems/AddToCart.png" alt="AddToCart"><span class="AddToCart-clic" name = "add">Add to Cart</span>
                        </button>
                    </div>
                <div class="product__name">${this.item.productName}</div>
                <div class="product__price">$${this.item.productPrice}</div>
            </div>           
        `
    }
}


export default class Catalog {
     constructor(basket ,container= '#catalog', url='/catalog.json', button= '.AddToCart-clic'){
        this.container = document.querySelector(container);
        this.button = button;
        this.items = [];
        this.basket = basket;
        this.url = 'https://raw.githubusercontent.com/xorrou1/responses/master/JSON%20carts%20marcet' + url;
        this.init();
    }
    init() {
        this._get(this.url)
            .then(arr => {
                this.items = arr;
            })
            .finally(() => {
                this._render();
                this.buyButton = document.querySelectorAll(this.button);
                this._handleActions();
            })
    }
    _get(url) {
        return fetch(url).then(d => d.json());
    }
    _fillCatalog() { 
        this.items = getArrayOfObjects();
    }
    _render() {
        let htmlStr = '';
        this.items.forEach(item => {
            htmlStr += new CatalogItem(item).render()
        });
        this.container.innerHTML = htmlStr;
    }
    _handleActions() {
        this.buyButton.forEach(btn => {
        btn.addEventListener('click', ev => {
            if (ev.currentTarget.name == 'add' && ev.currentTarget.dataset.id) {
                    let dataset = ev.currentTarget.dataset;
                    this.basket.add(this._createNewItem(dataset));
            }
        })})
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

/* let catalog = new Catalog(basket); */