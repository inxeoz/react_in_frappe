import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
	plugins: [react()],
	define: {
		"process.env": {}, // Prevent "process is not defined"
	},
	build: {
		outDir: "../public/static_ui",
		emptyOutDir: true,
		lib: {
			entry: "./src/main.jsx",
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
