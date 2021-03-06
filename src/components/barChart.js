import React, { Component } from 'react';
import CanvasJSReact from '../helper/canvasjs.react';
let CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class barChart extends Component {

	render() {
		let dayWiseConfirm = [], requiredCases = this.props.totalDayWiseCase.length

		this.props.totalDayWiseCase && this.props.totalDayWiseCase.slice(requiredCases - 20, requiredCases).map(item => {
			dayWiseConfirm.push({
				y: parseInt(item.dailyconfirmed, 10),
				label: item.date
			})
			return null;
		})

		const barChart = {
			animationEnabled: true,
			title: {
				text: "",
			},
			legend: {
				verticalAlign: "top",
				fontFamily: "sans-serif"
			},
			data: [{
				type: "bar",
				name: "Confirmed cases",
				showInLegend: true,
				dataPoints: dayWiseConfirm
			}]
		}
		return (
			<div className="chart-item" onDragOver={(ev) => ev.preventDefault()} draggable={true} id={this.props.order} onDragStart={this.props.handleDrag} onDrop={this.props.handleDrop}>
				<div className="tile-container">
					<div className="tile-header">Confirmed cases</div>
					<div className="title-close" title="Close Tile"> </div>
				</div>
				<CanvasJSChart options={barChart}
					onRef={ref => this.chart = ref}
				/>
			</div>
		)
	}
}
