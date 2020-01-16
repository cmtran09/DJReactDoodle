import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Auth from '../lib/auth'

const Drawings = (props) => {


  const [data, setData] = useState([])
  const [form, updateForm] = useState()
  const [answer, setAnswer] = useState()
  const [guess1, setGuess1] = useState()
  const [guess2, setGuess2] = useState()
  const [guess3, setGuess3] = useState()

  useEffect(() => {
    // console.log(props.match.params.id)
    fetch('/api/images')
      .then(resp => resp.json())
      .then(resp => {
        setData(resp)
        console.log(resp)
      })
    return () => console.log('Unmounting component')
  }, [props.match.params.id])



  // <img src={`http://localhost:4000${data.user_drawn_image}`} alt='drawing not found' width="1000px" height="600px" />

  return (<div className="mainDrawings">
    <h1 className='all background'>ALL</h1>
    <div className="imgBackground">
      <img className="awesome" src="https://cdn.dribbble.com/users/199982/screenshots/2814919/awesome-text-stoke-animation.gif"></img>
    </div>
    <h1 className='drawingsHeader background'>DRAWINGS</h1>
    <h3 className="description">(Click one to guess what it is!)</h3>
    <div className="background"> {data.map((image, id) => {
      return <Link key={id} to={`/guess/${id + 1}`}>
        {/* not sure why it has to be + 1 for it to go to correct image? */}
        <div className="card-image imagesAll background">
          <figure>
            <img className="imgBackground2" src={`${image.user_drawn_image}`} width="500px" height="400px" alt="Placeholder image" />
          </figure>
        </div>
      </Link>
    })}
    </div>
  </div>
  )

}

export default Drawings