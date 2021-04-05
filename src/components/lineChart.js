import React, { Component } from 'react';
import CanvasJSReact from '../helper/canvasjs.react';
let CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class lineChart extends Component {

	render() {
		let dayWiseConfirm = [], dayWiseRecovered = [], requiredCases = this.props.totalDayWiseCase.length

		this.props.totalDayWiseCase && this.props.totalDayWiseCase.slice(requiredCases - 20, requiredCases).map(item => {
			dayWiseConfirm.push({
				y: parseInt(item.dailyconfirmed, 10),
				label: item.date
			})
			dayWiseRecovered.push({
				y: parseInt(item.dailyrecovered, 10),
				label: item.date
			})
			return null;
		})

		const lineChart = {
			animationEnabled: true,
			title: {
				text: " ",
			},
			legend: {
				verticalAlign: "top",
				fontFamily: "sans-serif"
			},
			data: [{
				type: "spline",
				name: "Confirmed cases",
				showInLegend: true,
				dataPoints: dayWiseConfirm,
				fontFamily: "sans-serif"
			}, {
				type: "spline",
				name: "Recovered cases",
				showInLegend: true,
				dataPoints: dayWiseRecovered,
				fontFamily: "sans-serif"
			}]
		}
		return (
			<div className="chart-item" onDragOver={(ev) => ev.preventDefault()} draggable={true} id={this.props.order} onDragStart={this.props.handleDrag} onDrop={this.props.handleDrop}>
				<div className="tile-container">
					<div className="tile-header">Conf vs Recov cases</div>
					<div className="title-close" title="Close Tile"> </div>
				</div>
				<CanvasJSChart options={lineChart}
					onRef={ref => this.chart = ref}
				/>
			</div>
		);
	}
}
