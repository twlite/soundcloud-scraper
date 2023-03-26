import { defineConfig } from 'tsup';

export default defineConfig({
    dts: true,
    entry: ['./src/index.ts'],
    bundle: true,
    skipNodeModulesBundle: true,
    minify: false,
    keepNames: true,
    outDir: 'dist',
    target: 'node14',
    silent: true,
    clean: true,
    sourcemap: false
});