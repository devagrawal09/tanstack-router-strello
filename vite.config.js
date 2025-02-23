import { defineConfig } from 'vite'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import solidPlugin from 'vite-plugin-solid'
import tailwindcss from '@tailwindcss/vite'

import { resolve } from 'path'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    TanStackRouterVite({ target: 'solid' }),
    solidPlugin(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '~': resolve(__dirname, './src'),
    },
  },
  // plugins: [solidPlugin()],
})
