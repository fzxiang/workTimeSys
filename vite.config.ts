import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true,
    open: true,
    port: 3000
  },
  plugins: [
    vue(),
    Components({
      resolvers: [VantResolver()]
    })
  ]
});
