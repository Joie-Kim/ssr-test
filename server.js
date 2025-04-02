import express from 'express';
import { createSSRApp } from 'vue';
import { renderToString } from '@vue/server-renderer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import App from './src/App.vue';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

// SSR을 위한 서버 앱 생성
async function createApp() {
  const app = createSSRApp(App);
  return app;
}

// SSR 라우트 처리
app.get('/', async (req, res) => {
  try {
    const app = await createApp();
    const html = await renderToString(app);

    // HTML 템플릿
    const template = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Todo List</title>
          <meta charset="UTF-8">
        </head>
        <body>
          <div id="app">${html}</div>
          <script src="/src/main.js" type="module"></script>
        </body>
      </html>
    `;

    res.send(template);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// 정적 파일 서빙
app.use(express.static(path.join(__dirname, 'dist')));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
