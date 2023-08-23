const { GitRevisionPlugin } = require('git-revision-webpack-plugin');
let path = require('path');

module.exports = (env, options) => {
  process.env.STAGE = env.dev === true ? 'dev' : 'prod';
  let gitRevisionPlugin = new GitRevisionPlugin();
  let rootPath = path.join(__dirname, '..');

  let webappStageConfig = require(path.join(
    rootPath,
    'data',
    process.env.STAGE + '.config'
  ));
  let webappConfig = require(path.join(rootPath, 'data', 'config.webapp'));

  let config = {
    STAGE: process.env.STAGE,
    FAVICON: process.env.FAVICON,
    BUILD_TIMESTAMP: Date.now(),
    VERSION: gitRevisionPlugin.version(),
    COMMIT: gitRevisionPlugin.commithash(),
    BRANCH: gitRevisionPlugin.branch()
  };

  Object.assign(config, webappStageConfig, webappConfig);

  console.log('webappStageConfig', config);

  return config;
};
