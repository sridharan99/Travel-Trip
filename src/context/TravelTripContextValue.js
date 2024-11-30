import React from 'react'

const TravelTripContext = React.createContext({
  myTripsList: [],
  addTripList: () => {},
})

export default TravelTripContext
