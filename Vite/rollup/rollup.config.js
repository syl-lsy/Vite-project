import { defineConfig } from 'rollup';
const buildOptions1 = {
  input: ['./src/index.js'],
  output: [
    {
      file: './dist/bundle.js',
    //   dir: '',
      format: 'esm',
      name: 'myLib',
    },
  ],
};
const buildOptions2 = {
  input: ['./src/main.js'],
  output: [
    {
      file: './dist/bundle2.js',
    //   dir: '',
      format: 'cjs',
      name: 'myLib2',
    },]
};
export default defineConfig([buildOptions1, buildOptions2]);
