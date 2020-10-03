import{Init} from "./items"


export class Catalog extends Init{
    constructor(container="#catalog",fileName="catalog.json") {
        super(container, fileName);
    }
    _handleActions() {
        this.container.addEventListener('click', ev => {
            if (ev.target.name == 'add') {
                let dataset = ev.target.dataset;
            }
        })
    }
}