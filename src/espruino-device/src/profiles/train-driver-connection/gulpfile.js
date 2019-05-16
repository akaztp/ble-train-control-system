const rootDir = '../../../';
const tasks = require(rootDir + 'tools/tasks');
const gulp = require('gulp');
const appFile = 'src/profiles/train-driver-connection/app.ts';
gulp.task('build', tasks.build(rootDir, appFile));

const deviceId = 'e7:ab:ba:33:17:5f';
gulp.task('send-to-espruino', tasks.send(rootDir, deviceId));
