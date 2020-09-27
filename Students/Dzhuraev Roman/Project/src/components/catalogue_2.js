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

class Catalogue {
    constructor(data) {
        this.container = document.querySelector('.catalogue')
        this.items = [];
        this.data = data;
        this._init();
    }

    _init() {
        this.items = this.data.map(product => new Product(
            product.name,
            product.cost,
            product.imgSrc,
            product.id));
    }

    renderCatalogue() {
        let html = '';
        this.items.forEach(item => {
            html += item.renderProductCard();
        })
        this.container.innerHTML = html;
    }
}


const data = [
    {name: 'Mango people T-Shirt', cost: 530, imgSrc: 'https://placehold.it/260x300', id: 1},
    {name: 'Mango people T-Shirt', cost: 830, imgSrc: 'https://placehold.it/260x300', id: 2},
    {name: 'Mango people T-Shirt', cost: 730, imgSrc: 'https://placehold.it/260x300', id: 3},
    {name: 'Mango people T-Shirt', cost: 330, imgSrc: 'https://placehold.it/260x300', id: 4},
    {name: 'Mango people T-Shirt', cost: 520, imgSrc: 'https://placehold.it/260x300', id: 5},
]


const cat = new Catalogue(data)
cat.renderCatalogue()

