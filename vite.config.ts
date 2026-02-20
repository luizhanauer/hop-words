import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      // Passamos o caminho diretamente, dispensando o uso de 'path' e '__dirname'
      input: 'src/Main.ts', 
      output: {
        entryFileNames: 'main.js',
        format: 'iife',
      },
    },
    outDir: 'dist',
    emptyOutDir: true,
  },
});