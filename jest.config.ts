const config = {
    transform: {
      '^.+\\.svelte$': 'svelte-jester',
      "^.+\\.ts$": "ts-jest",
      '^.+\\.js$': 'babel-jest',
    },
    moduleFileExtensions: ['js', 'ts', 'svelte'],
    testEnvironment: "jsdom"
  }

export default config;