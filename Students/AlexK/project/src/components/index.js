import {Catalog} from "./catalog";
import {cart} from "./basket.js";

export default () => {
  if (document.querySelector('.b-basket')) {
    let b = new cart();
  } else {
    let a = new Catalog();
  };
}