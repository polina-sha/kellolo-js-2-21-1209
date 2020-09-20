import {cat} from "./catalog";
import {cart} from "./basket.js";

export default () => {
  if (document.querySelector('.b-basket')) {
    let b = new cart();
    b.init();
  } else {
    let a = new cat();
    a.init()
  };
}