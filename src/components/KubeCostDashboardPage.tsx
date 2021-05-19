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
import { InfoCard } from '@backstage/core';
import React from 'react';
import { useKubecostAppData } from './useKubecostAppData';
import { AggregatedCost } from './aggregatedCostModel';
import { Button } from '@material-ui/core';

export const KubecostDashboardPage = ({ entity }: { entity: Entity }) => {
  const { host } = useKubecostAppData({ entity });
  const { deployment } = useKubecostAppData({ entity });

  const url =
    host +
    '/model/aggregatedCostModel?window=7d&aggregation=deployment&labels=app%3D' +
    deployment;
  return (
    <InfoCard
      title="Kubecost dashboard"
      subheader="Pricing does not include discounts. Pricing in USD. last 7 days"
    >
      <AggregatedCost url={url} />
      <div>
        <p>
        <Button size="small" color="primary" href={host + '/overview.html'}>
          Learn More
        </Button>
        </p>
      </div>
    </InfoCard>
  );
};
