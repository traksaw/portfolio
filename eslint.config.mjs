import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // `eslint .` lints every folder. `next lint` skipped build output on its own; this list does that now.
  {
    ignores: [
      ".next/**",
      "out/**",
      "build/**",
      "coverage/**",
      ".netlify/**",
      ".codex/**",
      ".superpowers/**",
      "next-env.d.ts",
    ],
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "next/font/google",
              message:
                "Self-host fonts with next/font/local (see app/fonts/). next/font/google fetches from Google during every build, and a bad response fails the deploy.",
            },
          ],
        },
      ],
    },
    settings: {
      "import/resolver": {
        typescript: {
          project: "./tsconfig.json",
        },
      },
    },
  },
];

export default eslintConfig;
