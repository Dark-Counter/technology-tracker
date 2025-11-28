import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Замените 'technology-tracker' на название вашего репозитория на GitHub
  base: '/technology-tracker/',
})
