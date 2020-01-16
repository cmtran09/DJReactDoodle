import React, { useState, useEffect } from 'react'
import NavBar from './NavBar'
import Canvas from './Canvas'
import NewCanvas from './NewCanvas'
import Auth from '../lib/auth'

import axios from 'axios'

import Tada from 'react-reveal/Tada'

const Draw = (props) => {

  const [data, setData] = useState([])
  const [answer, setAnswer] = useState([])
  const [highestId, setHighestId] = useState([])
  const [doRefresh, setDoRefresh] = useState(false)
  const [hideSubmit, setHideSubmit] = useState(false)
  const [hideNext, setHideNext] = useState(true)
  // console.log('Answer ID from props', props.match.params.id)
  // const [highestId, setHighestId] = useState([])

  console.log(typeof(highestId))

  const route = `/draw/${parseInt(props.match.params.id) + 1}`

  useEffect(() => {
    console.log(props.match.params.id)
    // "http://localhost:4000/api/answers/1"
    fetch(`/api/answers/${props.match.params.id}`)
      .then(resp => resp.json())
      .then(resp => {
        setData(resp)
        getAnswer(resp)
      })
      .then(fetch(`/api/images/`)
        .then(resp => resp.json())
        .then(resp => {
          setHighestId(resp)
        })
      )
    return () => console.log('Unmounting component')
  }, [0])

  function getAnswer(resp) {
    axios.get(`/api/answers/${resp.id}`)
      .then(res => {
        setAnswer(res.data.correct_answer)
        // console.log(res.data.correct_answer)  
      })
  }

  console.log('highest ID', highestId.length)

  var canvas = document.querySelector('canvas'),
    ctx = canvas.getContext('2d'),
    mouseX = 0,
    mouseY = 0,
    width = 1000,
    height = 600,
    colour = "#6b76ff",
    mousedown = false,
    lineWidth = 5

  const colorPicker = document.querySelector('.js-color-picker');

  colorPicker.addEventListener('change', event => {
    colour = event.target.value;
  });

  const lineWidthRange = document.querySelector('.js-line-range');
  const lineWidthLabel = document.querySelector('.js-range-value');

  lineWidthRange.addEventListener('input', event => {
    const width = event.target.value;
    lineWidthLabel.innerHTML = width;
    lineWidth = width;
  });

  canvas.classList.remove('noShow')
  // label.classList.remove('noShow')
  // input.classList.remove('noShow')

  console.log(canvas)

  // console.log('correctAnswerId', correctAnswerId)

  canvas.width = width
  canvas.height = height

  function finishedDrawing() {
    mousedown = false
    ctx.beginPath()
  }

  const draw = event => {
    if (mousedown) {
      // set the colour
      ctx.strokeStyle = colour
      ctx.lineCap = "round"
      //set thickness
      ctx.lineWidth = lineWidth
      ctx.lineTo(mouseX, mouseY)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(mouseX, mouseY)
    }
  }


  canvas.addEventListener('mousemove', function (event) {
    if (event.offsetX) {
      mouseX = event.offsetX
      mouseY = event.offsetY
    } else {
      mouseX = event.pageX - event.target.offsetLeft
      mouseY = event.pageY - event.target.offsetTop
    }
    // call the draw function
    draw()
  }, false)

  canvas.addEventListener('mousedown', function (event) {
    mousedown = true
  }, false)
  canvas.addEventListener('mouseup', finishedDrawing)


  // ================================================ HTML CANVAS ORIGINAL
  // var link = document.createElement('button')
  // var span = document.createElement('span')
  // // span.innerHTML('Download Image')
  // link.innerHTML = 'Submit Your Image'
  // link.appendChild(span)
  // link.addEventListener('click', function (ev) {
  //   // link.href = canvas.toDataURL()
  //   let data = new FormData()
  //   canvas.toBlob(function (blob) {
  //     data.append('correct_answer', 4)
  //     data.append('user_drawn_image', blob)
  //     console.log(data)
  //     axios.post('http://localhost:4000/api/images/', data, {
  //       headers: {
  //         'Content-type': 'multipart/form-data',
  //         Authorization: `Bearer ${Auth.getToken()}`
  //       }
  //     })
  //       .then(resp => console.log(resp.data))
  //     // .then(() => put1())
  //   }, 'image/png')
  //   // .then(put())
  // }, false)

  // document.body.appendChild(link)

  // ================================================ HTML CANVAS ORIGINAL

  function refreshPage() {
    window.location.reload(false);
  }


  function put() {
    axios.put(`http://localhost:4000/api/images/${highestId.length+1}/`, { 'correct_answer': props.match.params.id }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`
      }
    })
      .then(console.log('PUT DONE'))
      .then(props.history.push(route))
      .then(setDoRefresh(true))
      .then(console.log(doRefresh))
      .then(setTimeout(function() { refreshPage(); }, 1200))

  }
  function put1() {
    axios.put(`http://localhost:4000/api/images/${highestId.length + 1}/`, { 'correct_answer': props.match.params.id }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`
      }
    })
      .then(console.log('PUT DONE'))
  }

  console.log(data)
  console.log(answer)
  console.log(doRefresh)

  function checkRefreshPage(){
    if(doRefresh){
      refreshPage()
    }
  }  

  function saveImage (){
    // link.href = canvas.toDataURL()
    let data = new FormData()
    canvas.toBlob(function (blob) {
      data.append('correct_answer', 4)
      data.append('user_drawn_image', blob)
      console.log(data)
      axios.post('http://localhost:4000/api/images/', data, {
        headers: {
          'Content-type': 'multipart/form-data',
          Authorization: `Bearer ${Auth.getToken()}`
        }
      })
        .then(resp => console.log(resp.data))
        .then(setHideSubmit(true))
      // .then(() => put1())
    }, 'image/png')
    // .then(put())
  }

  let submitClassName = 'buttonC '
  let nextClassName = 'noShow'
  if (hideSubmit) {
    submitClassName = 'noShow'
    nextClassName = 'buttonC'
  }

  return (
    <React.Fragment>
      <Tada>
        <h1>{answer}</h1>
      </Tada>
      <button className={submitClassName} onClick={() => {saveImage()}}>SUBMIT YOUR IMAGE</button>
      <button className={nextClassName} onClick={() => { put() }}>NEXT</button>
      {/* <button onClick={()=>props.match.params.id.history.push(route)}>NEXTprops</button> */}
      {/* TEST */}
      {/* <Canvas correctAnswerId={props} /> */}
      {/* <NewCanvas props={props} /> */}
    </React.Fragment>

  )
}

export default Draw