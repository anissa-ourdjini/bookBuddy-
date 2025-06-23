import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/books': 'http://localhost:5000',
      '/users': 'http://localhost:5000',
      '/rewards': 'http://localhost:5000',
      '/auth': 'http://localhost:5000'
    }
  }
});
