const webpack = require('karma-webpack')
const webpackConfig = require('./webpack.config')
webpackConfig.module.rules = [
  {
    test: /\.js$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['env'],
      }
    }
  },
  {
    test: /\.js$/,
    enforce: 'post',
    exclude: /(node_modules|tests)/,
    use: {
      loader: 'istanbul-instrumenter-loader',
      options: {
      }
    }
  }
]

module.exports = function (config) {
  config.set({
    frameworks: ['jasmine'],
    files: [
      './node_modules/phantomjs-polyfill/bind-polyfill.js',
      'tests/**/*_spec.js'
    ],
    plugins: [
      webpack,
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-phantomjs-launcher',
      'karma-coverage',
      'karma-spec-reporter'
    ],
    browsers: ['PhantomJS'],
    preprocessors: {
      'tests/**/*_spec.js': ['webpack'],
      'src/**/*.js': ['webpack']
    },
    reporters: ['spec', 'coverage'],
    coverageReporter: {
      dir: 'build/reports/coverage',
      reporters: [
        { type: 'html', subdir: 'report-html' },
        { type: 'lcov', subdir: 'report-lcov' },
        { type: 'cobertura', subdir: '.', file: 'cobertura.txt' }
      ]
    },
    webpack: webpackConfig,
    webpackMiddleware: { noInfo: true }
  })
}
