import Basket from './basket';
import Catalog from './catalog';

export default () => {
    let b = new Basket();
    let c = new Catalog(b);
}