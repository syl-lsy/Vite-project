import { ConfigEnv, defineConfig, loadEnv, UserConfig } from 'vite';
import { wrapperEnv } from './src/commonUtils/wrapper';
import vue from '@vitejs/plugin-vue';
import path from 'path';
const config = (config: ConfigEnv): UserConfig => {
  console.log(config);
  console.log(process.cwd() /*当前node所运行的工作目录 */);
  // 加载环境
  const env = loadEnv(config.mode, process.cwd(), 'VITE');
  const viteEnv = wrapperEnv(env);

  return {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
      extensions: ['.js', '.ts'],
    },
    server: {
      port: viteEnv.VITE_PORT,
      open: viteEnv.VITE_OPEN,
    },
    esbuild: {
      // 打包去除console.log
      pure: viteEnv.VITE_DROP_CONSOLE ? ['console.log', 'debugger'] : [],
    },
    plugins: [vue()],
    // 依赖预构建配置项
    optimizeDeps: {
      // exclude: ['lodash-es'],
    },
  };
};
export default defineConfig(config);
