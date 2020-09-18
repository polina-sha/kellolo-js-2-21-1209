
import { basket } from './bask';
import { catalog } from './cat';



export default () => {
    basket._init();
    catalog._init();
    
    basket.hello();
    catalog.hello();
}