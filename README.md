# multiLanguage-client

多语言管理平台前端

> 在线地址
> http://lisay.top/multiLanguage-client
>
> 技术栈：React、React-Router、Vite、TypeScript
>
> node 版本: 14.19.1
>
> npm 版本: 6.14.6

## 运行

> \# 安装依赖
>
> npm install
>
> \# 本地开发运行
>
> npm run start
>
> \# 生产环境
>
> npm run start:prod

## 项目打包

> npm run build

## 目录结构

```
├── commitlint.config.js                                            // commit提交校验配置文件
├── envs                                                            // 环境变量文件夹
├── index.html                                                      // 模板文件
├── package.json                                                    // 项目依赖
├── postcss.config.js
├── src                                                             // 源码目录
│   ├── api                                                         // 接口
│   │   ├── api.ts                                                  // 接口url
│   │   ├── axios.ts                                                // 底层请求
│   │   └── request.ts                                              // 请求示例
│   ├── App.tsx                                                     // 页面入口文件
│   ├── assets                                                      // 静态资源文件
│   │   └── styles                                                  // 通用样式文件
│   ├── component                                                   // 通用组件
│   ├── main.tsx                                                    // 程序入口文件，加载各种公共组件
│   ├── router                                                      // 路由文件
│   ├── type                                                        // 类型文件
│   ├── utils                                                       // 通用工具方法
│   ├── views
│   └── vite-env.d.ts
├── tailwind.config.js                                              // tailwinds UI框架配置
├── tailwindcss-classnames-expand.ts                                // 自定义的tailwinds样式名
├── tailwindcss-classnames.ts                                       // tailwindcss初始化生成的ts声明文件
├── tsconfig.json                                                   // ts配置文件
├── tsconfig.node.json
└── vite.config.ts                                                  // vite配置文件
```
