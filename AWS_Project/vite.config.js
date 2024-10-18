import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'pdfjs-dist': 'pdfjs-dist/legacy/build/pdf',
    },
  },
  optimizeDeps: {
    include: ['pdfjs-dist/build/pdf.worker.entry']
  }
  
})
