const tasks = require('./tasks');
const gulp = require('gulp');

const rootDir = '../';

//const appTsFileName = 'app.ts';
//gulp.task('build', tasks.build(rootDir, appTsFileName));

// gulp.task('send-to-espruino', ['build'], tasks.send(rootDir));
gulp.task('send-to-espruino', tasks.send(rootDir));
