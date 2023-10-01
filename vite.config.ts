import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vite'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), tsconfigPaths()],
	resolve: {
		alias: {
			'@': resolve(__dirname, './src')
		},
		extensions: ['.ts', '.tsx', 'json', 'js']
	},
	server: {
		port: 7000,
		open: true,
		cors: true
	}
})
