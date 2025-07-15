import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import autoprefixer from 'autoprefixer';

export default defineConfig({
  base: './',
  build: {
    outDir: 'build',
  },
  css: {
    postcss: {
      plugins: [
        autoprefixer({}), // add options if needed
      ],
    },
  },
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.jsx?$/,
    exclude: [],
  },
  optimizeDeps: {
    force: true,
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: 'src/',
        replacement: `${path.resolve(__dirname, 'src')}/`,
      },
    ],
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.scss'],
  },
  server: {
    port: 3000, // Porta do seu frontend
    proxy: {
      '/api': { // Qualquer requisição que começar com /api
        target: 'http://localhost:8081', // << Redirecionar para o seu backend (URL e PORTA do backend)
        changeOrigin: true, // Muda o cabeçalho 'Origin' da requisição para o do target
        rewrite: (path) => path.replace(/^\/api/, '/api'),
      },
    },
  },
}); // Note: Não há vírgula após a propriedade 'server' se for a última.