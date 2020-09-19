function wine(arr) {
    console.log(arr);
}

export let bask = {
    it: [],
    _init() {
        this.it = [1, 2, 3]
    },
    hello() {
        wine(this.it);
    }
}