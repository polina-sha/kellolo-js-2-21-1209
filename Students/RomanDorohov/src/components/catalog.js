export default {
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
            htmlStr += `<div class="col-10 offset-1 col-sm-6 offset-sm-0 col-md-4 col-lg-3 feturedItems ">
                            <div class="feturedItem">
                                <div class="feturedImgWrap">
                                    <div class="feturedBuy">
                                        <button
                                            name="add"
                                            data-id="${item.productId}"
                                            data-name="${item.productName}"
                                            data-price="${item.productPrice}"
                                            data-img="${item.productImg}"
                                        >
                                            <div><i class="fas fa-shopping-cart"></i> Add to Cart</div>
                                        </button>
                                    </div>
                                    <img class="feturedProduct" src="${item.productImg}" alt="product1">
                                </div>
                                <div>
                                    <div class="feturedBuySm d-flex flex-column justify-content-around align-items-center align-items-md-start">
                                        <div class="feturedItemName">${item.productName}</div>
                                        <div class="feturedItemPrice">$${item.productPrice}</div>
                                        <button 
                                            class="d-md-none"
                                            name="add"
                                            data-id="${item.productId}"
                                            data-name="${item.productName}"
                                            data-price="${item.productPrice}"
                                            data-img="${item.productImg}"
                                        >
                                            <i class="fas fa-shopping-cart"></i> Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>`
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
//Домашнее задание по классам
class GoodItem {
    constructor(title = 'Товар', price = 'Цена по запросу', img = 'img/no-image.jpg') {
        this.title = title;
        this.price = price;
        this.img = img;
    }
    render() {
        return `<div class="goods-item">
                <div class="goods-info">
                  <img src="${this.img}" alt="${this.title}">
                  <h3>${this.title}</h3>
                  <p>${this.price}</p>
                </div>
                <button class='addClick'>Добавить</button>
              </div>`;
    }
}

class GoodsList {
    constructor() {
        this.goods = [];
    }
    fetchGoods() {
        this.goods = [{
                title: 'Shirt',
                price: 150,
                img: "images/shirt.jpg"
            },
            {
                title: 'Socks',
                price: 50,
                img: 'images/socks.jpg'
            },
            {
                title: 'Jacket',
                price: 350,
                img: 'images/jacket.jpg'
            },
            {
                title: 'Shoes',
                price: 250,
                img: 'images/shoes.jpg'
            },
            {
                price: 250,
                img: 'images/shoes.jpg'
            },
            {
                title: 'Watch',
                img: 'images/watches.jpg'
            },
            {
                title: 'Shoes',
                price: 250,
            },
            {}
        ]
    }
    render() {
        let listHtml = '';
        this.goods.forEach((good) => {
            const goodItem = new GoodItem(good.title, good.price, good.img);
            listHtml += goodItem.render();
        })
        document.querySelector('.goods-list').innerHTML = listHtml;
    }
    calcAllGoods() {
        let totalPrice = 0;
        this.goods.forEach((good) => {
            if(good.price !== undefined) {
                totalPrice += good.price;
                console.log(good.price);
            }
        });
        let totalGoodsAnswer = "Все товары на сумму $" + totalPrice;
        document.querySelector('.goods-total').innerHTML = totalGoodsAnswer;
    }
}