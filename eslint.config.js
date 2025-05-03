import eslint from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import prettierPlugin from "eslint-plugin-prettier";
import eslintPluginVue from "eslint-plugin-vue";
import globals from "globals";
import typescriptEslint from "typescript-eslint";
import vueParser from "vue-eslint-parser";
import unocss from "@unocss/eslint-config/flat";

export default typescriptEslint.config(
  { ignores: ["**/node_modules/", "**/dist/", "**/build/", "**/coverage/"] },
  {
    extends: [
      eslint.configs.recommended,
      ...typescriptEslint.configs.recommended,
      ...eslintPluginVue.configs["flat/recommended"],
    ],
    files: ["**/*.{ts,vue}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
      parser: vueParser,
      parserOptions: {
        parser: typescriptEslint.parser,
      },
    },
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      "prettier/prettier": "error",
      "@typescript-eslint/no-explicit-any": "off",
      // your rules
    },
  },
  eslintConfigPrettier,
);
