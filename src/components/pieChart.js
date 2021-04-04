import React, { Component } from 'react';
import CanvasJSReact from './canvasjs.react';
let CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class differentGraphes extends Component {
	constructor() {
		super();
		this.toggleDataSeries = this.toggleDataSeries.bind(this);
	}

	toggleDataSeries(e) {
		if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
			e.dataSeries.visible = false;
		}
		else {
			e.dataSeries.visible = true;
		}
		this.chart.render();
	}

	render() {
		let dataPointsStateActive = []
		this.props.totalStateWiseCase && this.props.totalStateWiseCase.slice(1, 6).map(itemdata => {
			dataPointsStateActive.push({
				y: parseInt(itemdata.confirmed, 10),
				label: itemdata.state
			})
			return null;
		})


		const pieChart = {
			exportEnabled: true,
			animationEnabled: true,
			title: {
				text: "",
			},
			data: [{
				type: "doughnut",
				startAngle: 75,
				toolTipContent: "<b>{label}</b>: {y}",
				showInLegend: "true",
				legendText: "{label}",
				indexLabelFontSize: 16,
				indexLabel: "{label} - {y}",
				dataPoints: dataPointsStateActive
			}]
		}
		return (
			<div className="chart-item">
				<div className="tile-container">
					<div className="tile-header">Top 10 COVID19 States</div>
					<div className="title-close" title="Close Tile"> </div>
				</div>
				<CanvasJSChart options={pieChart}
					onRef={ref => this.chart = ref}
				/>
			</div>
		);
	}
}
