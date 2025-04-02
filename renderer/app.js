import { createSSRApp } from 'vue';
import App from '../src/App.vue';

export { createApp };

function createApp(pageContext) {
  const app = createSSRApp(App);
  return app;
}
