const rootDir = '../../../';
const tasks = require(rootDir + 'tools/tasks');
const gulp = require('gulp');
const appFile = 'src/profiles/train-driver/app.ts';
gulp.task('build', tasks.build(rootDir, appFile));

const deviceId = 'df:2f:04:17:36:cf';
gulp.task('send-to-espruino', tasks.send(rootDir, deviceId));
