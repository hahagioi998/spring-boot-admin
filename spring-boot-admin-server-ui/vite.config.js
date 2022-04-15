import {defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
import {resolve} from 'path';
import {viteStaticCopy} from "vite-plugin-static-copy";
import postcss from "./postcss.config";

// https://vitejs.dev/config/
const root = resolve(__dirname, './src/main/frontend');
const outDir = resolve(__dirname, './target/dist');
const src = resolve(root, './sba-settings.js');

// Load app-level env vars to node-level env vars.

export default ({mode}) => {
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};

  return defineConfig({
    plugins: [
      vue(),
      viteStaticCopy({
        targets: [
          {
            src: src,
            dest: outDir
          },
          {
            src: resolve(root, 'assets'),
            dest: outDir
          }
        ]
      })
    ],
    root,
    css: {
      postcss
    },
    optimizeDeps: {
      exclude: [
        'autolinker',
        'lodash-es',
      ]
    },
    build: {
      outDir,
      rollupOptions: {
        input: {
          sba: resolve(root, './index.html')
        },
        external: ['sba-settings.js']
      }
    },
    resolve: {
      alias: {
        '@': root,
        'vue': 'vue/dist/vue.esm-bundler.js'
      },
    },
  })
}
