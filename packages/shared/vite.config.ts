import vue from "@vitejs/plugin-vue";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

const __dirname = dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  build: {
    lib: {
      // entry keys are mapped to generated filenames in dist directory.
      // For example: index will be index.js & index.cjs.
      //
      // IMPORTANT!!!
      // If you specify different name with filename, like 'my-web-core': resolve(__dirname, 'src/index.ts')
      // then my-web-core.js will be generated. But NO my-web-core.d.ts will be generated!
      // vite-plugin-dts auto-handling works based on your souce code files.
      entry: {
        index: resolve(__dirname, "src/index.ts"),
        services: resolve(__dirname, "src/services.ts"),
      },
      // 只生成 ES 模块
      formats: ["es"],
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ["axios", "date-fns", "js-base64", "vue"],
      // output: {
      //   // Provide global variables to use in the UMD build
      //   // for externalized deps
      //   globals: {
      //     vue: "Vue",
      //   },
      // },
    },
    sourcemap: true,
  },
  plugins: [dts({ tsconfigPath: "./tsconfig.app.json" }), vue()],
  server: {
    proxy: {},
  },
});
