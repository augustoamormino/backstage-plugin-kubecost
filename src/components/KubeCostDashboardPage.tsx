import React from 'react';
import { Entity } from '@backstage/catalog-model';
import { InfoCard } from '@backstage/core';
import { useKubeCostAppData } from './useKubeCostAppData';
import { Resizable } from 're-resizable';
import ZoomOutMapIcon from '@material-ui/icons/ZoomOutMap';


export const KubeCostDashboardPage  = ({ entity }: { entity: Entity }) => {
    const { url } = useKubeCostAppData({ entity });
    return (
      <InfoCard title="Datadog dashboard">
        <Resizable
          defaultSize={{
            width: '100%',
            height: 500,
          }}
          handleComponent={{ bottomRight: <ZoomOutMapIcon /> }}
        >
          <iframe
            title="dashboard"
            src={`${url}`}
            style={{
              border: 'none',
              height: '100%',
              width: '100%',
              resize: 'both',
              overflow: 'auto',
            }}
          />
        </Resizable>
      </InfoCard>
    );
  };