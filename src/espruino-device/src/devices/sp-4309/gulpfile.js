const rootDir = '../../../';
const tasks = require(rootDir + 'tools/tasks');
const gulp = require('gulp');
const appFile = 'src/devices/sp-4309/app.ts';
gulp.task('build', tasks.build(rootDir, appFile));

const deviceId = 'd5:ad:ed:4d:43:09';
gulp.task('send-to-espruino', tasks.send(rootDir, deviceId));
