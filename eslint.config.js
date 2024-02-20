// @ts-check

import jie from '@djie/eslint-config'

export default jie({
  rules: {
    'vue/html-self-closing': 'off',
    'no-console': 'off',
    'antfu/if-newline': 'off',
    'vue/no-parsing-error': 'off',
    // 'no-console': 'error',
  },
}, {
  ignores: [
    'packages/print-js/print-js.js',
    'public/',
  ],
})
