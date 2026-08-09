import { defineConfig } from "vite";

export default defineConfig({
  build: {
    target: "es2022",
    sourcemap: true,
    emptyOutDir: false,
    lib: {
      entry: "src/index.ts",
      name: "Vallum",
      formats: ["es", "iife"],
      fileName: (format) => format === "es" ? "vallum.esm.js" : "vallum.iife.js",
    },
  },
});
