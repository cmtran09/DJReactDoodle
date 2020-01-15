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

  return (
    <div> {data.map((image, id) => {
      return <Link key={id} to={`/guess/${id + 1}`}>
        {/* not sure why it has to be + 1 for it to go to correct image? */}
        <div className="card-image">
          <figure className="image is-5by3 large-img">
            <img src={`http://localhost:4000${image.user_drawn_image}`} alt="Placeholder image" />
          </figure>
        </div>
        <div className="card-content all-text">
          {/* <div className="subtitle name  blue-text" to={`/spots/${spot._id}`}>{spot.spotName}</div>
        <p className="region blue-text">{spot.region}</p>
        <p className="description">{string(spot)}</p> */}
        </div>
      </Link>



      // <p key={id}>{<img src={`http://localhost:4000${image.user_drawn_image}`} alt='drawing not found' width="200px" height="300px" />}
    })}
    </div>
  )

}

export default Drawings