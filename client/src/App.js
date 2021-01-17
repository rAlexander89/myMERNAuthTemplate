import React, { Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './components/layout/navbar'
import Landing from './components/layout/landing'
import Login from './components/auth/login'
import Register from './components/auth/register'
import Alert from './components/layout/alert'
import './App.css';

//Redux
import { Provider } from 'react-redux' // connects react and redux
import store from './store'

const App = () =>(
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
            </Switch>
          </section>
        </Fragment>
    </Router>
  </Provider>
)


export default App;
