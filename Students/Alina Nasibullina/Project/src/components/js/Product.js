"use strict";

const buttons = document.querySelectorAll(".hover_cart");
const cardList = document.querySelector(".card-link--dropDown");

const cardProductNode = cardList.querySelector(".dropDown--product");

buttons.forEach(function(button) {
    button.addEventListener("click", handleClick);
});

/**
 * Функция обрабатывает клик по кнопке в карточке товара 
 * @param {MouseEvent} clickedButtonEvent 
 */
function handleClick(clickedButtonEvent) {
	clickedButtonEvent.preventDefault();
    const productNode = event.currentTarget.parentNode;

    const product = {
        card: productNode,
        productId: this.dataset.id,
        productName: this.dataset.name,
        Price: this.dataset.price,
        img: productNode.childNodes[1],
    }

	addToCard(product);
	calcFinalSum(product);
}

/**
 * Функция добавляет HTML-блок для товара в корзине
 * @param {*} product 
 */
function addProductInCardHTML() {
	cardList.insertAdjacentHTML('afterbegin', 
	`<div class="dropDown--product">
		<img src="" alt="product">
		<div>
			<p class="product-name"></p>
			<p><span class="quantity"></span><span> x $</span><span class="price"></span></p>
		</div>
		<button class="remove-from-card"><i class="fas fa-times-circle"></i></button>
	</div>
	<div class="greyLine">
	</div>`);
}


/**
 * Функция добавляет товар в корзину
 * @param {*} product 
 */
function addToCard(product) {
	
	addProductInCardHTML();

	const cardProductNode = cardList.querySelector(".dropDown--product");
	const cardProduct = {
		//img: cardProductNode.querySelector("img").getAtribute("scr") = product.img.getAtribute("scr"),
		id: product.productId,
		name: cardProductNode.querySelector(".product-name").innerText = product.productName,
		quantity: cardProductNode.querySelector(".quantity").innerText = 1,
		price: cardProductNode.querySelector(".price").innerText = product.Price,
		deleteButton: cardProductNode.querySelector(".remove-from-card"),
		
	}

	cardProduct.deleteButton.setAttribute("data-id", cardProduct.id);
	cardProduct.deleteButton.setAttribute("data-name", cardProduct.name);
	cardProduct.deleteButton.setAttribute("data-price", cardProduct.price);
	
}



cardList.addEventListener("click", buttonToRemove);

/**
 * Функция обрабатывает событие клика на кнопку удаления товара
 * @param {MouseEvent} clickedButtonEvent 
 */
function buttonToRemove(clickedButtonEvent) {
	clickedButtonEvent.preventDefault();
	const buttonRemove = event.target.parentNode;
	const product = buttonRemove.parentNode;
	if (buttonRemove.nodeName != "BUTTON") return;

	removeProductFromCard(product);
	calcFinalSum(product);
}

/**
 * Функция удаляет товар из корзины
 * @param {*} product 
 */
function removeProductFromCard(product) {
	product.nextElementSibling.remove();
	product.remove();
}

/**
 * Функция расчитывает итоговую сумму продуктов в корзине
 * @param {*} product 
 */
 function calcFinalSum(product) {
	
	const priceProductNode = cardList.querySelectorAll(".price");
	let totalSumEl = 0;

	for (let i = 0; i < priceProductNode.length; i++){
		totalSumEl += +(priceProductNode[i].innerHTML);
	}

	//return totalSumEl;
	cardList.querySelector(".totalSum").innerHTML = totalSumEl;
}