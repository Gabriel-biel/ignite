import { defineConfig } from 'vite'
import tsconfigPaths from 'ts-config-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    root: './'
  },
})
