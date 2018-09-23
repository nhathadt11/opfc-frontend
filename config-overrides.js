const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');

module.exports = function override(config, env) {
  let nextConfig = injectBabelPlugin(
    ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }],
    config,
  );

  nextConfig = rewireLess.withLoaderOptions({
    modifyVars: {
      '@primary-color': '#f68b40',
      '@border-radius-base': 'unset',
      '@font-family': '"Montserrat", sans-serif;',
    },
    javascriptEnabled: true,
  })(config, env);

  return nextConfig;
};
