import Rend from "./render";

export class Init {
  constructor(container, fileName, type = 'catalog') {
    this.type = type;
    this.items = [];
    this.container = document.querySelector(container);
    this.url = 'https://raw.githubusercontent.com/kulyamzin/GeekBrain/master/Files/GeekBrains/' + fileName;
    this._init();
  }
  _init() {
    this._get(this.url)
      .then(arr => {
        if (this.type == 'catalog') {
          this.items = arr;
        } else {
          this.items = arr.content;
          this.total = arr.totalPrice;
        }
      })
      .finally(() => {
        this._render();
        this._handleActions();
      })
  }
  _get() {
    return fetch(this.url).then(d => d.json());
  }
  _render() {
    let htmlToRend = '';
    this.items.forEach(item => {
      this.type == 'catalog' ? htmlToRend += new Rend('catalog', item)._render(): htmlToRend += new Rend('basket', item)._render();
    });
    this.container.innerHTML = htmlToRend;
  }
}