import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Unocss from 'unocss/vite'
import { presetUno } from 'unocss'
import presetAttributify from '@unocss/preset-attributify'
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Unocss({
      presets: [presetAttributify(), presetUno()],
    }),
    AutoImport({
      imports:['vue'],
      dts:'src/auto-imports.d.ts'
    })
  ],
});
