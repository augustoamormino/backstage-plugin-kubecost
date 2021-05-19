import { createApiRef, DiscoveryApi } from '@backstage/core';

export interface KubecostApi {}

export const kubecostApiRef = createApiRef<KubecostApi>({
  id: 'plugin.kubecost.service',
  description: 'Used by the Kubecost plugin to make requests',
});

export type Options = {
  discoveryApi: DiscoveryApi;
  proxyPath?: string;
};

export class KubecostApiClient implements KubecostApi {
  // @ts-ignore
  private readonly discoveryApi: DiscoveryApi;

  constructor(options: Options) {
    this.discoveryApi = options.discoveryApi;
  }
}
