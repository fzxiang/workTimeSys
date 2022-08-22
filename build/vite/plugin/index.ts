import vue from '@vitejs/plugin-vue'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { configMockPlugin } from './mock'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { VantResolver } from 'unplugin-vue-components/resolvers'
// import legacy from '@vitejs/plugin-legacy'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { visualizer } from 'rollup-plugin-visualizer'
import path from 'path'
import { viteVConsole } from 'vite-plugin-vconsole'

// import Icons from 'unplugin-icons/vite'
// import IconsResolver from 'unplugin-icons/resolver'

export function createVitePlugins(viteEnv, isBuild) {
  const { VITE_USE_MOCK } = viteEnv

  const vitePlugins = [
    // have to
    vue(),
    vueJsx(),
    visualizer(),

    // legacy({
    //   targets: ['defaults', 'not IE 11'],
    // }),

    AutoImport({
      // Auto import functions from Vue, e.g. ref, reactive, toRef...
      // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
      imports: ['vue'],

      // Auto import functions from Element Plus, e.g. ElMessage, ElMessageBox... (with style)
      // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
      resolvers: [
        ElementPlusResolver(),

        // Auto import icon components
        // 自动导入图标组件
        // IconsResolver({
        // 	prefix: 'Icon',
        // }),
      ],

      // dts: path.resolve(pathSrc, 'auto-imports.d.ts'),
    }),

    Components({
      resolvers: [
        // Auto register icon components
        // 自动注册图标组件
        // IconsResolver({
        // 	enabledCollections: ['ep'],
        // }),
        // Auto register Element Plus components
        // 自动导入 Element Plus 组件
        ElementPlusResolver(),
        VantResolver(),
      ],

      // dts: path.resolve(pathSrc, 'components.d.ts'),
    }),

    viteVConsole({
      entry: [path.resolve('src/main.ts')],
      localEnabled: !!process.env.VITE_CONSOLE,
      enabled: false,
      config: {
        maxLogNumber: 1000,
        theme: 'light',
      },
    }),
    // Icons({
    // 	autoInstall: true,
    // }),
  ]

  // vite-plugin-mock
  VITE_USE_MOCK && vitePlugins.push(configMockPlugin(isBuild))

  return vitePlugins
}
