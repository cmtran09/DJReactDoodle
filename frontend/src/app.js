import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './CSS/main.css'

import Canvas from './components/Canvas'
import Test from './components/test'
import Login from './components/Login'
import Register from './components/Register'
import Guess from './components/Guess'
import Drawings from './components/Drawings'
import Profile from './components/Profile'
import StartPage from './components/StartPage'
// import Draw from './components/Draw'

const App = () => (
  // <Canvas />
  <BrowserRouter>
    <Switch>
      <Route exact path='/guess/:id' component={Guess} />
      <Route exact path='/draw' component={Canvas} />
      <Route exact path='/test' component={Test} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/register' component={Register} />
      <Route exact path='/drawings' component={Drawings} />
      <Route exact path='/profile' component={Profile} />
      {/* <Route exact path='/draw/:id' component={Draw} /> */}
      <Route exact path='/start' component={StartPage} />
    </Switch>
  </BrowserRouter>
)

{/* <Route exact path='/draw2' component={NewCanvas} /> */ }
{/* <Route exact path='/draw1' component={Canvas} />
<Route exact path='/test' component={Test} />
<Route exact path='/login' component={Login} />
<Route exact path='/register' component={Register} />
<Route exact path='/guess/:id' component={Guess} /> */}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

