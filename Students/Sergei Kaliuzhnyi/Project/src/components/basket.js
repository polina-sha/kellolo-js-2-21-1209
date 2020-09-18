export let basket = {
    items: [],
    container: null,
    //containerItems: null,
    shown: false,
    url: 'https://raw.githubusercontent.com/kellolo/static/master/JSON/basket.json',
    init() {
        this.container = document.querySelector('.header__drop');
        //this.containerItems = document.querySelector('');
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
            <div class="header__dropbox">
                <a href="single_page.html">
                    <img src="${item.productImg}" class="header__dropimg" alt="" width="85" height="100>
                </a>
                <div class="header__dropcontent">
                    <a href="single_page.html">
                        <h3 class="header__dropname">${item.productName}</h3>
                        <img src="../src/assets/img/headerdropstars.jpg" alt="">
                        <p class="header__dropprice">${item.amount} Х $${item.productPrice}</p>
                    </a>
                </div>
                <button 
                    class="header__cart-drop-button fas fa-times-circle" 
                    data-id="${item.productId}"
                    name="remove"
                ></button>
            </div>
            `
            // <div class="d-flex headerCartWrapIn mb-1 p-2">
            //         <img src="${item.productImg}" alt="" width="85" height="100>
            //         <div>
            //             <div>${item.productName}</div>
            //             <span>
            //                 <i class="fas fa-star"></i>
            //                 <i class="fas fa-star"></i>
            //                 <i class="fas fa-star"></i>
            //                 <i class="fas fa-star"></i>
            //                 <i class="fas fa-star-half-alt"></i>
            //             </span>
            //             <div class="headerCartWrapPrice">${item.amount} 
            //                 <span>x</span> $${item.productPrice}
            //             </div>

            //     <button 
            //         class="header__cart-drop-button fas fa-times-circle" 
            //         data-id="${item.productId}"
            //         name="remove"
            //     ></button>
            // </div>
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
};



