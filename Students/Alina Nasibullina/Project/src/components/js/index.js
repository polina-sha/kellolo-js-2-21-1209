import Basket from './basket.js'
import Catalog from './catalog.js'

export default () => {
    new Basket();
    new Catalog(Basket);
}