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
      loader: true,
      dragId: '',
      componentOrder: [
        {
          component: 'piechart',
          order: "1"
        }, {
          component: 'linechart',
          order: "2"
        }, {
          component: 'barchart',
          order: "3"
        }, {
          component: 'comparechart',
          order: "4"
        }, {
          component: 'gridchart',
          order: "5"
        }
      ]
    };
  }

  componentDidMount() {
    axios.get('https://api.covid19india.org/data.json').then(stateData => {
      this.setState({
        totalDayWiseCase: stateData.data.cases_time_series,
        totalStateWiseCase: stateData.data.statewise,
        loader: false
      })
      this.removeChart()
    })
  }

  removeChart() {
    if (document.querySelector('.graphes-wrapper')) {
      let chartItems = document.querySelector('.graphes-wrapper')
      chartItems && chartItems.addEventListener('click', function (e) {
        if (e.target.className === 'title-close') {
          e.target.closest('.chart-item').remove()
        }
      })
    }
  }

  handleDrag(ev) {
    this.setState({
      dragId: ev.currentTarget.id
    })
  };

  handleDrop(ev) {
    const dragBox = this.state.componentOrder.find(widget => widget.component === this.state.dragId);
    const dropBox = this.state.componentOrder.find(widget => widget.component === ev.currentTarget.id);
    const dragBoxOrder = dragBox.order;
    const dropBoxOrder = dropBox.order;
    const newBoxState = this.state.componentOrder.map(widget => {
      if (widget.component === this.state.dragId) {
        widget.order = dropBoxOrder;
      }
      if (widget.component === ev.currentTarget.id) {
        widget.order = dragBoxOrder;
      }
      return widget;
    });
    this.setState({ setBoxes: newBoxState })
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
            {this.state.componentOrder.sort((a, b) => a.order - b.order).map((item, index) => {
              if (item.component === 'piechart') return <PieChart totalStateWiseCase={this.state.totalStateWiseCase} order={item.component} key={index} handleDrag={(e) => this.handleDrag(e)} handleDrop={(e) => this.handleDrop(e)} />
              if (item.component === 'linechart') return <LineChart totalDayWiseCase={this.state.totalDayWiseCase} order={item.component} key={index} handleDrag={(e) => this.handleDrag(e)} handleDrop={(e) => this.handleDrop(e)} />
              if (item.component === 'barchart') return <BarChart totalDayWiseCase={this.state.totalDayWiseCase} order={item.component} key={index} handleDrag={(e) => this.handleDrag(e)} handleDrop={(e) => this.handleDrop(e)} />
              if (item.component === 'comparechart') return <CompareGraph totalStateWiseCase={this.state.totalStateWiseCase} order={item.component} key={index} handleDrag={(e) => this.handleDrag(e)} handleDrop={(e) => this.handleDrop(e)} />
              if (item.component === 'gridchart') return <GridReports totalStateWiseCase={this.state.totalStateWiseCase} order={item.component} key={index} handleDrag={(e) => this.handleDrag(e)} handleDrop={(e) => this.handleDrop(e)} />
            })}
          </div>
        </Fragment>
    );
  }
}

export default App;
