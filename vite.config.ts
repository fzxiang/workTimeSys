import { resolve } from 'path'
import { defineConfig } from 'vite'
import { createProxy } from './build/vite/proxy';
import { createVitePlugins } from './build/vite/plugin';

const VITE_PROXY: [string, string][] = [["/api","http://10.130.0.51:9093/api"]]

const viteEnv = {
  VITE_USE_MOCK: true
}
function pathResolve(dir: string) {
	return resolve(process.cwd(), '.', dir);
}
export default ({ command }) => {
  const isBuild = command === 'build';

  // @ts-ignore
	// @ts-ignore
	// @ts-ignore
	return defineConfig({
    resolve: {
			alias: [
				{
					find: /\/@\//,
					replacement: pathResolve('src') + '/',
				},
				// /#/xxxx => types/xxxx
				{
					find: /\/#\//,
					replacement: pathResolve('types') + '/',
				},
			],
		},
    server: {
      host: true,
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
