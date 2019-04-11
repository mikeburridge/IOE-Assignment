import React, { Component } from 'react';
import c3 from 'c3';
import '../node_modules/c3/c3.css';

class Chart extends Component {



  componentDidMount() {

    console.log("component did mount", this.props);






  }

  componentDidUpdate() {
    this._updateChart();
  }

  _updateChart() {

    this.chart = c3.generate({
     bindto: '#'+this.props.ident,
     data: {
       columns: this.props.datepub,
       type: this.props.chartType,
       colors: {
           data1: '#CFD8DC',
           data2: '#673AB7'
       }
     }
   });


    this.chart.load({columns: this.props.datepub, type: this.props.chartType});


  }

  render() {
    console.log("render");
    return <div id={this.props.ident}></div>;
  }

}

Chart.defaultProps = {
  chartType: 'spline'
}

export default Chart;
