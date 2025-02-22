import _import from "eslint-plugin-import";
import { fixupPluginRules } from "@eslint/compat";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [{
    ignores: ["components/ui/**/*"],
}, ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "standard",
    "plugin:tailwindcss/recommended",
    "prettier",
), {
    plugins: {
        import: fixupPluginRules(_import),
    },

    rules: {
        "import/order": ["error", {
            groups: [
                "builtin",
                "external",
                "internal",
                ["parent", "sibling"],
                "index",
                "object",
            ],

            "newlines-between": "always",

            pathGroups: [{
                pattern: "@app/**",
                group: "external",
                position: "after",
            }],

            pathGroupsExcludedImportTypes: ["builtin"],

            alphabetize: {
                order: "asc",
                caseInsensitive: true,
            },
        }],
    },
}, {
    files: ["**/*.ts", "**/*.tsx"],

    rules: {
        "no-undef": "off",
    },
}];