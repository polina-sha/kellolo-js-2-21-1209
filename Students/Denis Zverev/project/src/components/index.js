import Basket from './basket';
import Catalog from './catalog';

export default () => {
    let basket = new Basket();
    let Catalog = new Catalog(basket);
}
