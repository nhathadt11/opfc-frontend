const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');

module.exports = function override(config, env) {
  let nextConfig = injectBabelPlugin(
    ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }],
    config,
  );

  nextConfig = rewireLess.withLoaderOptions({
    modifyVars: { "@primary-color": "#f68b40" },
    javascriptEnabled: true,
  })(config, env);

  return nextConfig;
};
