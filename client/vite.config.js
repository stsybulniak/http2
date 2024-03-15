import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { nodeModulesPolyfillPlugin } from 'esbuild-plugins-node-modules-polyfill'
import nodePolyfills from "rollup-plugin-polyfill-node";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    esbuildOptions: {
      // Enable esbuild polyfill plugins
      plugins: [nodeModulesPolyfillPlugin()],
    },
  },
  build: {
    rollupOptions: {
      plugins: [nodePolyfills()],
    },
  },
})
