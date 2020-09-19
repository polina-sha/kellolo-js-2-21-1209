import { bask } from './basket';
import { cat } from './catalog';

export default () => {
    bask._init();
    cat._init();

    bask.hello();
    cat.hello();
}