import { createApiRef, DiscoveryApi } from '@backstage/core';

export interface KubeCostApi {}

export const kubecostApiRef = createApiRef<KubeCostApi>({
  id: 'plugin.kubecost.service',
  description: 'Used by the KubeCost plugin to make requests',
});

export type Options = {
  discoveryApi: DiscoveryApi;
  proxyPath?: string;
};

export class KubeCostApiClient implements KubeCostApi {
  // @ts-ignore
  private readonly discoveryApi: DiscoveryApi;

  constructor(options: Options) {
    this.discoveryApi = options.discoveryApi;
  }
}