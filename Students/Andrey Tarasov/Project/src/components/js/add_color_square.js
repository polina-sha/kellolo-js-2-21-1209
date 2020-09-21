'use strict';

let arr = ['red', 'blue', 'green', 'gray', 'yellow'];

let squareEl = document.getElementById('first');

squareEl.addEventListener('change', function (event) {
  let El = event.target.value;
  squareEl.style.backgroundImage = `url('../src/assets/imgs/icons/${El}_square.png')`;
  squareEl.style.backgroundRepeat = "no-repeat";
  squareEl.style.backgroundPosition = "65% 60%";
  
});

