import List from './LIST.js';

export default class Catalog extends List {
    constructor(basket ,container= '#catalog', url='/catalog.json', button= '.AddToCart-clic'){
       super(url,container,basket)
       this.button = button;
       
   }
   _handleActions() {       
       this.buyButton.forEach(btn => {
       btn.addEventListener('click', ev => {
           if (ev.currentTarget.name == 'add' && ev.currentTarget.dataset.id) {
                   let dataset = ev.currentTarget.dataset;
                   this.basket.add(this._createNewItem(dataset));
           }
       })})
   }
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
