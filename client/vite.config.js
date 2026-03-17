import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
<<<<<<< HEAD
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
=======

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
>>>>>>> feature/employee-management-admin
})
