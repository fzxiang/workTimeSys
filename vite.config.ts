import path from 'path';
import { defineConfig } from 'vite'
import { createProxy } from './build/vite/proxy';
import { createVitePlugins } from './build/vite/plugin';

const VITE_PROXY = [["/api","http://172.18.90.214:8082/api"], ["/ssoLogin", "http://10.130.0.37:9093/ssoLogin"]]
// const VITE_PROXY = [[]]

const viteEnv = {
  VITE_USE_MOCK: true
}
const pathSrc = path.resolve(__dirname, 'src')

export default ({ command }) => {
  const isBuild = command === 'build';

  return defineConfig({
    resolve: {
			alias: {
				'@': pathSrc,
			},
		},
    server: {
      host: true,
      open: true,
      port: 3000,
      proxy: createProxy(VITE_PROXY),
			headers: {
				'Access-Control-Allow-Origin': '*',
			}
    },
    plugins: createVitePlugins(viteEnv, isBuild),
		css: {
			preprocessorOptions: {
				less: {
					// modifyVars: generateModifyVars(),
					// javascriptEnabled: true,
				},
			},
		},
  })

}
