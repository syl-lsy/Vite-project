import { setCounter } from './counter.ts';
import config from 'virtual:config';
console.log(config());
document.getElementById('app')!.innerHTML = `
  <h1>Hello Vite!</h1>
  <button id="counter" type="button">Counter</button>
`;

setCounter(document.getElementById('counter') as HTMLButtonElement);
