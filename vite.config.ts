import { defineConfig } from 'vite';
import path from 'path';
import packageJson from './package.json';
import dts from 'vite-plugin-dts';

const LIBRARY_NAME = packageJson.name;

export default defineConfig({
  base: './',
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
      { find: '@@', replacement: path.resolve(__dirname) },
    ],
  },
  plugins: [dts({ rollupTypes: true })],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      formats: ['es', 'cjs'],
      fileName: (format) => `${LIBRARY_NAME}.${format}.js`,
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {},
        exports: 'named',
      },
    },
  },
});
