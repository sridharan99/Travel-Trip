import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'

import Home from './components/Home'
import Login from './components/Login'
import BookNewTrip from './components/BookNewTrip'
import MyTrips from './components/MyTrips'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

import TravelTripContextValue from './context/TravelTripContextValue'

import './App.css'

class App extends Component {
  state = {
    myTripsList: [],
  }

  addTripList = tripsDetails => {
    this.setState(prevState => ({
      myTripsList: [...prevState.myTripsList, tripsDetails],
    }))
  }

  render() {
    const {myTripsList} = this.state
    return (
      <TravelTripContextValue.Provider
        value={{
          myTripsList,
          addTripList: this.addTripList,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute
            exact
            path="/book-a-new-trip"
            component={BookNewTrip}
          />
          <ProtectedRoute exact path="/my-trips" component={MyTrips} />
          <Route component={NotFound} />
        </Switch>
      </TravelTripContextValue.Provider>
    )
  }
}

export default App
