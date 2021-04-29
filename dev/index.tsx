import { createDevApp } from '@backstage/dev-utils';
import { KubeCostPlugin } from '../src/plugin';

createDevApp().registerPlugin(KubeCostPlugin).render();