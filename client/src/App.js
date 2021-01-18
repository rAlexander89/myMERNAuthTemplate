import React, { Fragment, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './components/layout/navbar'
import Landing from './components/layout/landing'
import Login from './components/auth/login'
import Register from './components/auth/register'
import Alert from './components/layout/alert'
import Dashboard from './components/dashboard/dashboard'
import CreateProfile from './components/profile-form/create_profile'
import PrivateRoute from './components/routing/private_route'

import './App.css';

//Redux
import { Provider } from 'react-redux' // connects react and redux
import store from './store'
import setAuthToken from './utils/setAuthToken'
import { loadUser } from './actions/auth'


if (localStorage.token){
  setAuthToken(localStorage.token)
}

const App = () => {

  useEffect(() => { //similar to componentDidMount
    store.dispatch(loadUser())
  }, [])

  return(
  <Provider store={store}>
    <Router>
        <Fragment>
          <Navbar/>
          <Route exact path='/' component={Landing}/>
          <section className='container'>
            <Alert/>
            <Switch>
              <Route exact path='/register' component={Register}/> 
              <Route exact path='/login' component={Login}/> 
              <PrivateRoute exact path='/dashboard' component={Dashboard}/> 
              <PrivateRoute exact path='/create-profile' component={CreateProfile}/> 
            </Switch>
          </section>
        </Fragment>
    </Router>
  </Provider>
)}


export default App;
