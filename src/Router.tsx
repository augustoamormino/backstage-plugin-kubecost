/*
 * Copyright 2020 RoadieHQ
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Entity } from '@backstage/catalog-model';
import { MissingAnnotationEmptyState } from '@backstage/core';
import React from 'react';
import { Route, Routes } from 'react-router';
import { KubecostDashboardPage } from './components/KubecostDashboardPage';
import { KUBECOST_ANNOTATION_DEPLOYMENT_NAME } from './components/useKubecostAppData';
import { isKubecostDashboardAvailable } from './plugin';

export const Router = ({ entity }: { entity: Entity }) =>
  !isKubecostDashboardAvailable(entity) ? (

    <MissingAnnotationEmptyState annotation={KUBECOST_ANNOTATION_DEPLOYMENT_NAME} />
  ) : (
    <Routes>
      <Route path="/" element={<KubecostDashboardPage entity={entity} />} />
    </Routes>
  );
