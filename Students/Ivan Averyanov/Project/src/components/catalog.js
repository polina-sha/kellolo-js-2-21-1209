export default  {
    container: null,
    button: null,
    items: [],
    basket: null,
    url: 'https://raw.githubusercontent.com/xorrou1/responses/master/JSON%20carts%20marcet/catalog.json',
    init(basket) {
        this.container = document.querySelector('#catalog');
        this.basket = basket;
        this._get(this.url)
            .then(arr => {
                this.items = arr;
            })
            .finally(() => {
                this._render();
                this.button = document.querySelectorAll('.AddToCart-clic');
                this._handleActions();
            })
    },
    _get(url) {
        return fetch(url).then(d => d.json());
    },
    _fillCatalog() { //Инкапсуляция (условная для JS)
        this.items = getArrayOfObjects();
    },
    _render() {
        let htmlStr = '';
        this.items.forEach(item => {
            htmlStr += `
                        <div href="shoppingCart.html" class="catalog__product">
                        <div class="catalog__mango">
                            <img class="mango" src="${item.productImg}" alt="mango">
                            <button type="button" class="AddToCart AddToCart-clic "
                                name = "add"
                                data-id="${item.productId}" 
                                data-price="${item.productPrice}" 
                                data-name="${item.productName}" 
                                data-img="${item.productImg}">
                                <img class="AddToCart-clic" src="../src/assets/img/FeturedItems/AddToCart.png" alt="AddToCart"><span class="AddToCart-clic">Add to Cart</span>
                            </button>
                        </div>
                        <div class="product__name">${item.productName}</div>
                        <div class="product__price">$${item.productPrice}</div>
                    </div>
                    `
        });
        this.container.innerHTML = htmlStr;
    },
    _handleActions() {
        this.button.forEach(btn => {
        btn.addEventListener('click', ev => {
            if (ev.target.name == 'add') {
                let dataset = ev.target.dataset;
                this.basket.add(this._createNewItem(dataset));
            }
        })})
    },
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

