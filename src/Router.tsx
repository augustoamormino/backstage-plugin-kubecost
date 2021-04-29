import { Entity } from '@backstage/catalog-model';
import { MissingAnnotationEmptyState } from '@backstage/core';
import React from 'react';
import { Route, Routes } from 'react-router';
import { KubeCostDashboardPage } from './components/KubeCostDashboardPage';
import { KUBECOST_ANNOTATION_URL } from './components/useKubeCostAppData';
import { isKubeCostAvailable } from './plugin';

/**
 * @deprecated since v0.2.0 you should use new composability API
 */
export const Router = ({ entity }: { entity: Entity }) =>
  !isKubeCostAvailable(entity) ? (
    <MissingAnnotationEmptyState
      annotation={KUBECOST_ANNOTATION_URL}
    />
  ) : (
    <Routes>
      <Route path="/" element={<KubeCostDashboardPage entity={entity} />} />
    </Routes>
  );