// const imgURL = 'https://raw.githubusercontent.com/kellolo/static/master/img/JS1_shop/';
// let NAMES = [
//     'MANGO PEOPLE T-SHIRT', 
//     'BANANA PEOPLE T-SHIRT', 
//     'STRAWBERRY PEOPLE T-SHIRT',
//     'ORANGE PEOPLE T-SHIRT',
//     'PUMKIN PEOPLE T-SHIRT',
//     'PINEAPPLE PEOPLE T-SHIRT',
//     'CUCUMBER PEOPLE T-SHIRT',
//     'TOMATO PEOPLE T-SHIRT'
// ];
// let PRICES = [52, 53, 55, 67, 69, 94, 23, 45];

// function getArrayOfObjects() {
//     let local = [];

//     for (let i = 0; i < NAMES.length; i++) {
//         local.push({
//             productName: NAMES[i],
//             productPrice: PRICES[i],
//             productImg: `${imgURL}featuredItem${i + 1}.jpg`,
//             productId: 'prod_' + i
//             //rates (звезды)
//         })
//     }
//     return local;
// }

export let catalog = {
    container: null,
    items: [],
    basket: null,

    
    url: 'https://raw.githubusercontent.com/kellolo/static/master/JSON/catalog.json',
    init() {
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
            <div class="item">
                <div class="itemImg">
                    <div class="itemImgHover">
                        <button
                            name="add"
                            data-id="${item.productId}"
                            data-name="${item.productName}"
                            data-price="${item.productPrice}"
                            data-img="${item.productImg}"
                        >
                            <img src="../src/assets/imgs/cart2.png" alt="imgCart">
                            Add to Cart
                        </button>

                    </div>
                    <img src="${item.productImg}" alt="imgProduct">
                </div>
                <div class="itemText">
                    <a href="#">"${item.productName}"</a>
                    <p>"${item.productPrice}"</p>
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

catalog.init();