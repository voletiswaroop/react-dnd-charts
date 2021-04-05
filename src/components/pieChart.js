import React, { Component } from 'react';
import CanvasJSReact from '../helper/canvasjs.react';
let CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class differentGraphes extends Component {

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
			<div className="chart-item" onDragOver={(ev) => ev.preventDefault()} draggable={true} id={this.props.order} onDragStart={this.props.handleDrag} onDrop={this.props.handleDrop}>
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

