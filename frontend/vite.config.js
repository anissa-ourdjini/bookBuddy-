import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/books': 'http://localhost:5000',
      '/users': 'http://localhost:5000',
      '/rewards': 'http://localhost:5000',
      '/auth': 'http://localhost:5000'
    }
  }
});
