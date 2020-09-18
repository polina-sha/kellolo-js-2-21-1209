import Basket from './basket';
import Catalog from './catalog';

export default () => {
    let b = new Basket()
    let c = new Catalog(b)
}

/* import {basket} from './basket';
import {catalog} from './catalog';

export default () => {
    basket.init();
    catalog.init();
} */