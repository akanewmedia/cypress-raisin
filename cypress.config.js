const resolvePlugin = [
  ["module-resolver", {
    "alias": {
      "@": "./src",
      "@datasets": "./tests/e2e/datasets/helpers"
    }
  }]
]

const { defineConfig } = require('cypress')
const fs = require('fs')
const path = require('path')

module.exports = defineConfig({
  projectId: 'cayihf',
  viewportWidth: 1920,
  viewportHeight: 1080,
  defaultCommandTimeout: 60000,
  chromeWebSecurity: false,  
  modifyObstructiveCode: false,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    //baseUrl: 'https://org359.int.akaraisin.com/ui',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
    testIsolation: false,
    downloadsFolder: 'cypress/downloads',
    setupNodeEvents(on, config) {
      on('task', {
        clearDownloads() {
          const dl = config.downloadsFolder
          if (fs.existsSync(dl)) {
            fs.readdirSync(dl).forEach(f =>
              fs.unlinkSync(path.join(dl, f))
            )
          }
          // tasks must return something
          return null
        },
      })
    },
  },
  presets: ['@babel/preset-env'],
  plugins: ['@babel/transform-runtime', ...resolvePlugin],
  reporter: 'mochawesome',
    reporterOptions: {
      charts: true,
      overwrite: false,
      html: true,
      json: false,
      reportDir: "cypress/results"
    }
})