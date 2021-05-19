import { Entity } from '@backstage/catalog-model';
import {
  createApiFactory,
  createComponentExtension,
  // createComponentExtension,
  createPlugin,
  createRoutableExtension,
  createRouteRef,
  discoveryApiRef,
} from '@backstage/core';
import { KubecostApiClient, kubecostApiRef } from './api';
import {
  KUBECOST_ANNOTATION_HOST,
} from './components/useKubecostAppData';

export const isKubecostDashboardAvailable = (entity: Entity) =>
  Boolean(entity?.metadata.annotations?.[KUBECOST_ANNOTATION_HOST]);
export const isKubecostAvailable = (entity: Entity) =>
  isKubecostDashboardAvailable(entity);

export const entityContentRouteRef = createRouteRef({
  title: 'Kubecost Entity Content',
});

export const kubecostPlugin = createPlugin({
  id: 'kubecost',
  apis: [
    createApiFactory({
      api: kubecostApiRef,
      deps: { discoveryApi: discoveryApiRef },
      factory: ({ discoveryApi }) => new KubecostApiClient({ discoveryApi }),
    }),
  ],
  routes: {
    entityContent: entityContentRouteRef,
  },
});

export const EntityKubecostContent = kubecostPlugin.provide(
  createRoutableExtension({
    component: () => import('./Router').then(m => m.Router),
    mountPoint: entityContentRouteRef,
  }),
);

export const EntityKubecostSpeedoCard = kubecostPlugin.provide(
  createComponentExtension({
    component: {
      lazy: () => import('./components/kubecostWidget').then(m => m.KubecostSpeedo)
    }
  })
)