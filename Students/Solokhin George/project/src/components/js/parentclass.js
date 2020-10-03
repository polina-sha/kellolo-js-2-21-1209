export default class Parent {
    constructor(url) {
        this.items= [];
        this.container= null;
        this.url=url;
    }
    _get(url) {
        return fetch(url).then(d => d.json());
    }
}