import { defineConfig, presetIcons, presetUno, transformerDirectives, transformerVariantGroup } from 'unocss';

export default defineConfig({
  presets: [presetUno(), presetIcons()],
  shortcuts: {
    'btn': 'p-3 rounded-3xl transition-all-500',
  },
  transformers: [transformerDirectives(), transformerVariantGroup()],
  theme: {
    colors: {
      brand: {
        primary: '#00095F',
        secondary: '#FCAA23',
      }
    }
  }
})