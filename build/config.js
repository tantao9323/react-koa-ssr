module.exports = {
  production: {
    port: 80,
    env: 'production',
    api: 'http://localhost/api',
    publicPath: '/',
    devtool: '#source-map',
    noHash: false,
  },
  development: {
    port: 8000,
    env: 'development',
    api: 'http://localhost:8000/api',
    publicPath: '/',
    devtool: 'eval',
    noHash: true,
  },
};
