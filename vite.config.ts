import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,  // For using globals like describe, it, expect
    inspect: true, // Enables debugging
    environment: 'happy-dom',  // Choose environment (jsdom for React)
    setupFiles: './vitest.setup.ts',  // Point to the setup file
  },
})
