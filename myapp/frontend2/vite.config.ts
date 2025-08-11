// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react-swc'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    "process.env": {}, // Prevent "process is not defined"
  },
  build: {
    outDir: "../public/static_ui",
    emptyOutDir: true,
    lib: {
      entry: "./src/main.tsx",
      formats: ["es"],
      fileName: () => `main.js`, // no hashing
    },
    rollupOptions: {
      external: [],
      output: {
        entryFileNames: `main.js`, // no hash
        assetFileNames: `main.css`, // no hash
      },
    },
  },
});
