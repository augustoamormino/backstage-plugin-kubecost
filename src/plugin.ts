import { Entity } from '@backstage/catalog-model';
import {
  createApiFactory,
//   createComponentExtension,
  createPlugin,
  createRoutableExtension,
  createRouteRef,
  discoveryApiRef,
} from '@backstage/core';
import { KubeCostApiClient, kubecostApiRef } from './api';
import {
  KUBECOST_ANNOTATION_URL,
} from './components/useKubeCostAppData';

export const isKubeCostAvailable = (entity: Entity) =>
  Boolean(entity?.metadata.annotations?.[KUBECOST_ANNOTATION_URL]);

export const entityContentRouteRef = createRouteRef({
  title: 'Kubecost Entity Content',
});

export const KubeCostPlugin = createPlugin({
  id: 'kubecost',
  apis: [
    createApiFactory({
      api: kubecostApiRef,
      deps: { discoveryApi: discoveryApiRef },
      factory: ({ discoveryApi }) => new KubeCostApiClient({ discoveryApi }),
    }),
  ],
  routes: {
    entityContent: entityContentRouteRef,
  },
});

export const EntityKubeCostContent = KubeCostPlugin.provide(
  createRoutableExtension({
    component: () => import('./Router').then(m => m.Router),
    mountPoint: entityContentRouteRef,
  }),
);
