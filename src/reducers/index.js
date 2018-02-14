export default (state = {}, action) => {
  switch (action.type) {
    case 'ADD_DATAPOINT': {
      
      let returnValue = state;
      const keys = Object.keys(state);
      // add new incoming timestamped device data to existing measurements
      if (keys.length === 0) {
        let temp = {}
        for (const key in action.datapoint) {
          temp[key] = [action.datapoint[key]];
        }
        returnValue = {
          state,
          ... temp,
        }
      } else {
        
        const keys = Object.keys(action.datapoint);
        for (const key of keys) {
          
          if(Object.keys(state).indexOf(key) > -1){
            let oldState = {...state};
            oldState[key].push(action.datapoint[key]);
            returnValue = oldState;
          } else {
            let newObj = {};
            newObj[key] = [action.datapoint[key]];
            
            returnValue = {
              state,
              ...newObj,
            }
          }
        }
    
        // remove first measurement from array when limit is reached
        // const first = keys[0];
        // if(self.datapoints.get(first).length >= self.datapointsCount) {
        //   for (const k of self.datapoints.keys()) {
        //     self.datapoints.set(k, self.datapoints.get(k).slice(-self.datapointsCount));
        //   }
        // }
      }
      
      return returnValue;
    }
    case 'REMOVE_DATAPOINT':
      return state
    default:
      return state
  }
}