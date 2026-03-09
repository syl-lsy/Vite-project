declare module 'rollup-plugin-generate-html-template';
declare module 'rollup-plugin-clear';
declare module 'rollup-plugin-serve';
declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}
declare module '*.png' {
  const content: string;
  export default content;
}
declare module '*.svg' {
  const content: string;
  export default content;
}
