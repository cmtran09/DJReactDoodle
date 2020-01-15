import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
// import './CSS/main.css'

import Canvas from './components/Canvas'
import Test from './components/test'
import Login from './components/Login'
import Register from './components/Register'
// import NewCanvas from './components/NewCanvas'
import NavBar from './components/NavBar'
import Draw from './components/Draw'
import StartPage from './components/StartPage'
import Guess from './components/Guess'

const App = () => (
  // <Canvas />
  <BrowserRouter>
    <Navbar />
    <Switch>
      <Route exact path='/start' component={StartPage} />
      {/* <Route exact path='/draw2' component={NewCanvas} /> */}
      <Route exact path='/draw1' component={Canvas} />
      <Route exact path='/test' component={Test} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/register' component={Register} />
      <Route exact path='/draw/:id' component={Draw} />
      <Route exact path='/guess/:id' component={Guess} />
    </Switch>
  </BrowserRouter>
)

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

