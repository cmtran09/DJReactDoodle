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
        giveAnswer.push(<li key={id} className="listItem" > {g.user_answer} </li>)
      }
    })
    return giveAnswer
  }

  function findImages(img, id) {
    if (img.user_artist === Auth.getUserId() && answer.length > 0) {
      return <div className="card-image">
        <figure className="content left-side">
          <div>
            <Link to={`/guess/${id + 1}`}>
              <img className="profileImage" src={`${img.user_drawn_image}`} alt="Placeholder image" width="300px" height="300px" />
            </Link>
            <div className="imgAnswer">{checkAnswer(img)}</div>
          </div>
          <ul className="guessList"><h2 className="guessTitle">Guesses Made</h2>{checkGuesses(img)}</ul>
        </figure>
      </div>
    }
  }

  var small = document.querySelector('small')
  var label = document.querySelector('label')
  var input = document.querySelectorAll('input')[0]
  var input1 = document.querySelectorAll('input')[1]

  label.classList.add('noShow')
  input.classList.add('noShow')
  input1.classList.add('noShow')
  small.classList.add('noShow')



  return (
    <section className="profile">
      <h1 className="profileHeader">Your Creations</h1>
      <div className="imgDiv"> {data.map((image, id) => {
        return <div key={id} to={`/guess/${id + 1}`}>
          {findImages(image, id)}
        </div>
      })}
      </div>
    </section>
  )

}

export default Profile