const gulp = require('gulp');
const fs = require('fs');
const {fork} = require('child_process');
const flatten = require('flat');
const path = require('path');
const yaml = require('js-yaml');
const _ = require('lodash');
const replace = require('gulp-string-replace');
const rollup = require('gulp-better-rollup');
const rollupTypescript = require('rollup-plugin-typescript2');
const rollupReplace = require('rollup-plugin-replace');
const rollupUglify = require('rollup-plugin-uglify').uglify;
const rollupAlias = require('rollup-plugin-alias');
const rollupNodeResolve = require('rollup-plugin-node-resolve');
const minify = require('uglify-js').minify;
var footer = require('gulp-footer');

const configDirName = 'config';
const distDirName = 'dist';
const bundleFileName = 'bundle.js';

// const envConfig = yaml.load(fs.readFileSync(configDir + 'env-config.yaml'));

function rollupConfigFactory(configDir, debug = true) {
  const appConfig = yaml.load(fs.readFileSync(path.join(configDir, 'app-config.yaml')));
  let userAppConfig;
  try {
    userAppConfig = yaml.load(fs.readFileSync(path.joing(configDir, 'app-config.user.yaml')));
  } catch (e) {
    userAppConfig = {};
  }

  const config = Object.assign({}, appConfig, userAppConfig);
  const replaceValues = _.mapValues(flatten({__CONFIG__: config}), v => {
    if (typeof v === 'string' && v.match(/^(NodeMCU\.)?D\d{1,2}/)) {
      return v;
    }
    return JSON.stringify(v);
  });

  const plugins = [
    // rollupNodeResolve(),
    rollupTypescript({
      verbosity: 1,
    }),
    // {
    //   transform(code, id) {
    //     console.log(id);
    //     console.log(code);
    //     // not returning anything, so doesn't affect bundle
    //   },
    // },
    rollupReplace({values: replaceValues}),
  ];

  if (!debug) {
    plugins.push(
      rollupUglify({
        output: {beautify: true}, // Activate for debugging purposes
        compress: true,
        mangle: {reserved: ['onInit'], toplevel: true},
      }, minify),
    );
  }

  return {
    options: {
      plugins,
    },
    output: {format: 'cjs', file: bundleFileName},
  };
}

function isDebug() {
  return Array.from(process.argv).includes('--debug');
}

module.exports.build = (rootDir, appTsFileName, codeSuffix) => cb => {
  const rollupConfig = rollupConfigFactory(path.join(rootDir, configDirName), isDebug());
  let formOutFile = gulp.src(path.join(rootDir, appTsFileName))
    .pipe(rollup(rollupConfig.options, rollupConfig.output))
    .pipe(replace('\'use strict\';', ''))
    .pipe(replace('"use strict";', ''));
  if (codeSuffix) {
    formOutFile = formOutFile.pipe(footer(codeSuffix + '\n'));
  }
  formOutFile
    .pipe(gulp.dest(path.join(rootDir, distDirName)))
    .on('end', () => cb());
};

module.exports.send = (rootDir, deviceId) => cb => {
  const configDir = path.join(rootDir, configDirName);
  const envConfig = yaml.load(fs.readFileSync(path.join(configDir, 'env-config.yaml')));
  const bundleFilePath = path.join(rootDir, distDirName, bundleFileName);

  let espruinoCliConfig = ['--board', envConfig.board];
  if (deviceId) {
    espruinoCliConfig.push('-p', deviceId);
  } else {
    espruinoCliConfig.push('-d', envConfig.device);
  }
  espruinoCliConfig.push(bundleFilePath);
  espruinoCliConfig.push('-e', 'save()');
  espruinoCliConfig.push('--sleep', '25');
  const buildproc = fork(
    require.resolve('espruino/bin/espruino-cli'),
    espruinoCliConfig,
  );
  buildproc.on('close', () => cb());
};
