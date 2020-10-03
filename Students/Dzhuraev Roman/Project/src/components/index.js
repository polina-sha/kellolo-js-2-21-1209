import { Catalogue } from './catalogue_2'
import { Cart } from './cart'


export default () => {
    new Catalogue('/catalog.json');
    new Cart;
}

