import { bask } from './bask';
import { cat } from './car';

export default () => {
    bask._init();
    cat._init();
    bask.hello();
    cat.hello();
}
