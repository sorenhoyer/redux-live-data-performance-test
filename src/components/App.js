import React from 'react';
import { connect } from 'react-redux'
import { addDatapoint } from '../actions';
import Chart from './Chart';
import {cloneDeep} from 'lodash';

const sensors = ['sensor1', 'sensor2', 'sensor3','sensor4', 'sensor5', 'sensor6','sensor7', 'sensor8', 'sensor9', 'sensor10']

const mapStateToProps = (state) => ({
  datapoints: state
})

export default connect(mapStateToProps)(class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    const {dispatch} = this.props;

    setInterval(function(){ 
      let out = {};
      const x = + new Date()  // unix timestamp
      for(let sensor of sensors){
        const y = Math.floor(Math.random() * 10000) + 1  
        const m = {x: x, y: y}
        out[sensor] = m;
      }
      
      dispatch(addDatapoint(out))
    }, 1000);
  }
  render(){
    const datapoints = this.props.datapoints ? cloneDeep(this.props.datapoints) : {};

    const plotOptions = {
      series: {
        turboThreshold: 10000,
        marker: {
          enabled: false
        }
      }
    };

    return (
      <div>
        <p>count: {datapoints['sensor1'] && datapoints['sensor1'].length}</p>
        {datapoints && Object.keys(datapoints) && Object.keys(datapoints).filter(key=>key ==='sensor1').map(key =>
          <Chart
            key={key}
            chartKey={key}
            title={key}
            subtitle=''
            xAxisTitle='Time'
            yAxisTitle='Level'
            data={datapoints[key]} // maybe use env to set cycles differently for node / production for increased performance
            overlayCharts={[]}
            plotOptions={plotOptions}
          />
        )}
      </div>
    )
  }
})