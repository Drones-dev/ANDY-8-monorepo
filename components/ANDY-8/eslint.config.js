import js from "@eslint/js";
import tseslint from "typescript-eslint";

const browserGlobals = {
  Blob: "readonly",
  document: "readonly",
  HTMLElement: "readonly",
  URL: "readonly",
  window: "readonly",
};

export default tseslint.config(
  { ignores: ["dist/**", "node_modules/**"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["src/**/*.{ts,tsx}"],
    languageOptions: { globals: browserGlobals },
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    },
  },
  {
    files: ["vite.config.ts"],
    rules: { "@typescript-eslint/no-explicit-any": "off" },
  },
);
