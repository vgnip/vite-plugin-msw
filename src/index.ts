import fs from "fs-extra";
import path from "path";
import { moduleInfoFileContent, indexInfoFileContent } from "./template";
import { loadEnv } from "vite";

const developmentStr = "development";
function getPwd() {
  return process.cwd();
}

async function checkFileExists(filePath: string) {
  try {
    const exists = await fs.pathExists(filePath);
    return exists;
  } catch (err) {
    console.error("检查文件时出错:", err);
    return false;
  }
}

async function createMockModuleDir(path: string) {
  await fs.mkdir(path);
  // 创建测试文件
  fs.writeFile(path + "/test.mock.js", moduleInfoFileContent);
}
async function createMockFileIndex(path: string) {
  // 创建测试文件
  fs.writeFile(path, indexInfoFileContent);
}

async function checkHasMockModuleFile() {
  const pwd = getPwd();

  const mockFileIndexPath = path.resolve(pwd, "mock/index.js");

  const mockModuleDirPath = path.resolve(pwd, "mock/module");

  const isExistsMockFileIndexPath = await checkFileExists(mockFileIndexPath);
  const isExistsMockModuleDirPath = await checkFileExists(mockModuleDirPath);

  if (!isExistsMockFileIndexPath) {
    createMockFileIndex(mockFileIndexPath);
  }

  if (!isExistsMockModuleDirPath) {
    createMockModuleDir(mockModuleDirPath);
  }
}

function injectMockConfigToDom() {
  const moduleConfigIndexPath = "./mock/index.js";
  const str = `
document.addEventListener('DOMContentLoaded', () => {
  import('${moduleConfigIndexPath}').then(module => {
    if (typeof module.default === 'function') {
      module.default();
    } else if (typeof module === 'function') {
      module();
    }
  }).catch(err => {
    console.error('Failed to execute script:', err);
  });
});
`;
  return str;
}

function isOenMockServer(mode: string) {
  const env = loadEnv("local ", getPwd());
  const isOpenMockServer = env.VITE_ENABLE_MOCK;
  return isOpenMockServer === "true" && mode === developmentStr;
}
export default function vitePluginMsw(options: any = {}) {
  const { mode } = options;
  if (!mode) {
    throw new Error("mode option is required");
  }

  return {
    name: "vite-plugin-execute-on-mount",
    configureServer(server: any) {
      // 添加内存静态资源路由
      if (!isOenMockServer(mode)) return;
      server.middlewares.use(async (req: any, res: any, next: any) => {
        // 根据请求路径生成不同内容
        if (req.url.includes("mockServiceWorker.js")) {
          const blobStr = await fs.readFile(
            path.resolve(__dirname, "./mockServiceWorker.js"),
            "utf-8"
          );
          res.setHeader("Content-Type", "text/javascript");
          res.end(blobStr);
          return;
        }
        next();
      });
    },
    buildStart() {
      checkHasMockModuleFile();
    },

    transformIndexHtml(html: string) {
      if (!isOenMockServer(mode)) return;
      // 将执行脚本注入到 HTML 中
      return {
        html,
        tags: [
          {
            tag: "script",
            attrs: {
              type: "module",
            },
            children: injectMockConfigToDom(),
            injectTo: "body",
          },
        ],
      };
    },
  };
}
