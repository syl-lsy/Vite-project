import { Plugin } from 'vite';

export default function viteHtmlPlugin({ title = '' }): Plugin {
  return {
    name: 'vite-plugin-html',
    transformIndexHtml(html) {
      console.log(html);
      return html.replace(/<title>(.*?)<\/title>/, `<title>${title}</title>`);
    },
  };
}
