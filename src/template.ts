export const  moduleInfoFileContent =`
import { http, HttpResponse } from "msw";

export const handlers = [
    http.post('/api/lcdp/v1/entries/delete', () => {
        return HttpResponse.json({
          code: '0',
          data: null,
        })
      }),
      http.post('/api/lcdp/v1/entries/add', () => {
        return HttpResponse.json({
          code: '0',
          data: null,
        })
      }),
];

`

export const indexInfoFileContent =`

import { setupWorker } from "msw/browser";

// 批量导入某个文件夹下的所有文件
const modules = import.meta.glob('./module/**/*.mock.{js,ts}')

// 异步获取所有 handlers 并合并
 async function getAllHandlers() {
  const handlers = []
  
  for (const path in modules) {
    const module = await modules[path]()
    if (module.handlers && Array.isArray(module.handlers)) {
      handlers.push(...module.handlers)
    }
  }
  
  return handlers
}

getAllHandlers().then(handlers => {
   const worker = setupWorker(...handlers);
   worker.start({
    onUnhandledRequest: 'bypass',
   });
  })
  
  

  
`