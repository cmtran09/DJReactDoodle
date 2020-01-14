
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Auth from '../lib/auth'
import image from '../../../media/pics/mypainting_1.png'



const Guess = (props) => {
  

  const [data, setData] = useState([])

  useEffect(() => {
    console.log(props.match.params.id)
    fetch(`/api/images/${props.match.params.id}`)
      .then(resp => resp.json())
      .then(resp =>
        setData(resp)
        //run function to pass data down to child component
        // gop to child run the function 
      )
      .then(console.log(data))
    return () => console.log('Unmounting component')
  }, [0])


  return (<div>
    <p>{data.user_drawn_image}</p>
    <img src={`http://localhost:4000${data.user_drawn_image}`} alt='test'/>
  </div>
  )

}

export default Guess