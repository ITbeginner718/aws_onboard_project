import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'; // path 모듈 import  

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: [
      {
        find: '~bootstrap',
        replacement: path.resolve(__dirname, 'node_modules/bootstrap'),
      },

      {
        find: 'component',
        replacement: path.resolve(__dirname, 'src'),
      },

      {
        find: '@components',
        replacement: "/src/components",
      },

      {
        find: '@',
        replacement: "/src" ,
      },
    ]

    ,
  },

  optimizeDeps: {
    include: ['pdfjs-dist/build/pdf.worker.entry']
  }
  
})
