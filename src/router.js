import queryMiddleware from 'farce/lib/queryMiddleware';
import createRender from 'found/lib/createRender';
import makeRouteConfig from 'found/lib/makeRouteConfig';
import Route from 'found/lib/Route';
import { Resolver } from 'found-relay';
import React from 'react';
import { graphql } from 'react-relay';
import { Environment, Network, RecordSource, Store } from 'relay-runtime';

import AdminApp from './components/admin/AdminApp';

export const historyMiddlewares = [queryMiddleware];

export function createResolver(fetcher) {
  const environment = new Environment({
    network: Network.create((...args) => fetcher.fetch(...args)),
    store: new Store(new RecordSource()),
  });

  return new Resolver(environment);
}


export const routeConfig = makeRouteConfig(
   <Route path="admin"
    Component={AdminApp}
    query={graphql`
      query router_AdminApp_Query {
        viewer {
          ...AdminApp_viewer
        }
      }
    `}>
  </Route>,
);

export const render = createRender({});
