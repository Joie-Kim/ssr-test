import express from 'express';
import { createSSRApp } from 'vue';
import { renderToString } from '@vue/server-renderer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

// SSR을 위한 서버 앱 생성
async function createApp() {
  const app = createSSRApp({
    data() {
      return {
        message: 'Server Rendered Page',
      };
    },
    template: `
      <div>
        <h1>{{ message }}</h1>
      </div>
    `,
  });
  return app;
}

// SSR 라우트 처리
app.get('/server-rendered', async (req, res) => {
  try {
    const app = await createApp();
    const html = await renderToString(app);

    // HTML 템플릿
    const template = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>SSR Page</title>
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
