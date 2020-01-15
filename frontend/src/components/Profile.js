import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Auth from '../lib/auth'

const Profile = (props) => {

  const [data, setData] = useState([])
  const [answer, setAnswer] = useState([])
  const [guess, setGuess] = useState([])

  useEffect(() => {
    fetch('/api/images/')
      .then(resp => resp.json())
      .then(resp => {
        console.log(resp)
        setData(resp)
        getAnswer()
        getGuesses()
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

  function getGuesses() {
    axios.get('/api/useranswers/')
      .then(resp => {
        console.log(resp.data)
        setGuess(resp.data)
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

  function checkGuesses(img) {
    const giveAnswer = []
    guess.forEach((g, id) => {
      if (g.image === img.id) {
        console.log(g.user_answer)
        giveAnswer.push(<li key={id} > {g.user_answer} </li>)
      }
    })
    return giveAnswer
  }

  function findImages(img) {
    if (img.user_artist === Auth.getUserId() && answer.length > 0) {
      return <div className="card-image">
        <figure className="image is-5by3 large-img">
          <img src={`http://localhost:4000${img.user_drawn_image}`} alt="Placeholder image" />
          <div>{checkAnswer(img)}</div>
          <ul>{checkGuesses(img)}</ul>
        </figure>
      </div>
    }
  }


  return (<section>
    <h1>Your Creations</h1>
    <div> {data.map((image, id) => {
      return <Link key={id} to={`/guess/${id + 1}`}>
        {findImages(image)}
      </Link>
    })}
    </div>
  </section>
  )

}

export default Profile