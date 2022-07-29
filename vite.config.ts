import { defineConfig } from 'vite';
import * as path from 'path';
import react from '@vitejs/plugin-react';
import vitePluginImp from 'vite-plugin-imp';
import * as dotenv from 'dotenv';

dotenv.config({
  path: path.resolve('envs', `.env.${process.env.NODE_ENV}`),
});
// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  define: {
    'process.env': process.env,
  },
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
  server: {
    port: 8080,
    proxy: {
      [process.env.BASE_URL]: {
        target: process.env.BASE_URL,
        changeOrigin: true,
      },
    },
  },
  build: {
    minify: 'terser',
    rollupOptions: {
      output: {
        // 最小化拆分包
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            return id
              .toString()
              .split('node_modules/')[1]
              .split('/')[0]
              .toString();
          }
          return null;
        },
        // 用于从入口点创建的块的打包输出格式[name]表示文件名,[hash]表示该文件内容hash值
        entryFileNames: 'js/[name].[hash].js',
        // 用于命名代码拆分时创建的共享块的输出命名
        chunkFileNames: 'js/[name].[hash].js',
        // 用于输出静态资源的命名，[ext]表示文件扩展名
        assetFileNames: '[ext]/[name].[hash].[ext]',
        // 拆分js到模块文件夹
        // chunkFileNames: (chunkInfo) => {
        //     const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split('/') : [];
        //     const fileName = facadeModuleId[facadeModuleId.length - 2] || '[name]';
        //     return `js/${fileName}/[name].[hash].js`;
        // },
      },
    },
  },
});
