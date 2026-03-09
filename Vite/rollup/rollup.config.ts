import { defineConfig } from 'rollup';
import type { RollupOptions } from 'rollup';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import babel from '@rollup/plugin-babel';
const options1: RollupOptions = {
  input: 'src/index.ts',
  output: {
    file: 'dist/index.js',
    format: 'cjs',
    name: '[name]',
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    typescript(),
    babel({
      babelHelpers: 'runtime',
      exclude: 'node_modules/**',
      include: 'src/**',
      extensions: ['.ts', '.js'],
    }),
  ],
};
const options2: RollupOptions = {
  input: 'src/main.ts',
  output: {
    file: 'dist/index.esm.js',
    format: 'esm',
  },
  plugins: [nodeResolve(), commonjs(), typescript()],
};
export default defineConfig([options1, options2]);
