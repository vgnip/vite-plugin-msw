# vite-plugin-msw

一个 vite 插件，用于在工程化项目中本地 mock 拦截请求使用

## 安装

```bash
npm install vite-plugin-msw --save-dev
```

## 使用

```javascript
// vite.config.js
import { defineConfig } from "vite";
import vitePluginMsw from "vite-plugin-msw";

export default (mode) => {
  return {
    plugins: [
      vitePluginMsw({
        mode
      }),
    ],
  };
};
```

## 配置选项

| 选项            | 类型     | 默认值            | 描述         |
| --------------- | -------- | ----------------- | ------------ |
| `mode`          | `string` | ``                 | vite 模式 |

