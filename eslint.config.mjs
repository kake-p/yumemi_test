import withNuxt from './.nuxt/eslint.config.mjs'
import stylistic from '@stylistic/eslint-plugin'

export default withNuxt(
  {
    files: ['**/*.vue', '**/*.ts'],
    rules: {
      'no-console': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
    },
  },
  {
    files: ['**/*.vue'],
    rules: {
      'vue/no-multiple-template-root': 'error',
      'vue/multi-word-component-names': 'error',
      'vue/require-v-for-key': 'error',
      'vue/no-use-v-if-with-v-for': 'error',
      'unicorn/filename-case': [
        'error',
        {
          cases: {
            camelCase: true,
            pascalCase: true,
          },
        },
      ],
    },
  },
  stylistic.configs.customize({
    indent: 2,
    trailingComma: 'es5',
    tabWidth: 2,
    useTabs: true,
    singleQuote: true,
    bracketSpacing: true,
  }),
)
