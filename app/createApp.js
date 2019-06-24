import { renderRoutes } from 'react-router-config';
import routerConfig from './router';
import createStore from './redux/store/createStore';

export default function (store = {}) {
  return {
    router: renderRoutes(routerConfig),
    store: createStore(store),
    routerConfig,
  };
}
