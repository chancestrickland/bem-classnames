let chalk = require('chalk');
let execSync = require('child_process').execSync;
let fs = require('fs');
let gzipSize = require('gzip-size');
let prettyBytes = require('pretty-bytes');
let { log } = console;

const DIVIDER = '\n-------------------------------------------';
const PACKAGE_NAME = 'bem-classnames';
const FILES = [
  {
    moduleType: 'es',
    file: `es/${PACKAGE_NAME}.js`,
    env: 'development',
  },
  {
    moduleType: 'es',
    file: `es/${PACKAGE_NAME}.min.js`,
    env: 'production',
  },
  {
    moduleType: 'cjs',
    file: 'index.js',
    env: 'production',
  },
  {
    moduleType: 'umd',
    file: `umd/${PACKAGE_NAME}.js`,
    env: 'development',
  },
  {
    moduleType: 'umd',
    file: `umd/${PACKAGE_NAME}.min.js`,
    env: 'production',
  },
];

function exec(command, extraEnv = {}) {
  execSync(command, {
    stdio: 'inherit',
    env: {
      ...process.env,
      ...extraEnv,
    },
  });
}

let t;
FILES.forEach(({ moduleType, file, env }, i, arr) => {
  if (t !== moduleType) {
    log(
      chalk.white(`\nBuilding ${moduleType.toUpperCase()} modules…${DIVIDER}`)
    );
  }

  exec(`rollup -c -f ${moduleType === 'es' ? 'esm' : moduleType} -o ${file}`, {
    BABEL_ENV: moduleType,
    NODE_ENV: env,
  });

  if (env === 'development') {
    exec(`prettier --write --loglevel silent ${file}`);
  }

  const size = gzipSize.sync(fs.readFileSync(file));
  log(chalk.green(`size: ${prettyBytes(size)}`));
  t = moduleType;
  if (i === arr.length - 1) {
    log(`${DIVIDER}\n`);
  }
});
