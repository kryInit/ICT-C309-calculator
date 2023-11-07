import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill'
import rollupNodePolyFill from 'rollup-plugin-node-polyfills'
import * as path from "path";


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      util: 'rollup-plugin-node-polyfills/polyfills/util',
      assert: 'rollup-plugin-node-polyfills/polyfills/assert',
      buffer: 'rollup-plugin-node-polyfills/polyfills/buffer-es6',
      '~': path.join(__dirname, 'src'),
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      plugins: [
        NodeModulesPolyfillPlugin()
      ]
    }
  },
  build: {
    rollupOptions: {
      plugins: [
        rollupNodePolyFill()
      ]
    }
  }
})
