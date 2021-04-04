import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import PieChart from './components/pieChart'
import LineChart from './components/lineChart'
import BarChart from './components/barChart'
import GridReports from './components/gridReports'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalDayWiseCase: '',
      totalStateWiseCase: ''
    };
  }
  componentDidMount() {
    axios.get('https://api.covid19india.org/data.json').then(stateData => {
      this.setState({
        totalDayWiseCase: stateData.data.cases_time_series,
        totalStateWiseCase: stateData.data.statewise
      })
    })
  }
  render() {
    return (
      <div className="graphes-wrapper">
        <PieChart totalStateWiseCase={this.state.totalStateWiseCase} />
        <LineChart totalDayWiseCase={this.state.totalDayWiseCase} />
        <BarChart totalDayWiseCase={this.state.totalDayWiseCase} />
        <GridReports totalStateWiseCase={this.state.totalStateWiseCase} />
      </div>
    );
  }
}

export default App;
