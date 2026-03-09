// // 虚拟模块实现斐波那契数列和读取vite.config.ts中配置
// import { Plugin, ResolvedConfig } from 'vite';
// import stringify from 'json-stringify-safe';
// const prefix = 'virtual';
// // 使用策略模式
// type VirtualStrategy = {
//   [key: string]: (config?: ResolvedConfig) => string;
// };
// const virtualStrategy: VirtualStrategy = {
//   '\0virtual:fib': () => `export function fib(n) { return n < 2 ? n : fib(n - 1) + fib(n -2);}`,
//   '\0virtual:config': (config?: ResolvedConfig) => `export default function config() {return ${stringify(config)}`,
// };
// export default function virtual(): Plugin {
//   let config: ResolvedConfig | undefined;
//   return {
//     name: 'vite-plugin-virtual',
//     configResolved(resolvedConfig) {
//       config = resolvedConfig;
//     },
//     resolveId(id) {
//       if (id.startsWith(prefix)) {
//         return id;
//       }
//     },
//     load(id) {
//       if (id.startsWith(`\0${prefix}`)) {
//         return virtualStrategy[id](config);
//       }
//     },
//   };
// }

import { Plugin, ResolvedConfig } from 'vite';
import stringify from 'json-stringify-safe';

const prefix = 'virtual';
type VirtualStrategy = {
  [key: string]: (config?: ResolvedConfig) => string;
};
const virtualStrategy: VirtualStrategy = {
  '\0virtual:fib': () => `export default function fib(n) { return n < 2 ? n : fib(n - 1) + fib(n -2);}}`,
  '\0virtual:config': (config?: ResolvedConfig) => `export default function config() {return ${stringify(config)}}`,
};

export default function virtualPlugin(): Plugin {
  let config: ResolvedConfig | undefined;
  return {
    name: 'vite-plugin-virtual',
    configResolved(resolvedConfig) {
      config = resolvedConfig;
    },
    resolveId(id) {
      if (id.startsWith(prefix)) {
        return `\0${id}`;
      }
    },
    load(id) {
      if (id.startsWith(`\0${prefix}`)) {
        return virtualStrategy[id](config);
      }
    },
  };
}
