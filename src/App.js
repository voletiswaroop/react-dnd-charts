import React, { Component, Fragment } from 'react';
import './App.css';
import axios from 'axios'
import PieChart from './components/pieChart'
import LineChart from './components/lineChart'
import BarChart from './components/barChart'
import CompareGraph from './components/compareGraph'
import GridReports from './components/gridReports'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalDayWiseCase: '',
      totalStateWiseCase: '',
      loader: true
    };
  }
  componentDidMount() {
    axios.get('https://api.covid19india.org/data.json').then(stateData => {
      this.setState({
        totalDayWiseCase: stateData.data.cases_time_series,
        totalStateWiseCase: stateData.data.statewise,
        loader: false
      })
    })
  }
  render() {
    return (
      this.state.loader ?
        <div className="loader">
          <p> Loading ReactCharts webapp....</p>
          <div className="rect1"></div>
          <div className="rect2"></div>
          <div className="rect3"></div>
          <div className="rect4"></div>
          <div className="rect5"></div>
        </div> :
        <Fragment>
          <h1>Charts Dashboard</h1>
          <div className="graphes-wrapper">
            <PieChart totalStateWiseCase={this.state.totalStateWiseCase} />
            <LineChart totalDayWiseCase={this.state.totalDayWiseCase} />
            <BarChart totalDayWiseCase={this.state.totalDayWiseCase} />
            <CompareGraph totalStateWiseCase={this.state.totalStateWiseCase} />
            <GridReports totalStateWiseCase={this.state.totalStateWiseCase} />
          </div>
        </Fragment>
    );
  }
}

export default App;
