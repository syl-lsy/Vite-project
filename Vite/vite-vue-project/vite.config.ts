import { ConfigEnv, defineConfig, loadEnv, UserConfig } from 'vite';
import { wrapperEnv } from './src/commonUtils/wrapper';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import preset from 'postcss-preset-env';
import visual from 'rollup-plugin-visualizer';
import externalGlobals from 'rollup-plugin-external-globals';
import vitePluginHtml from './plugins/vite-plugin-html';
const config = (config: ConfigEnv): UserConfig => {
  console.log(config);
  console.log(process.cwd() /*当前node所运行的工作目录 */);
  // 加载环境
  const env = loadEnv(config.mode, process.cwd(), 'VITE');
  const viteEnv = wrapperEnv(env);
  console.log(viteEnv);
  return {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
      extensions: ['.js', '.ts', 'scss'],
    },
    server: {
      port: viteEnv.VITE_PORT,
      open: viteEnv.VITE_OPEN,
    },
    esbuild: {
      // 打包去除console.log
      // pure: viteEnv.VITE_DROP_CONSOLE ? ['console.log', 'debugger'] : [],
    },
    plugins: [vue(), vitePluginHtml({ title: viteEnv.VITE_APP_TITLE })],
    // 依赖预构建配置项
    optimizeDeps: {
      // exclude: ['lodash-es'],
    },
    //
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/assets/var.scss" as *;`,
        },
      },
      postcss: {
        plugins: [
          preset({
            autoprefixer: {
              overrideBrowserslist: ['last 2 versions'],
            },
          }),
        ],
      },
      modules: {
        // css modules 文件扩展名
        generateScopedName: '[name]_[local]_[hash:base64:5]',
      },
    },
    build: {
      rollupOptions: {
        external: ['vue'],
        plugins: [
          visual({
            open: true,
          }),
          externalGlobals({
            vue: 'Vue',
          }),
        ],
      },
    },
  };
};
export default defineConfig(config);
