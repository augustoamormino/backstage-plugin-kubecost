import { createDevApp } from '@backstage/dev-utils';
import { kubecostPlugin } from '../src/plugin';

createDevApp().registerPlugin(kubecostPlugin).render();
