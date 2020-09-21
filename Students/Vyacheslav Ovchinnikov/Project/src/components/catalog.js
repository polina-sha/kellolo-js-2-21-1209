const catalog = {
    container: null,
    items: [],
    basket: null,
    url: 'https://raw.githubusercontent.com/kellolo/static/master/JSON/catalog.json',
    init(basket) {
        this.container = document.querySelector('#catalog');
        this.basket = basket;
        this._get(this.url)
            .then(arr => {
                this.items = arr;
            })
            .finally(() => {
                this._render();
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
                <section class="product">
                    <a href="#"><img class="product__img" src="${item.productImg}" alt="photo"></a>
                    <div class="product__content">
                        <h2><a href="#" class="product__name">${item.productName}</a></h2>
                        <p class="product__price">$${item.productPrice}</p>
                    </div>
                    <a href="#" class="product__add"
                                name="add"
                                data-id="${item.productId}"
                                data-name="${item.productName}"
                                data-price="${item.productPrice}"
                                data-img="${item.productImg}"
                    ><img src="../src/assets/imgs/addToCart.png" alt="Корзина"> Add to Cart</a>
                </section>
             `
        });
        this.container.innerHTML = htmlStr;
    },
    _handleActions() {
        this.container.addEventListener('click', ev => {
            if (ev.target.name == 'add') {
                let dataset = ev.target.dataset;
                this.basket.add(this._createNewItem(dataset));
            }
        })
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

catalog.init();