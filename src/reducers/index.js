// import Heap from '../models/Heap';
// import Queue from '../models/Queue';
// import { customCompareMin, customCompareMax } from '../models/Heap';

import Sensor from '../models/Sensor';


const sensorsArr = ['sensor1', 'sensor2', 'sensor3','sensor4', 'sensor5', 'sensor6','sensor7', 'sensor8', 'sensor9', 'sensor10']

export default (state = {}, action) => {
  switch (action.type) {
    case 'INIT': {
      let sensors = {}
      for(let sensor of sensorsArr) {
        sensors[sensor] = new Sensor(2000);
      }
      return sensors;
    }
    case 'ADD_MEASUREMENT': {
      const keys = Object.keys(state);

      // add new incoming timestamped device data to existing measurements
      // never really gonna happen, since we set them by default in the INIT action above
      if (keys.length === 0) {
        for (const key in action.sensors) {
          // unimplemented for now
        }
      } else {
        for(let key in action.datapoint) {
          if(Object.keys(state).indexOf(key) > -1) {
            state[key].add(action.datapoint[key])
          } else {
            // unimplemented for now
          }
        }
      }
      // since we're mutating the state we need to return a copy for redux to pickup
      return { ... state }; 
    }
    default:
      return state
  }
}