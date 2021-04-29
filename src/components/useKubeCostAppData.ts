import { Entity } from '@backstage/catalog-model';

export const KUBECOST_ANNOTATION_URL = 'kubecost.com/url'

export const useKubeCostAppData =  ({ entity }: { entity: Entity }) => {
 const url = 
 entity?.metadata.annotations?.[KUBECOST_ANNOTATION_URL] ?? '';

 if (!url) {
    throw new Error("'kubecost' annotation is missing");
 }
return { url }
};