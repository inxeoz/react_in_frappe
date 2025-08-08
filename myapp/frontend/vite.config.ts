import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import WindiCSS from 'vite-plugin-windicss';



// https://vite.dev/config/
export default defineConfig({
    plugins: [svelte(), WindiCSS()],
    build: {
        outDir: '../public/svelte' ,// <- change this to whatever folder you want

        rollupOptions: {

            output: {
                entryFileNames: `main.js`,       // 👈 NO hashing
                assetFileNames: `main.css`,      // 👈 NO hashing
            },
    }
    }
})


