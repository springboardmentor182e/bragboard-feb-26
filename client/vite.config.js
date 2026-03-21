import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',  // 👈 BASE PATH SET
  server: {
    port: 5173,
  }
})