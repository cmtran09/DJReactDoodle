import React, { useState, useEffect } from 'react'
import NavBar from './NavBar'
import Canvas from './Canvas'
import NewCanvas from './NewCanvas'

import axios from 'axios'

import Tada from 'react-reveal/Tada'

const Draw = (props) => {

  const [data, setData] = useState([])
  const [answer, setAnswer] = useState([])
  const [highestId, setHighestId] = useState([])

  useEffect(() => {
    console.log(props.match.params.id)
    // "http://localhost:4000/api/answers/1"
    fetch(`/api/answers/${props.match.params.id}`)
      .then(resp => resp.json())
      .then(resp => {
        setData(resp)
        getAnswer(resp)
      })
    return () => console.log('Unmounting component')
  }, [0])

  function getAnswer(resp) {
    axios.get(`/api/answers/${resp.id}`)
      .then(res => {
        setAnswer(res.data.correct_answer)
        // console.log(res.data.correct_answer)  
      })
  }
  //     axios.get(`/api/answers/${resp.id}`)
  //       .then(res => {
  //         setAnswer(res.data.correct_answer)
  //         console.log(res.data.correct_answer)
  //       })
  //   }

  console.log(data)
  console.log(answer)

  return (
    <React.Fragment>
      <div>
        Draw Pages
            </div>
      <Tada>
        <h1>{answer}</h1>
      </Tada>
      <Canvas correctAnswerId={props} props={props}/>
      {/* TEST */}
      {/* <Canvas correctAnswerId={props} /> */}
      <NewCanvas props={props}/>
    </React.Fragment>

  )
}

export default Draw