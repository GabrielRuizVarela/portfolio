import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslintPlugin from '@nabla/vite-plugin-eslint';
// import { TailwindCSSVitePlugin } from 'tailwindcss-vite-plugin';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/portfolio/',
  plugins: [react(), eslintPlugin()],
});
