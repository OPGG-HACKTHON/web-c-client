module.exports = function (api) {
  console.info('babel config');

  api.cache(true);

  const presets = [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: 3,
        targets: {
          edge: '17',
          firefox: '60',
          chrome: '67',
          safari: '11.1',
          ie: '11',
        },
      },
    ],
    ['@babel/preset-react'],
    ['@babel/preset-typescript'],
  ];
  const plugins = [
    '@babel/plugin-proposal-class-properties',
    'react-hot-loader/babel',
    [
      'import',
      {
        libraryName: 'antd',
        style: true,
      },
    ],
  ];

  return {
    sourceType: 'unambiguous',
    presets,
    plugins,
  };
};
