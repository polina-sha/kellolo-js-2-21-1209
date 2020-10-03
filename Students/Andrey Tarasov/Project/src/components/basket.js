class BasketItem {
	constructor(item) {
		this.item = item;
	}

	render() {
		return `
		<div class="d-flex headerCartWrapIn mb-1 p-2">
			<img src="${this.item.productImg}" alt="" width="85" height="100>
			<div>
				${this.item.productName}
			</div>

				<span>
					<i class="fas fa-star"></i>
					<i class="fas fa-star"></i>
					<i class="fas fa-star"></i>
					<i class="fas fa-star"></i>
					<i class="fas fa-star-half-alt"></i>
				</span>

				<div class="headerCartWrapPrice">${this.item.amount} 
					<span>x</span> $${this.item.productPrice}
				</div>

				<button 
					class="fas fa-times-circle" 
					data-id="${this.item.productId}"
					name="remove"
				></button>
		</div>
		`
	}
}

export default class Basket {
	constructor(container = '#basket', url = '/basket.json') {
		this.items = [];
		this.container = document.querySelector(container);
		this.containerItems = document.querySelector('#basket-items');
		this.shown = false;
		this.url = 'https://raw.githubusercontent.com/kellolo/static/master/JSON' + url;
		this.init();
	}

	init() {
		this._get(this.url)
			.then(basket => {
				this.items = basket.content;
			})
			.finally(() => {
				this._render();
				this._handleActions();
			})
	}

	_get(url) {
		return fetch(url).then(d => d.json());
	}

	_render() {
		let htmlStr = '';
		this.items.forEach(item => {
			htmlStr += new BasketItem(item).render();
		});
		this.container.innerHTML = htmlStr;
	}

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
	}

	add(item) {
		let find = this.items.find(el => el.productId == item.productId);
		if (find) {
			find.amount++;
		} else {
			this.items.push(item);
		}
		this._render();
	}

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
