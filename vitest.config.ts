import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['test/**/*.test.ts'],
    // exclude: ['dist', 'node_modules', 'tmp'],
    coverage: {
      include: ['src/**/*.ts'],
    },
  },
})
