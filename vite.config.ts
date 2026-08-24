import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [vue(), dts({ entryRoot: 'src', exclude: ['tests', '*.config.ts'], insertTypesEntry: true })],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    lib: {
      entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
      formats: ['es'],
      fileName: 'index',
      cssFileName: 'style',
    },
    rollupOptions: {
      external: ['vue', 'ant-design-vue'],
      output: {
        assetFileNames: (assetInfo) => assetInfo.name === 'style.css' ? 'style.css' : assetInfo.name ?? 'asset',
      },
    },
  },
})
