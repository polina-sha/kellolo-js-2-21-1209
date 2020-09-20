import { basket } from './basket';
import { catalog } from './catalog';

export default () => {
    catalog.init(basket);
};

