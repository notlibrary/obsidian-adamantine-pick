import { defineConfig, globalIgnores } from "eslint/config";
import obsidianmd from "eslint-plugin-obsidianmd";
import tseslint from "typescript-eslint";

export default defineConfig([
  globalIgnores(["main.js", "src/pick.js"]),
  ...obsidianmd.configs.recommended,
  {
    files: ["**/*.ts"],
    extends: [tseslint.configs.recommended],
    languageOptions: {
      parserOptions: { project: "./tsconfig.json" },
    },
  },
]);
