const path = require('path');
const ROOT = path.resolve(__dirname);

function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [ROOT].concat(args));
}
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@layout': root('../layouts/hat-city-layout'),
        '@logic': root('../logic'),
      },
    },
  },
};
