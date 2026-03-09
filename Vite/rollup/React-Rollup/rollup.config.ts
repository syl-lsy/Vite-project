import type { RollupOptions } from 'rollup';
import { defineConfig } from 'rollup';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import html from 'rollup-plugin-generate-html-template';
import { visualizer } from 'rollup-plugin-visualizer';
import clear from 'rollup-plugin-clear';
import alias from '@rollup/plugin-alias';
import { fileURLToPath } from 'node:url';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import replace from '@rollup/plugin-replace';
import postCss from 'rollup-plugin-postcss';
import image from '@rollup/plugin-image';
const options: RollupOptions = {
  input: './src/main.tsx',
  output: {
    file: './dist/bundle.js',
    format: 'esm',
    plugins: [terser()], // 代码压缩
    entryFileNames: '[name].[hash].js', // 入口文件命名
    chunkFileNames: 'chunks/[name].[hash].js', // chunk文件命名
  },
  plugins: [
    clear({ targets: ['dist'] }), // 清除dist目录
    nodeResolve(), // 解析node_modules中的模块
    commonjs(), // 将CommonJS模块转换为ES6模块
    typescript(), // 将TypeScript转换为JavaScript
    // babel
    babel({
      babelHelpers: 'runtime',
      exclude: 'node_modules/**', // 防止打包node_modules下的文件
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      include: 'src/**',
    }),
    // css
    postCss({
      modules: true,
      extract: true,
      minimize: true,
      extensions: ['.css'],
    }),
    // 图片导入
    image(),
    // html模版导入
    html({
      template: './public/index.html',
      target: './dist/index.html',
      attrs: ['type=module'],
    }),
    replace({
      preventAssignment: true, // 防止替换掉变量
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    // 服务器
    serve({
      contentBase: './dist',
      open: true,
    }),
    // 服务器
    livereload(),
    // 别名
    alias({
      entries: {
        find: '@',
        replacement: fileURLToPath(new URL('./src', import.meta.url)),
        // '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    }),

    visualizer(), // 可视化打包文件
  ],
};
export default defineConfig(options);
