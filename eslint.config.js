import globals from "globals";
import pluginJs from "@eslint/js";
import pluginVue from "eslint-plugin-vue";

export default [
  {
    files: ["**/*.{js,mjs,cjs,vue}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        jasmine: "readonly",
        describe: "readonly",
        it: "readonly",
        expect: "readonly",
        process: "readonly",
        console: "readonly", // Ajoutez ici si nécessaire
      },
    },
    rules: {
      "no-undef": "error",
      "no-unused-vars": "warn",
      "no-empty": "error",
    },
  },
  pluginJs.configs.recommended,
  ...pluginVue.configs["flat/essential"],
];
