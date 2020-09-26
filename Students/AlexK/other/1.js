let first ={
  items: [],
  init(){
    this.items = ['ant', 'bison', 'camel', 'duck'];
  },
  add(p){
    this.items.push(p);
  }
}

first.init();
first.add('elephant');
console.log(first.items);