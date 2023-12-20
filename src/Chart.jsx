import React from 'react';
import { render } from 'react-dom';
// Import Highcharts
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import SankeyModule from 'highcharts/modules/sankey';

// Register the Sankey module
SankeyModule(Highcharts);


Highcharts.wrap(
  Highcharts.seriesTypes.sankey.prototype,
  'pointAttribs',
  function (proceed, point, state) {
    if (!point) {
      return {};
    }
    const series = this,
      level = point.isNode ? point.level : point.fromNode.level,
      levelOptions = series.mapOptionsToLevel[level || 0] || {},
      options = point.options,
      stateOptions =
        (levelOptions.states && levelOptions.states[state || '']) || {},
      values = [
        'colorByPoint',
        'borderColor',
        'borderWidth',
        'linkOpacity',
        'opacity',
      ].reduce((obj, key) => {
        obj[key] = Highcharts.pick(
          stateOptions[key],
          options[key],
          levelOptions[key],
          series.options[key]
        );
        return obj;
      }, {}),
      color = Highcharts.pick(
        stateOptions.color,
        options.color,
        values.colorByPoint ? point.color : levelOptions.color
      );

    // Node attributes
    if (point.isNode) {
      return {
        fill: color,
        stroke: values.borderColor,
        'stroke-width': values.borderWidth,
        opacity: values.opacity,
      };
    }

    // Link attributes
    return {
      fill: Highcharts.Color.parse(color).setOpacity(values.linkOpacity).get(),
    };
  }
);

export default function Chart({data}) {
  const options = {
    chart: {
      //height: 520,
      events: {
        load() {
          const chart = this;

          let leftLabelsWidths = [],
            rightLabelsWidths = [];

          chart.series[0].nodes.forEach((node) => {
            if (node.level === 0) {
              leftLabelsWidths.push(node.dataLabel.width);
            } else {
              rightLabelsWidths.push(node.dataLabel.width);
            }
          });

          const maxLeftLabelWidth = Math.max(...leftLabelsWidths);
          const maxRightLabelWidth = Math.max(...rightLabelsWidths);

          chart.update(
            {
              chart: {
                spacingLeft: maxLeftLabelWidth + 5,
                spacingRight: maxRightLabelWidth + 5,
              },
            },
            true,
            true,
            false
          );

          chart.series[0].nodes.forEach((node) => {
            const isLeftLabel = node.level === 0,
              dataLabel = node.dataLabel,
              labelWidth = dataLabel.width,
              formattedLabelWidth = labelWidth + 5;

            dataLabel.attr({
              x:
                dataLabel.x +
                (isLeftLabel ? -formattedLabelWidth : formattedLabelWidth),
            });
          });
        },
      },
    },
    tooltip: {
      headerFormat: '',
    },
    title: {
      text: '',
      enabled: false,
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