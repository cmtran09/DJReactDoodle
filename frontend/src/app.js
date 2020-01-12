import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Canvas from './components/Canvas'
import Test from './components/test'
import './CSS/main.css'


const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/draw' component={Canvas} />
      <Route exact path='/test' component={Test} />
    </Switch>
  </BrowserRouter>
)

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

