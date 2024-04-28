import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path"
import { TanStackRouterVite } from '@tanstack/router-vite-plugin'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react(),TanStackRouterVite(),],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/"),
    },
  },
  preview: {
   port: 3000,
   strictPort: true,
  },
  server: {
   port: 3000,
   strictPort: true,
   host: true,
   origin: "http://0.0.0.0:3000",
  },
 });