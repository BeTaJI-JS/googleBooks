import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default [
  { ignores: ["dist"] },
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    settings: { react: { version: "18.3" } },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      ...reactHooks.configs.recommended.rules,
      "react/jsx-no-target-blank": "off",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "sort-keys/sort-keys-fix": 1, // Сортировка свойств объектов в алфавитном порядке (asc)
      "react/jsx-fragments": 0, // Разрешает использовать JSX фрагменты вместо `<div>`
      "sort-destructure-keys/sort-destructure-keys": 2, // Сортировка параметров деструктуризации в алфавитном порядке (asc)
      "react/button-has-type": 0, // Разрешает `<button>` без указания типа (button или submit)
      "import/order": [
        // Порядок импортов
        "error", //
        {
          alphabetize: {
            // Сортировка импортов в алфавитном порядке
            caseInsensitive: true, // Игнорировать регистр
            order: "asc", // Сортировка в алфавитном порядке
          },
          pathGroupsExcludedImportTypes: ["error", "react"],
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          "newlines-between": "always", // Новые строки между импортами
          pathGroups: [
            // Группировка импортов
            {
              group: "external",
              pattern: "react",
              position: "before",
            },
            {
              group: "internal",
              pattern: "components/**",
              position: "after",
            },
            {
              group: "internal",
              pattern: "pages/",
              position: "after",
            },
          ],
        },
      ],
    },
  },
];
