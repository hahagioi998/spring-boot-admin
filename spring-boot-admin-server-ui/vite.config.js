import {defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
import {resolve} from 'path';
import {viteStaticCopy} from "vite-plugin-static-copy";
import postcss from "./postcss.config";
import visualizer from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
const root = resolve(__dirname, './src/main/frontend');
const outDir = resolve(__dirname, './target/dist');

export default ({mode}) => {
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};

  return defineConfig({
    define: {
      '__PROJECT_VERSION__': JSON.stringify(`${process.env.PROJECT_VERSION || '0.0.0'}`)
    },
    plugins: [
      vue(),
      visualizer(() => {
        return {filename: resolve(__dirname, 'target/vite.bundle-size-analyzer.html')};
      }),
      viteStaticCopy({
        targets: [
          {
            src: [resolve(root, './sba-settings.js'), resolve(root, './variables.css'), resolve(root, 'assets')],
            dest: outDir
          }
        ]
      })
    ],
    root,
    css: {
      postcss
    },
    build: {
      outDir,
      rollupOptions: {
        input: {
          sba: resolve(root, './index.html')
        },
        external: ['sba-settings.js', 'variables.css']
      }
    },
    resolve: {
      alias: {
        '@': root,
      },
    },
  })
}
