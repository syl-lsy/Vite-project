import { Plugin } from 'vite';
export default function vitePluginTest(): Plugin {
  return {
    name: 'vite-plugin-test',
    enforce: 'pre',
    apply: 'build', // 生产环境下的插件
    config(config) {
      console.log('✅️ config', config);
    },
    configResolved(config) {
      console.log('✅️ configResolved', config);
    },
    // 开发环境
    configureServer(server) {
      console.log('✅️ configureServer', server);
    },
    buildStart() {
      console.log('✅️ buildStart');
    },
    buildEnd() {
      console.log('✅️ buildEnd');
    },
  };
}
