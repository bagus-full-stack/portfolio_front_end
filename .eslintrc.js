module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended",
    "next/core-web-vitals",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/no-explicit-any": "warn",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  // Spécifier les fichiers à analyser
  overrides: [
    {
      files: ["**/*.{js,jsx,ts,tsx}"], // Fichiers JavaScript et TypeScript
      excludedFiles: ["node_modules/**", ".next/**", "out/**", "public/**"],
    },
    {
      files: ["**/*.html"], // Fichiers HTML
      plugins: ["html"],
    },
    {
      files: ["**/*.vue"], // Fichiers Vue
      plugins: ["vue"],
      extends: ["plugin:vue/recommended"],
    },
  ],
}

