import path from 'path'
import { defineConfig } from 'vitest/config'

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/index.ts'),
            name: 'pornhub',
            formats: ['es', 'cjs'],
            fileName: format => `index.${format}.js`,
        },
    },
    test: {
        testTimeout: 30000,
    },
})
