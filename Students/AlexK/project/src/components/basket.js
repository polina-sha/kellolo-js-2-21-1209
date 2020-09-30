import {Init} from "./items"


export class cart extends Init {
    constructor(container = ".b-basket", fileName = "basket.json", type = "basket") {
        super(container, fileName, type);
    }

    _handleActions() {
        this.container.addEventListener('click', event => {
            switch (event.target.dataset.command) {
                case 'rm':
                    this.removeFullObj(event.target.dataset.id);
                    break;
            }
        })
        this.container.addEventListener('change', event => {
            if (event.target.dataset.command == 'ca') {
                this.changeAmount(event.target.dataset.id, event.target.value);
            };
        })
    }

    removeFullObj(id) {
        let elemDelId = this.items.find(element => element.productId == id);
        this.items.splice(this.items.indexOf(elemDelId), 1);
        this._render();
    }
    changeAmount(id, newVal) {
        let elemCaId = this.items.find(element => element.productId == id);
        elemCaId.amount = newVal;
        this._render();
    }
}