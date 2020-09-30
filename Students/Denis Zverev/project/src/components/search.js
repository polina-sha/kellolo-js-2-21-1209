export default class SearchController {
    constructor() {
        this.searchString = '';
        this.regularExpression = null;
        this.container = document.querySelector('#search-controller');
        this._init();
    }

    _init() {
        this._render();
        this._handleActions();
    }

    _search(ctx) {
        ctx._filter
    }

    _handleActions() {
        this.container.addEventListener('click', ev => {
            if (ev.target.name == 'search') {
                this._search();
            }
        })
        this.container.addEventListener('keydown', ev => {
            if (ev.keyCode == 13) {
                this._search();
            } else {
                this._searchString = ev.target.value;
                this.regularExpression = new RegExp(this.searchString, 'i');
            }
        })
    }

    _render() {
        this.container.innerHTML = `
                                    <div class="dropdown">
                                        <button class=" btn-lg btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            Browse
                                        </button>
                                        <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                                            <div class="dropdown-item">woman</div>
                                            <a href="#" class="dropdown-item" type="button">Dresses</a>
                                            <a href="#" class="dropdown-item" type="button">Tops</a>
                                            <a href="#" class="dropdown-item" type="button">Sweaters/Knits</a>
                                            <a href="#" class="dropdown-item" type="button">Jackets/Coats</a>
                                            <a href="#" class="dropdown-item" type="button">Blazers</a>
                                            <a href="#" class="dropdown-item" type="button">Denim</a>
                                            <a href="#" class="dropdown-item" type="button">Leggings/Pants</a>
                                            <a href="#" class="dropdown-item" type="button">Skirts/Shorts</a>
                                            <a href="#" class="dropdown-item" type="button">Accessories</a>

                                            <div class="dropdown-item">men</div>
                                            <a href="#" class="dropdown-item" type="button">Tees/Tank tops</a>
                                            <a href="#" class="dropdown-item" type="button">Shirts/Polos</a>
                                            <a href="#" class="dropdown-item" type="button">Sweaters</a>
                                            <a href="#" class="dropdown-item" type="button">Sweatshirts/Hoodies</a>
                                            <a href="#" class="dropdown-item" type="button">Blazers</a>
                                            <a href="#" class="dropdown-item" type="button">Jackets/vests</a>
                                        </div>
                                        </div>
                                        <div class="input-group">
                                            <input name="search-line" type="text" class="form-control" placeholder="Search for Item..." aria-label="Recipient's username" aria-describedby="basic-addon2">
                                            <div class="input-group-append">
                                                <button class="btn btn-outline-secondary" type="button" name="search"><i class="fas fa-search"></i></button>
                                        </div>
                                    </div>
                                    `
    }
}