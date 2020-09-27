import Item from './item';

export default class Page {
    constructor(url, container){
        this.url = 'https://raw.githubusercontent.com/kellolo/static/master/JSON' + url;
        this.container = container;
        this.items = [];
        this._init();
    }
    _init() {
        this._get(this.url)
            .then(data => {
                this.items = data.length ? data : data.content;
            })
            .finally(() => {
                this._render();
                this._handleActions();
            })
    }
    _get(url) {
        return fetch(url).then(d => d.json());
    }
    _render() {
        let htmlStr = '';
        this.items.forEach(item => htmlStr += new Item(item, this.constructor.name).render());
        document.querySelector(this.container).innerHTML = htmlStr;
    }
    _handleActions(){
        return null;
    }
};