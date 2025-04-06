import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ["next/core-web-vitals", "next/typescript", "prettier"],
    plugins: ["simple-import-sort"],
    rules: {
      "simple-import-sort/imports": [
        "error",
        { groups: [["^react", "^next", "^@?\\w"], ["^@?\\w"], ["^"], ["^"]] },
      ],
      "simple-import-sort/exports": "error",
      semi: ["error"],
      quotes: ["error", "double"],
      "prefer-arrow-callback": ["error"],
      "prefer-template": ["error"]
    },
  }),
];

export default eslintConfig;