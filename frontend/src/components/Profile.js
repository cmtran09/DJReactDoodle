import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Auth from '../lib/auth'

const Profile = (props) => {

  const [data, setData] = useState([])
  const [answer, setAnswer] = useState([])

  useEffect(() => {
    fetch('/api/images/')
      .then(resp => resp.json())
      .then(resp => {
        console.log(resp)
        setData(resp)
        getAnswer()
      })
    return () => console.log('Unmounting component')
  }, [0])

  function getAnswer() {
    axios.get('/api/answers/')
      .then(resp => {
        // console.log(resp.data)
        setAnswer(resp.data)
      })
  }

  function checkAnswer(img) {
    let giveAnswer = 'none'
    answer.forEach((ans) => {
      if (img.correct_answer === ans.id) {
        console.log(ans.correct_answer)
        giveAnswer = ans.correct_answer
      }
    })
    return giveAnswer
  }

  function findImages(img, ans) {
    if (img.user_artist === Auth.getUserId() && answer.length > 0) {
      return <div className="card-image">
        <figure className="image is-5by3 large-img">
          <img src={`http://localhost:4000${img.user_drawn_image}`} alt="Placeholder image" />
          <div>{checkAnswer(img)}</div>
        </figure>
      </div>
    }
  }


  return ( <section>
    <h1>Your Creations</h1>
    <div> {data.map((image, id, answer) => {
      return <Link key={id} to={`/guess/${id + 1}`}>
        {findImages(image)}
      </Link>
    })}
    </div>
  </section>
  )

}

export default Profile