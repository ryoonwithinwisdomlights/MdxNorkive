module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "plugin:react/jsx-runtime",
    "plugin:react/recommended",
    "plugin:@next/next/recommended",
    "standard",
    "prettier",
    "plugin:@typescript-eslint/recommended", // Add TypeScript recommended rules
    "plugin:@typescript-eslint/recommended-requiring-type-checking", // Add rules that require type checking
  ],
  parser: "@typescript-eslint/parser", //  Using the TypeScript parser
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
    project: "./tsconfig.json", // Specify the path to tsconfig.json
  },
  plugins: [
    "react",
    "react-hooks",
    "prettier",
    "@typescript-eslint", // Add TypeScript plugin
  ],
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    semi: 0,
    "react/no-unknown-property": "off", // <style jsx>
    "react/prop-types": "off",
    "space-before-function-paren": 0,
    "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }], // Make sure unused variables report an error
    "@typescript-eslint/explicit-function-return-type": "off", // Turn off mandatory function return type declaration,
    "tailwindcss/no-custom-classname": "off",
    "tailwindcss/classnames-order": "off",
  },
  globals: {
    React: true,
  },
};
