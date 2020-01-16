import React from 'react'
import axios from 'axios'
import Auth from '../lib/auth'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Canvas = ({ correctAnswerId }) => {

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

  console.log(canvas)
  console.log('answer id', correctAnswerId)

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

  var link = document.createElement('button')
  var span = document.createElement('span')
  // span.innerHTML('Download Image')
  link.innerHTML = 'Submit Your Image'
  link.appendChild(span)
  link.addEventListener('click', function (ev) {
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
    }, 'image/png')
    axios.put('http://localhost:4000/api/images/17/', { 'correct_answer': 2 }, {
      headers: {
        'Content-Type': 'text/plain',
        Authorization: `Bearer ${Auth.getToken()}`
      }
    }
    )
      .then(r => console.log(r.status))
      .catch(e => console.log(e));
    // canvas.toBlob(function (blob) {
    //   data.append( 'correct_answer', parseInt(correctAnswerId))
    //   // data.append( 'user_artist', 1)
    //   data.append
    //   data.append('user_drawn_image', blob)
    //   axios({
    //     method: 'POST',
    //     data,
    //     url: 'http://localhost:4000/api/images/',
    //     headers: { 
    //       'Content-type': 'multipart/form-data',
    //       Authorization: `Bearer ${Auth.getToken()}`
    //    }
    //   })
    // }, 'image/png')
    // link.download = "mypainting.png"      
    // REMOVE AND MAKE THE 
  }, false)
  // link.addEventListener('click', function (ev) {
  //     // link.href = canvas.toDataURL()
  //     let data = new FormData()
  //     canvas.toBlob(function(blob){
  //         data.append('user_drawn_image',blob)
  //         axios({
  //             method:'POST',
  //             data,
  //             url:'http://localhost:4000/doodle/images/',
  //             headers: {'Content-type': 'multipart/form-data'}
  //         })
  //     },'image/png')        
  //     // link.download = "mypainting.png"      
  //     // REMOVE AND MAKE THE 
  // }, false)
  document.body.appendChild(link)

  const [locations, setLocations] = React.useState([])
  const canvasRef = React.useRef(null)

  function put() {
    axios.put('http://localhost:4000/api/images/12/', { 'correct_answer': 2 }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`
      }
    })
  }

  return (
    <React.Fragment>
      <div id="tester"></div>
      <button onClick={put()}>CLICK</button>
      <ToastContainer />
    </React.Fragment>
    // this canvas doesn't work properly
    // <canvas
    //   ref={canvasRef}
    //   onClick={e => {
    //     const canvas = canvasRef.current
    //     const ctx = canvas.getContext('2d')
    //     const newLocation = { x: e.clientX, y: e.clientY }
    //     setLocations([...locations, newLocation])
    //     draw(ctx)
    //   }}
    // />
  )
}

export default Canvas
