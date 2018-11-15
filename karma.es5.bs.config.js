// eslint-disable-next-line import/no-extraneous-dependencies
const createBaseConfig = require('@open-wc/testing-karma-bs/create-karma-es5-bs.config');

module.exports = (config) => {
  const baseConfig = createBaseConfig(config);

  config.set({
    ...baseConfig,

    files: [
      ...baseConfig.files,
      // allows running single tests with the --grep flag
      config.grep ? [config.grep] : 'test/**/*.test.js',
    ],

    browserStack: {
      ...baseConfig.browserStack,
      project: 'example-vanilla-set-game',
    },

    // just an example build for chrome only
    browsers: [
      'bs_win10_chrome_latest',
      // 'bs_win10_firefox_latest',
      // 'bs_win10_edge_latest',
      // 'bs_osxmojave_safari_latest',
      // 'bs_win10_ie_11',
    ],

    // TODO: not yet within the 90% default
    coverageIstanbulReporter: {
      thresholds: {
        global: {
          statements: 80,
          branches: 70,
          functions: 70,
          lines: 80,
        },
      },
    },
  });
};
