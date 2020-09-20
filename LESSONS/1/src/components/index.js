import { bask } from './bask';
import { cat } from './cat';

export default () => {
    bask._init();
    cat._init();

    bask.hello();
    cat.hello();
}