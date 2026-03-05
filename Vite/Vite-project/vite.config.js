import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  if (command === 'serve') {
    return {
      plugins: [vue()],
      server: {
        open: true,
      },
      resolve: {
        alias: {
          '@': path.join(__dirname, 'src'),
        },
        extensions: ['.js', '.ts', '.vue', '.json'],
      },
      define: {
        // 定义一个全局变量可以在任意文件中使用
        __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
      },
      css: {
        postcss: {
          plugins: [],
        },
        preprocessorOptions: {
          scss: {
            additionalData: `@use "@/assets/styles/common.scss" as *;`,
          },
        },
      },
      // 预构建依赖项
      optimizeDeps: {
        entries: ['./src/main.js', '!src/experimental/**/*.js'],
        include: ['@vue/compiler-sfc'],
        esbuildOptions: {
          target: 'es2015', // es2015
        },
      },
    };
  } else {
    return {
      plugins: [vue()],
      build: {
        outDir: 'dist',
        rollupOptions: {
          input: { main: path.resolve(__dirname, 'index.html') },
        },
      },
    };
  }
});
