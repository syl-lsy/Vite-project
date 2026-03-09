import { getRandomNumber } from './utils.js';
const result = getRandomNumber(1, 100);
console.log(result);

const arr = [1, 3, 5, 7, 9];
const result2 = arr.map(item => item * item);
console.log(result2);
Promise.resolve(1).then(result2 => {
  console.log(result2);
});
