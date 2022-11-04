const resolvePlugin = [
  ["module-resolver", {
    "alias": {
      "@": "./src",
      "@datasets": "./tests/e2e/datasets/helpers"
    }
  }]
]

module.exports = {
  projectId: 'cayihf',
  viewportWidth: 1920,
  viewportHeight: 1080,
  defaultCommandTimeout: 15000,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    //baseUrl: 'https://org359.int.akaraisin.com/ui',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
  },
  presets: ['@babel/preset-env'],
  plugins: ['@babel/transform-runtime', ...resolvePlugin]
}
