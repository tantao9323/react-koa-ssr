import { StaticRouter } from 'react-router-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { matchRoutes } from 'react-router-config';
import createApp from './createApp';

export default ctx => new Promise((resolve, reject) => {
  const { router, store, routerConfig } = createApp();

  const routes = matchRoutes(routerConfig, ctx.url);

  if (routes.length <= 0) {
    return reject(new Error({ code: 404, message: 'Not Page' }));
  }

  const promises = routes
    .filter(item => item.route.component.asyncData)
    .map(item => item.route.component.asyncData(store, item.match));

  return Promise.all(promises)
    .then(() => {
      ctx.store = store;
      resolve(
        <Provider store={store}>
          <StaticRouter location={ctx.url} context={ctx}>
            {router}
          </StaticRouter>
        </Provider>,
      );
    })
    .catch(reject);
});
