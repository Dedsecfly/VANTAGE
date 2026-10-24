const { defineConfig } = require('vitest/config')
const react = require('@vitejs/plugin-react')

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.ts',
    reporters: ['default', 'dot'],
    outputMode: 'stream',
    typecheck: {
      enabled: true,
      checker: 'useTypeScriptVersion'
    }
  }
})