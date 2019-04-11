import React, { Component } from 'react';
import './App.css';
import PubNub from 'pubnub';
import Chart from './Chart';

class App extends Component {

  constructor(props) {
    super(props);
    this.pubnub = new PubNub({
          publishKey: 'pub-c-c728d004-7b54-4b04-a93c-1258dac25849',
          subscribeKey: 'sub-c-a9cba9fe-ed7d-11e8-b085-b2b44c5b7fba'
        });


    this.datepub = [[]];

    this.pubnub.history(
            {
          channel : 'iotchannel',
          count : 360
          },
          (function (status, response) {

            for(let i = 0; i < response.messages.length; i++) {
              this.datepub[0][i] = response.messages[i]['entry']['eon']['sensor']; //reading response messages into array
            }


          //  this.datepub[1] = this.datepub[0].slice().reverse();	// reversing second array
            this.datepub[0].unshift('Recycling Data'); // adding label to start of array 0
          //  this.datepub[1].unshift('data2'); // adding label to start of array 1

            this.setState({datepub:this.datepub}); //update datepub

            //console.log(this.datepub);

          }).bind(this)						//binding to present execution context
        );

        this.state = {
          chartType: 'spline',
          datepub: this.datepub,
          pubnub: this.pubnub,
          channel: 'iotchannel'
        };
  }

  _setBarChart = () => {
        console.log("Bar");
        this.setState({ chartType: 'bar' });
    }

    _setLineChart = () => {
        console.log("Line");
        this.setState({ chartType: 'spline' })
    }

  render() {
    return (
      <div className="App">
      <h1>UWE Recycling System</h1>
      <Chart ident="chart1" datepub = {this.state.datepub} pubnub={this.state.pubnub} channel={this.state.channel} chartType={this.state.chartType}/>
      </div>
    );
  }
}





export default App;
