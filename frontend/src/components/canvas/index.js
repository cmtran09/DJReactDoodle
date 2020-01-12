import React from 'react'
import axios from 'axios'

export default function Canvas() {
    var canvas = document.querySelector('canvas'),
        c = canvas.getContext('2d'),
        mouseX = 0,
        mouseY = 0,
        width = 300,
        height = 300,
        colour = 'black',
        mousedown = false

    canvas.width = width
    canvas.height = height

    function draw() {
        if (mousedown) {
            // set the colour
            c.fillStyle = colour
            // start a path and paint a circle of 20 pixels at the mouse position
            c.beginPath()
            c.arc(mouseX, mouseY, 10, 0, Math.PI * 2, true)
            c.closePath()
            c.fill()
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
        mousedown = true;
    }, false);
    canvas.addEventListener('mouseup', function (event) {
        mousedown = false;
    }, false);

    var link = document.createElement('a');
    link.innerHTML = 'download image';
    link.addEventListener('click', function (ev) {
        // link.href = canvas.toDataURL();
        let data = new FormData()
        canvas.toBlob(function(blob){
            data.append('user_drawn_image',blob)
            axios({
                method:'POST',
                data,
                url:'http://localhost:4000/doodle/images/',
                headers: {'Content-type': 'multipart/form-data'}
            })
        },'image/png')        
        // link.download = "mypainting.png";      
        // REMOVE AND MAKE THE 
    }, false);
    // link.addEventListener('click', function (ev) {
    //     // link.href = canvas.toDataURL();
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
    //     // link.download = "mypainting.png";      
    //     // REMOVE AND MAKE THE 
    // }, false);
    document.body.appendChild(link);

    const [locations, setLocations] = React.useState([])
    const canvasRef = React.useRef(null)
    return (
        <canvas
            ref={canvasRef}
            onClick={e => {
                const canvas = canvasRef.current
                const ctx = canvas.getContext('2d')
                const newLocation = { x: e.clientX, y: e.clientY }
                setLocations([...locations, newLocation])
                // draw(ctx, newLocation)
            }}
        />
    )
}

