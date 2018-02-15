import Sensor from '../models/Sensor';

export default (state = {}, action) => {
  switch (action.type) {
    case 'INIT': {
      const sensorsArr = ['sensor1', 'sensor2', 'sensor3','sensor4', 'sensor5', 'sensor6','sensor7', 'sensor8', 'sensor9', 'sensor10']
      let sensors = {}
      for(let sensor of sensorsArr) {
        sensors[sensor] = new Sensor(2000);
      }
      return sensors;
    }
    case 'ADD_MEASUREMENT': {
      const keys = Object.keys(state);

      if (keys.length === 0) { // never really gonna happen, since we already set them by default in the INIT action above
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