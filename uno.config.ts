// import fs from 'node:fs'
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

/**
 * 将mobile:xxx转换为".is-mobile .xxx"
 * 通常情况无需使用，仅当is-mobile不仅仅是根据尺寸，还根据是否嵌入时使用
 * 需通过js等自行设置body或根节点的class为"is-mobile"
 * 例如：
 * 1. 根据尺寸：max-md:text-xl
 * 2. 根据尺寸及是否嵌入：mobile:text-xl
 */
function transformerMobile() {
  return {
    name: 'transformer-mobile',
    transform(code: any) {
      return code.replace(/mobile:(\w+)/g, (match: string, p1: string) => {
        return `.is-mobile .${p1}`
      })
    },
  }
}

const iconsDir = './app/assets/icons'

export default defineConfig({
  shortcuts: [
    ['btn', 'py-1 px-4 text-[14px] leading-[14px] rounded-[6px] border border-[#ddd] border-solid cursor-pointer transition text-gray-600 disabled:opacity-60 disabled:!cursor-not-allowed hover:[&:not(:disabled)]:text-primary hover:[&:not(:disabled)]:border-primary active:[&:not(:disabled)]:scale-95'],
    ['btn-plain', 'py-2 px-4 text-[14px] leading-[14px] rounded-[6px] border border-transparent border-solid cursor-pointer transition bg-[#eee] dark:bg-[#ffffff0d] dark:border-transparent disabled:opacity-60 disabled:!cursor-not-allowed hover:[&:not(:disabled)]:text-white hover:[&:not(:disabled)]:bg-primary/80 hover:[&:not(:disabled)]:border-primary active:[&:not(:disabled)]:scale-95'],
  ],
  theme: {
    colors: {
      primary: '#007bff',
    },
  },
  rules: [
    ['xy-center', { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }],
    ['flex-center', { 'display': 'flex', 'justify-content': 'center', 'align-items': 'center' }],
    ['transition', { 'transition-property': 'all', 'transition-timing-function': 'cubic-bezier(0.4, 0, 0.2, 1)', 'transition-duration': '150ms' }],
    ['safe-pt', { 'padding-top': `env(safe-area-inset-top)` }],
    ['safe-pb', { 'padding-bottom': `env(safe-area-inset-bottom)` }],
    ['safe-mt', { 'margin-top': `env(safe-area-inset-top)` }],
    ['safe-mb', { 'margin-bottom': `env(safe-area-inset-bottom)` }],
    [/^safe-pt-(\d)$/, ([, d]) => ({ 'padding-top': `calc(env(safe-area-inset-top) + ${+d * 0.25}rem)` }), { layer: 'utilities' }], // 不兼容iOS < 11.2
    [/^safe-pb-(\d)$/, ([, d]) => ({ 'padding-bottom': `calc(env(safe-area-inset-bottom) + ${+d * 0.25}rem)` }), { layer: 'utilities' }], // 不兼容iOS < 11.2
    [/^safe-mt-(\d)$/, ([, d]) => ({ 'margin-top': `calc(env(safe-area-inset-top) + ${+d * 0.25}rem)` }), { layer: 'utilities' }], // 不兼容iOS < 11.2
    [/^safe-mb-(\d)$/, ([, d]) => ({ 'margin-bottom': `calc(env(safe-area-inset-bottom) + ${+d * 0.25}rem)` }), { layer: 'utilities' }], // 不兼容iOS < 11.2
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      extraProperties: {
        width: '1.2em',
        height: '1.2em',
        display: 'block',
      },
      collections: {
        local: FileSystemIconLoader(
          iconsDir,
          // svg => svg.replace(/#fff/, 'currentColor'),
        ),
      },
    }),
    presetTypography(),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
    transformerMobile(),
  ],
  // safelist: generateSafeList(), // 动态生成 `safelist`
})

// function generateSafeList() {
//   try {
//     return fs
//       .readdirSync(iconsDir)
//       .filter(file => file.endsWith('.svg'))
//       .map(file => `i-local:${file.replace('.svg', '')}`)
//   }
//   catch (error) {
//     console.error('无法读取图标目录:', error)
//     return []
//   }
// }
