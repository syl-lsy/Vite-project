import { deepClone } from './utils.js';
const obj = {
  a: 1,
  b: 2,
  c: {
    d: 3,
    e: 4,
  },
};
import('./utils.js').then(chunk => {
  console.log(chunk);
});
const result = deepClone(obj);
console.log(result);
