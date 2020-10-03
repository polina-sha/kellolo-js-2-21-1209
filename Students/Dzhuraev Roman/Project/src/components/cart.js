class Cart {
    constructor() {
        this.items = []
        this.container = document.querySelector('#cart')
        this._init()
    }
    _init() {
        document.querySelectorAll('.add_to_cart').forEach(button =>
            button.addEventListener('click', event => this.add(event))
        )
        document.querySelectorAll('.remove_from_cart').forEach(button =>
            button.addEventListener('click', event => this.remove(event)))
    }

    _render() {
        let html = ''
        this.items.forEach(item => {
             html += `
                <div class="card">
                    <img src="${item.imgSrc}">
                    <p><b>${item.name}</b></p>
                    <p>${item.cost * item.quantity}</p>
                    <br>
                    <p>Quantity ${item.quantity}</p>
                    <button 
                        class="remove_from_cart"
                        name="remove"
                        data-id="${item.id}"
                        data-name="${item.name}"
                        data-price="${item.cost}"
                        data-img="${item.imgSrc}"
                    ><i class="fas fa-shopping-cart"></i> Remove from Cart
                    </button>
                </div>`
        })
        this.container.innerHTML = html
        document.querySelectorAll('.remove_from_cart').forEach(button =>
            button.addEventListener('click', event => this.remove(event)))
    }
    _newItem(dataset) {
        return {
            id: dataset.id,
            name: dataset.name,
            imgSrc: dataset.img,
            cost: +dataset.price,
            quantity: 1
        }
    }

    add(event) {
        let item = event.target.dataset
        let find = this.items.find(el => el.id == item.id);
        if (find) {
            find.quantity++;
        } else {
            this.items.push(this._newItem(item));
        }
        this._render();
    }
    remove(event) {
        let item = event.target.dataset
        let find = this.items.find(el => el.id == item.id);
        if (find.quantity > 1) {
            find.quantity--;
        } else {
            this.items.splice(this.items.indexOf(find), 1);
        }
        this._render();
    }
}


const cart = new Cart