export const init = () => ({
  type: 'INIT',
})

export const addMeasurement = (datapoint) => ({
  type: 'ADD_MEASUREMENT',
  datapoint: datapoint
})