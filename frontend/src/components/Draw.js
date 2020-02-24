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

  console.log(typeof (highestId))

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
  }, [props.match.params.id])

  function getAnswer(resp) {
    axios.get(`/api/answers/${resp.id}`)
      .then(res => {
        setAnswer(res.data.correct_answer)
        // console.log(res.data.correct_answer)  
      })
  }

  console.log('highest ID', highestId.length)

  var small = document.querySelector('small')
  var label = document.querySelector('label')
  var input = document.querySelectorAll('input')[0]
  var input1 = document.querySelectorAll('input')[1]
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

  // canvas.classList.remove('noShow')
  label.classList.remove('noShow')
  input.classList.remove('noShow')
  input1.classList.remove('noShow')
  small.classList.remove('noShow')

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


  function refreshPage() {
    window.location.reload(false);
  }

  function randomAnswer() {
    return Math.floor(Math.random() * 31) + 1
  }


  function put() {
    axios.put(`/api/images/${highestId.length + 1}/`, { 'correct_answer': props.match.params.id }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`
      }
    })
      .then(console.log('PUT DONE'))
      .then(props.history.push(`/draw/${randomAnswer()}`))
      .then(setDoRefresh(true))
      .then(console.log(doRefresh))
      .then(setTimeout(function () { refreshPage(); }, 10)) // why is there a set timeout here fo 1200?

  }

  console.log(data)
  console.log(answer)
  console.log(doRefresh)

  function checkRefreshPage() {
    if (doRefresh) {
      refreshPage()
    }
  }

  function saveImage() {
    // link.href = canvas.toDataURL()
    let data = new FormData()
    canvas.toBlob(function (blob) {
      data.append('correct_answer', 4)
      data.append('user_drawn_image', blob)
      console.log(data)
      axios.post('/api/images/', data, {
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

  // const skipButton = document.querySelector('.nextAnswerButton')
  let nextAnswerButton = 'buttonC skipButton'
  let submitClassName = 'buttonC '
  let nextClassName = 'noShow'
  let canvas2 = 'show canvasShown'
  if (hideSubmit) {
    submitClassName = 'noShow'
    nextClassName = 'buttonC'
    nextAnswerButton = 'noShow'
    canvas2 = 'noShow'
    label.classList.add('noShow')
    input.classList.add('noShow')
    input1.classList.add('noShow')
    small.classList.add('noShow')
  }

  return (
    <React.Fragment>
      <div className="drawPage">
        <div className="wordDiv">
          <Tada >
            <h1 className="word">{answer}</h1>
          </Tada>
        </div>
        <div className="drawContent">
          {/* <button onClick={()=>props.match.params.id.history.push(route)}>NEXTprops</button> */}
          {/* TEST */}
          <canvas className={canvas2} />
          <div className="drawButtons">
            <button className={submitClassName} onClick={() => { saveImage() }}>SUBMIT YOUR IMAGE</button>
            <button className={nextClassName} onClick={() => { put() }}>NEXT</button>
            <button className={nextAnswerButton} onClick={() => { props.history.push(`/draw/${randomAnswer()}`) }}> SKIP</button>
            {/* <NewCanvas props={props} /> */}
            {/* <div className='colorChanger'>
              <input type="color" className="js-color-picker  color-picker noShow" value="#6b76ff" />
              <input type="range" className="js-line-range noShow" min="1" max="72" value="5" />
              <label className="js-range-value noShow">5</label><small className='noShow'>px</small>
            </div> */}
          </div>
        </div>
      </div>
    </React.Fragment >

  )
}

export default Draw