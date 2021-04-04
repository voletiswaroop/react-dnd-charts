import React, { Component } from "react";

export default class gridReports extends Component {

  render() {
    let coronaData = this.props.totalStateWiseCase && this.props.totalStateWiseCase.slice(1, 15).map((item, index) => {
      return (
        <div className="corona-cases-statewise" key={index}>
          <p className="corona-cases-statename" onClick={(e) => this.showCitiwiseDetails(e)}>{item.state === 'Total' ? 'India' : item.state}</p>
          <div>
            <p className="corona-cases-confirmed">{parseInt(item.confirmed, 10).toLocaleString()}</p>
            <p className="corona-cases-recovered">{parseInt(item.recovered, 10).toLocaleString()} </p>
            <p className="corona-cases-deceased">{parseInt(item.deaths, 10).toLocaleString()} </p>
          </div>
        </div>
      )
    })
    return (
      <div className="corona-wrapper chart-item double-flex">
        <div className="tile-container">
          <div className="tile-header">Statewise covid report</div>
          <div className="title-close" title="Close Tile"> </div>
        </div>
        <div className="corona-cases-statewise corona-items-heading">
          <p className="corona-cases-statename">State</p>
          <div>
            <p className="corona-cases-confirmed">Confirmed</p>
            <p className="corona-cases-recovered">Recovered</p>
            <p className="corona-cases-deceased">Deceased</p>
          </div>
        </div>
        {coronaData}
      </div>
    )
  }
}
