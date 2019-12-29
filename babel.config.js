const BABEL_ENV = process.env.BABEL_ENV;
const building = BABEL_ENV != null && BABEL_ENV !== 'cjs';
const plugins = [
  [
    '@babel/plugin-transform-runtime',
    {
      regenerator: true,
    },
  ],
];

const presets = [
  [
    '@babel/preset-env',
    {
      loose: true,
      modules: building ? false : 'commonjs',
    },
  ],
];

module.exports = function(api) {
  api.assertVersion(7);
  api.cache(() => process.env.NODE_ENV);
  return {
    presets,
    plugins,
  };
};
