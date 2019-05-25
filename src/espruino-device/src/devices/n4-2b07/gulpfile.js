const rootDir = '../../../';
const tasks = require(rootDir + 'tools/tasks');
const gulp = require('gulp');
const appFile = 'src/devices/n4-2b07/app.ts';
gulp.task('build', tasks.build(rootDir, appFile));

const deviceId = 'c8:50:a8:46:2b:07';
gulp.task('send-to-espruino', tasks.send(rootDir, deviceId));
