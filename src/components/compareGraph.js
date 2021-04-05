import React, { Component } from 'react';
import CanvasJSReact from '../helper/canvasjs.react';
let CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class coronaReportStateGraph extends Component {

  render() {
    let totalCases = []
    this.props.totalStateWiseCase && this.props.totalStateWiseCase.slice(0, 1).map((item, index) => {
      let confirmCases = parseInt(item.confirmed, 10),
        recoveredCases = parseInt(item.recovered, 10),
        activeCases = parseInt(item.active, 10)

      totalCases.push({
        label: 'Confirm Cases',
        y: parseInt(confirmCases, 10)
      }, {
        label: 'Recovered Cases',
        y: parseInt(recoveredCases, 10)
      }, {
        label: 'Active Cases',
        y: parseInt(activeCases, 10)
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

    return (
      <div className="chart-item" onDragOver={(ev) => ev.preventDefault()} draggable={true} id={this.props.order} onDragStart={this.props.handleDrag} onDrop={this.props.handleDrop}>
        <div className="tile-container">
          <div className="tile-header">Reports</div>
          <div className="title-close" title="Close Tile"> </div>
        </div>
        <CanvasJSChart options={options}
          onRef={ref => this.chart = ref}
        />
      </div>
    );
  }
}
