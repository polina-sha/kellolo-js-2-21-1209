export default {
    items: [],
    container: null,
    containerItems: null,
    shown: false,
    url: 'https://raw.githubusercontent.com/kellolo/static/master/JSON/basket.json',
    init() {
        this.container = document.querySelector('#basket');
        this.containerItems = document.querySelector('#basket-items');
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
        let htmlStr = '';
        this.items.forEach(item => {
            htmlStr += `
            <div class="d-flex headerCartWrapIn mb-1 p-2">
                    <img src="${item.productImg}" alt="" width="85" height="100>
                    <div>
                        <div>${item.productName}</div>
                        <span>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star-half-alt"></i>
                        </span>
                        <div class="headerCartWrapPrice">${item.amount} 
                            <span>x</span> $${item.productPrice}
                        </div>

                <button 
                    class="fas fa-times-circle" 
                    data-id="${item.productId}"
                    name="remove"
                ></button>
            </div>
            `
        });
        this.container.innerHTML = htmlStr;
    },
    _handleActions() {
        document.querySelector('#basket-toggler').addEventListener('click', () => {
            this.container.classList.toggle('invisible');
            // document.querySelector('#basket').classList.toggle('invisible');
            this.shown = !this.shown;
        })

        this.container.addEventListener('click', ev => {
            if (ev.target.name == 'remove') {
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

//Домашнее задание классы
// Класс элемента корзины
class BasketItem {
    // По сути, нам нужно отображать в корзине те же самые элементы, что и в списке
    constructor(title, price, img, link) {
        this.title = title;
        this.price = price;
        this.img = img;
        this.link = link; // Вероятно, ссылка на страницу товара
    }
    // Однако внешний вид может быть другим (пока не прописывал)
    render() {

    }
}
// Класс корзины
class Basket {
    constructor() {
        // В классе корзины массив с добавленными товарами
        this.addGoods = [];
        this.deletedGoods = []; // Можно заморочится и добавить товары, которые были удалены из корзины (их можно быстро вернуть в список - убираем боль/проблему поиска, если удалено случайно/пользователь передумал)
    }
    // Добавление товара в корзину (привязываем на нажатие кнопки)
    addToBasket() {}

    // Удаление товара из корзины (привязываем на нажатие кнопки)
    deleteFromBasket() {}

    // Считаем стоимость и количество товаров в корзине
    calcBasket() {}

    // Метод, который определяет, добавлены ли в корзину какие-либо товары и при их наличии активирует кнопку "Оформить заказ"
    isOrder() {}

    // Рендер динамического содержимого корзины
    render() {}

    // Метод открывания корзины
    openBasket() {}
}


