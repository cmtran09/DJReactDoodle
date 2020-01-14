import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './CSS/main.css'

import Canvas from './components/Canvas'
import Test from './components/test'
import Login from './components/Login'
import Register from './components/Register'
import Guess from './components/Guess'

const App = () => (
  // <Canvas />
  <BrowserRouter>
    <Switch>
      <Route exact path='/draw' component={Canvas} />
      <Route exact path='/test' component={Test} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/register' component={Register} />
      <Route exact path='/guess/:id' component={Guess} />
    </Switch>
  </BrowserRouter>
)

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

