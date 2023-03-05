const config = {
    transform: {
      '^.+\\.svelte$': ['svelte-jester', {
        'preprocess': './svelte.config.js'
      }],
      "^.+\\.(js|ts)$": "ts-jest"
    },
    moduleFileExtensions: ['js', 'ts', 'svelte'],
    testEnvironment: "jsdom"
  }

export default config;