import { renderToString } from '@vue/server-renderer';
import { createApp } from './app';
import { dangerouslySkipEscape, escapeInject } from 'vite-plugin-ssr/server';

export { render };

async function render(pageContext) {
  const app = createApp(pageContext);
  const appHtml = await renderToString(app);

  return escapeInject`<!DOCTYPE html>
    <html>
      <head>
        <title>Todo List</title>
        <meta charset="UTF-8">
      </head>
      <body>
        <div id="app">${dangerouslySkipEscape(appHtml)}</div>
      </body>
    </html>`;
}
