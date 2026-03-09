import { Plugin } from 'vite';

export default function htmlPlugin({ title = '' }): Plugin {
  return {
    name: 'html-plugin',
    transformIndexHtml(html) {
      return html.replace(/<title>(.*?)<\/title>/, `<title>${title}</title>`);
    },
  };
}
