import React, { Component } from 'react';
import CanvasJSReact from './canvasjs.react';
let CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class lineChart extends Component {
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
				fontFamily: "GothamHTF"
			},
			data: [{
				type: "spline",
				name: "Confirmed cases",
				showInLegend: true,
				dataPoints: dayWiseConfirm
			}, {
				type: "spline",
				name: "Recovered cases",
				showInLegend: true,
				dataPoints: dayWiseRecovered
			}]
		}
		return (
			<div className="chart-item">
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
