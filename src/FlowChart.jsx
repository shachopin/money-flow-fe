import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import SankeyModule from 'highcharts/modules/sankey';

// Register the Sankey module
SankeyModule(Highcharts);

export default function FlowChart({data, titleEnabled=false, titleText=''}) {
  const options = {
    chart: {
      width: 1000,
      //height: 520,
    },
    tooltip: {
      headerFormat: '',
    },
    title: {
      text: titleText,
      enabled: titleEnabled,
    },
    legend: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },
    series: [
      {
        type: 'sankey',
        data
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
}