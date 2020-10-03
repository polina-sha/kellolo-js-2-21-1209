class Product {
    constructor(name, cost, imgSrc, id) {
        this.name = name;
        this.cost = cost;
        this.imgSrc = imgSrc;
        this.id = id
        this._init()
    }
    _init() {
        console.log(this)
    }

    renderProductCard() {
        return `<div class="card">
                    <img src="${this.imgSrc}">
                    <p><b>${this.name}</b></p>
                    <p>${this.cost}</p>
                    <button 
                        class="add_to_cart"
                        name="add"
                        data-id="${this.id}"
                        data-name="${this.name}"
                        data-price="${this.cost}"
                        data-img="${this.imgSrc}"
                    ><i class="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                </div>`
    }
}

export class Catalogue {
    constructor(url) {
        this.url = 'https://raw.githubusercontent.com/kellolo/static/master/JSON' + url;
        this.container = document.querySelector('.catalogue')
        this.items = [];
        this.data = null;
        this._init();
    }
    _init() {
        this._get()
            .then(data => {
                this.data = JSON.parse(data);
                console.log('Got data');
            })
            .then(() => {
                this.data.forEach(item => {
                    this.items += new Product(
                        item.productName,
                        item.productPrice,
                        item.productImg,
                        item.productId)
                })
                console.log('Collected items')
            })
            .catch(err => console.log(err))
            .finally(() => {
                this.renderCatalogue()
            })
    }
    _get() {
        return new Promise((good, bad) => {
            let req = new XMLHttpRequest();
            req.open('GET', this.url, true);
            req.send();
            req.onreadystatechange = () => {
                if (req.readyState == 4) {
                    if (req.status == 200) {
                        good(req.responseText);
                    } else {
                        bad('Oshibka, saryan');
                    }
                }
            }
        })
    }
    renderCatalogue() {
        {
            let html = '';
            this.items.forEach(item => {
                html += item.renderProductCard();
            })
            this.container.innerHTML = html;
        }
    }
}







