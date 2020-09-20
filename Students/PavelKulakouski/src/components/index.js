import {basket} from './basket'
import {calalog} from './catalog'



export default () => {

    basket._init();
    basket._get();
    basket._render();
    basket._handleActions();
    basket.add();
    basket._remove();
    
    catalog._init();
    catalog._get();
    catalog._render();
    catalog._fillCatalog();
    catalog._handleActions();
    catalog.add();
    catalog._createNewItem();
}