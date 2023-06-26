// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');

exports.config = {
  allScriptsTimeout: 11000,
  specs: ['./src/**/*.e2e-spec.ts'],
  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      args: [
        // '--incognito',
        // "--headless"
      ],
    },
  },
  directConnect: true,
  useAllAngular2AppRoots: true,
  baseUrl: 'http://localhost:4200/2/pcui2/login',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function () { },
  },
  suites: {
    emails: './src/tests/create-email.e2e-spec.ts',
    dashboard: './src/tests/dashboard-pagel.e2e-spec.ts',
    contacts: './src/tests/manage-contacts.e2e-spec.ts',
    mypage: './src/tests/edit-my-page-title.e2e-spec.ts',
    team: [
      './src/tests/edit-my-team-page.e2e-spec.ts',
      './src/tests/join-team.e2e-spec.ts',
      './src/tests/team-progress.e2e-spec.ts',
    ],
  },
  onPrepare() {
    browser.driver.manage().window().maximize();
    console.log(
      'Path for tsconfig.e2e.json ',
      require('path').join(__dirname, './tsconfig.e2e.json')
    );
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.e2e.json'),
    });
    if (process.env.TEAMCITY_VERSION) {
      var jasmineReporters = require('jasmine-reporters');
      jasmine.getEnv().addReporter(new jasmineReporters.TeamCityReporter());
    } else {
      jasmine
        .getEnv()
        .addReporter(
          new SpecReporter({ spec: { displayStacktrace: 'pretty' } })
        );
    }
  },
};
