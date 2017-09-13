const fs = require('fs');
const path = require('path');
// const shell = require('shelljs');

module.exports = () => {
  const cwd = process.cwd();
  const name = path.basename(cwd);
  console.log('==> cxx init', name);

  shell.exec('git init');

  const packageJSON = {
    name: name,
    version: '0.1.0',
    private: true,
    scripts: {
      start: 'cxx start',
      build: 'cxx build'
    }
  };

  const cxx = {
    name: name,
    port: 5000
  };

  fs.writeFileSync(
    path.join(cwd, 'package.json'),
    JSON.stringify(packageJSON, ' ', 2)
  );

  fs.writeFileSync(
    path.join(cwd, 'cxx.js'),
    `module.exports = {
  name: '${name}',
  port: 5000
};
`
  );

  shell.exec('yarn add cxx react react-dom');
  shell.exec('yarn add cxx-cli --dev');
  shell.exec(['cp -r', path.join(__dirname, 'template/*'), cwd].join(' '));
  shell.exec('mv gitignore .gitignore');
};
