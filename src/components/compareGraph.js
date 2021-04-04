import React, { Component } from 'react';
import CanvasJSReact from './canvasjs.react';
let CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class coronaReportStateGraph extends Component {

  render() {
    let totalCases = []
    this.props.totalStateWiseCase && this.props.totalStateWiseCase.slice(0, 1).map((item, index) => {
      console.log(item, 'item');
      let confirmCases = parseInt(item.confirmed),
        recoveredCases = parseInt(item.recovered),
        activeCases = parseInt(item.active)

      totalCases.push({
        label: 'Confirm Cases',
        y: parseInt(confirmCases)
      }, {
        label: 'Recovered Cases',
        y: parseInt(recoveredCases)
      }, {
        label: 'Active Cases',
        y: parseInt(activeCases)
      })
      return null;
    })
    const options = {
      animationEnabled: true, theme: "light2",
      axisY: {
        title: "",
        scaleBreaks: {
          autoCalculate: true
        }
      },
      axisX: {
        title: "",
        labelAngle: 0
      },
      data: [{
        type: "column",
        dataPoints: totalCases
      }]
    }

    console.log(totalCases, 'totalCases');
    return (
      <React.Fragment>
        <div className="chart-item">
          <div className="tile-container">
            <div className="tile-header">Reports</div>
            <div className="title-close" title="Close Tile"> </div>
          </div>
          <CanvasJSChart options={options}
            onRef={ref => this.chart = ref}
          />
        </div>
      </React.Fragment >
    );
  }
}
