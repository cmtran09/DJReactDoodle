import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import CanvasDraw from 'react-canvas-draw'
import Canvas from './components/canvas'


function App() {
  return <Canvas />
  
}

export default App

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

