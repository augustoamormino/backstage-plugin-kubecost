import React from 'react';
import DataTable from 'react-data-table-component';
import ReactSpeedometer from 'react-d3-speedometer';

class AggregatedCost extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }
  state = {
    key: null,
    ramCost: null,
    cpuCost: null,
    networkCost: null,
    pvCost: null,
    gpuCost: null,
    totalCost: null,
    efficiency: 0,
  };

  async componentDidMount() {
    const response = await fetch(this.props.url).then(res => res.json());
    const key = Object.keys(response.data)[0];
    const cost: CostAnalyzer = response.data[key];
    const ramCost = '$ ' + Math.round(cost.ramCost * 100) / 100;
    const cpuCost = '$ ' + Math.round(cost.cpuCost * 100) / 100;
    const networkCost = '$ ' + Math.round(cost.networkCost * 100) / 100;
    const pvCost = '$ ' + Math.round(cost.pvCost * 100) / 100;
    const gpuCost = '$ ' + Math.round(cost.gpuCost * 100) / 100;
    const totalCost = '$ ' + Math.round(cost.totalCost * 100) / 100;
    const efficiency = Math.round(cost.efficiency * 10 * 100) / 100;

    this.setState({
      ramCost,
      cpuCost,
      networkCost,
      pvCost,
      gpuCost,
      totalCost,
      efficiency,
    });
  }

  render() {
    if (this.props.speedo == 'true') {
      const { efficiency } = this.state;
      return (
        <ReactSpeedometer
          value={efficiency}
          maxValue={100}
          needleColor="steelblue"
          needleTransitionDuration={4000}
          currentValueText="efficiency"
        />
      );
    } else {
      const {
        cpuCost,
        ramCost,
        networkCost,
        pvCost,
        gpuCost,
        totalCost,
      } = this.state;

      const columns = [
        {
          name: 'CPU Cost',
          selector: 'cpu',
        },
        {
          name: 'Mem Cost',
          selector: 'ram',
        },
        {
          name: 'Network Cost',
          selector: 'network',
        },
        {
          name: 'PV Cost',
          selector: 'pv',
        },
        {
          name: 'GPU Cost',
          selector: 'gpu',
        },
        {
          name: 'Total Cost',
          selector: 'total',
        },
      ];

      const data = [
        {
          cpu: cpuCost,
          ram: ramCost,
          network: networkCost,
          pv: pvCost,
          gpu: gpuCost,
          total: totalCost,
        },
      ];
      return (
        <div>
          <DataTable title="Deployment Cost" columns={columns} data={data} />
        </div>
      );
    }
  }
}

export { AggregatedCost };

interface CostAnalyzer {
  aggregation: string;
  environment: string;
  cpuAllocationAverage: number;
  cpuCost: number;
  cpuEfficiency: number;
  efficiency: number;
  gpuAllocationAverage: number;
  gpuCost: number;
  ramAllocationAverage: number;
  ramCost: number;
  ramEfficiency: number;
  pvAllocationAverage: number;
  pvCost: number;
  networkCost: number;
  sharedCost: number;
  totalCost: number;
}
