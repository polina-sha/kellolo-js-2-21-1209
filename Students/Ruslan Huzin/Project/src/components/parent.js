export default class Parent {
    constructor(container) {
        this.container = document.querySelector(container);
        this.items = [];
    }

    showParentUrl() {
        return 'https://raw.githubusercontent.com/kellolo/static/master/JSON/';
    }

    _get(url) {
        return fetch(url).then(d => d.json());
    }

    _render() {
        let html = '';
        this.items.forEach(item => {
            html += item.render();
        })
        this.container.innerHTML = html;
    }
}