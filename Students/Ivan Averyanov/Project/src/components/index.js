import catalog from './catalog' ;
import basket from './basket' ;

export default () =>{
    basket.init();
    catalog.init(basket);   
}
