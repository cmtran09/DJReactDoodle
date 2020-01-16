import React, { useState, useEffect } from 'react'
import ReactDOM from "react-dom";
import Test from "./test"



const NewCanvas = (props) => {


  const [data, setData] = useState([])
  const [answer, setAnswer] = useState([])
  const [highestId, setHighestId] = useState([])

  function getAnswer(){
      console.log('test getanswer function')
  }
  useEffect(() => {
    console.log(props.match.params.id)
    // "http://localhost:4000/api/answers/1"
    fetch(`/api/answers/`)
      .then(resp => resp.json())
      .then(resp => {
        setData(resp)
        setAnswer(resp)
        getAnswer()
      })
      .then(fetch(`/api/images/`)
      .then(resp => resp.json())
      .then(resp => {
        setHighestId(resp)
      }))
    return () => console.log('Unmounting component')
  }, [0])

  console.log('HIIIIIIIIIIIIIIIIIgest ID',highestId)
  console.log('answer state',highestId)
  console.log('data state',data)
    // console.log(props)
    return (
        <React.Fragment>
            <Test props={props}/>
            <p>hello</p>
        </React.Fragment>


    )
}


export default NewCanvas