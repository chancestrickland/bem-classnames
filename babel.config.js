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
