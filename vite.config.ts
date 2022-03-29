import { defineConfig } from 'vite';
import * as path from 'path';
import react from '@vitejs/plugin-react';
import vitePluginImp from 'vite-plugin-imp';
// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    react(),
    vitePluginImp({
      libList: [
        {
          libName: 'antd',
          libDirectory: 'es',
          style: () => `antd/dist/antd.less`,
          // TODO：按需引入-antd组件内部用了 未引入的组件 导致样式丢失
          // style: (name) => `antd/es/${name}/style/index.less`,
        },
      ],
    }),
  ],
  css: {
    preprocessorOptions: {
      less: {
        // 支持内联js
        javascriptEnabled: true,
      },
    },
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname),
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: { port: 8080 },
});
