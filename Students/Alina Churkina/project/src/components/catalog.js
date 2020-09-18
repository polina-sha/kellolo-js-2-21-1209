export let cat = {
    it: [],
    _init() {
        this.it = ['q', 'w', 'e']
    },
    hello() {
        console.log(this.it);
    }
}