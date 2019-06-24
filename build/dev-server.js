const path = require('path');
const MFS = require('memory-fs');
const webpack = require('webpack');
const chokidar = require('chokidar');
const koaWebpackDevMiddleware = require('koa-webpack-dev-middleware');
const koaWebpackHotMiddleware = require('koa-webpack-hot-middleware');
const clientConfig = require('./webpack.client.config');
const serverConfig = require('./webpack.server.config');

const readFile = (fileSystem, file) => fileSystem.readFileSync(path.join(clientConfig.output.path, file), 'utf-8');

module.exports = function devServer(app, templatePath) {
  let bundle;
  let clientHtml;

  let ready;
  const readyPromise = new Promise((r) => {
    ready = r;
  });

  const update = () => {
    if (bundle && clientHtml) {
      ready({ bundle, clientHtml });
    }
  };

  chokidar.watch(templatePath).on('change', () => {
    console.log('index.html template updated.');
    update();
  });

  clientConfig.entry.app = ['webpack-hot-middleware/client', clientConfig.entry.app];
  clientConfig.output.filename = '[name].js';
  clientConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  );

  const clientCompiler = webpack(clientConfig);
  const devMiddleware = koaWebpackDevMiddleware(clientCompiler, {
    publicPath: clientConfig.output.publicPath,
    noInfo: true,
  });
  app.use(devMiddleware);
  clientCompiler.hooks.done.tap('DevPlugin', (stats) => {
    const result = stats.toJson();
    result.errors.forEach(err => console.error(err));
    result.warnings.forEach(err => console.warn(err));
    if (result.errors.length) return;
    clientHtml = readFile(devMiddleware.fileSystem, 'server.tpl.html');
    update();
  });

  app.use(koaWebpackHotMiddleware(clientCompiler));

  const serverCompiler = webpack(serverConfig);

  const mfs = new MFS();
  serverCompiler.outputFileSystem = mfs;
  serverCompiler.watch({}, (err, stats) => {
    if (err) throw err;
    const result = stats.toJson();
    if (result.errors.length) return;

    // eslint-disable-next-line no-eval
    bundle = eval(readFile(mfs, 'js/server-bundle.js')).default;
    update();
  });

  return readyPromise;
};
