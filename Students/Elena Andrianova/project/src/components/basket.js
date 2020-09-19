 export let basket = {
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
            <div class="headerCartWrapIn">
                <div class="basketItemImg"><img src="${item.productImg}" alt="productPhoto" width="85" height="100></div>
                
                <div class="basketInfoProduct">
                    <div class="BasketItemName">'${item.productName}'</div>
                    <span>
                        <i class="fas fa-star goldenStar"></i>
                        <i class="fas fa-star goldenStar"></i>
                        <i class="fas fa-star goldenStar"></i>
                        <i class="fas fa-star goldenStar"></i>
                        <i class="fas fa-star-half-alt goldenStar"></i>
                    </span>
                    <div class="headerCartWrapPrice">${item.amount}<span>x</span> $${item.productPrice}</div>
                </div>
                <button class="fas fa-times-circle" data-id="${item.productId}"name="remove"></button>
            
            </div>
            `
        });
        this.container.innerHTML = htmlStr;
    },


    _handleActions() {
        document.querySelector('#basket-toggler').addEventListener('click', () => {
            this.container.classList.toggle('invisible');
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

basket.init();