import basket from './basket.js';
import catalog from './catalog.js';

export default () => {
  basket._init();
  catalog._init(basket);
}