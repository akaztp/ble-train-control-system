const rootDir = '../../../';
const tasks = require(rootDir + 'tools/tasks');
const gulp = require('gulp');
const appFile = 'src/profiles/train-driver-connection/app.ts';
const trainDriverDeviceId = 'df:2f:04:17:36:cf';
gulp.task('build', tasks.build(rootDir, appFile, 'global.trainDriverDeviceId="' + trainDriverDeviceId + '";'));

const deviceId = 'e7:ab:ba:33:17:5f';
gulp.task('send-to-espruino', tasks.send(rootDir, deviceId));
