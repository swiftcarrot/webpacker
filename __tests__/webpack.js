const uglify = require('../src/webpack/uglify');

test('uglify', () => {
  expect(uglify).toMatchSnapshot();
});
