import { deepClone } from './utils.ts';
const obj = {
  a: 1,
  b: 2,
  c: {
    d: 3,
    e: 4,
  },
};
import('./utils.ts').then(chunk => {
  console.log(chunk);
});
const result = deepClone(obj);
console.log(result);
