const yaml = require('yaml');

module.exports = function(source) {
  this.cacheable && this.cacheable();
  try {
    const res = yaml.parse(source);
    return `module.exports = ${JSON.stringify(res, undefined, '\t')}`;
  } catch (err) {
    this.emitError(err);
    return null;
  }
};
