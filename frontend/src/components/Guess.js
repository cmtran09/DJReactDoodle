
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Auth from '../lib/auth'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'



const Guess = (props) => {


  const [data, setData] = useState([])
  const [form, updateForm] = useState()
  const [answer, setAnswer] = useState()
  const [guess1, setGuess1] = useState()
  const [guess2, setGuess2] = useState()
  const [guess3, setGuess3] = useState()

  useEffect(() => {
    // console.log(props.match.params.id)
    fetch(`/api/images/${props.match.params.id}`)
      .then(resp => resp.json())
      .then(resp => {
        setData(resp)
        getAnswer(resp)
      })
    return () => console.log('Unmounting component')
  }, [props.match.params.id])


  function getAnswer(resp) {
    axios.get(`/api/answers/${resp.correct_answer}`)
      .then(res => {
        setAnswer(res.data.correct_answer)
        // console.log(res.data.correct_answer)
      })
  }

  const useStyles = makeStyles(theme => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: 200
      }
    }
  }))


  const classes = useStyles()


  function handleInput(e) {
    updateForm(e.target.value)
    // console.log(form)
  }

  const route = `/guess/${parseInt(props.match.params.id) + 1}`
  const [close1, setClose1] = useState(false)
  const [close2, setClose2] = useState(false)
  const [close3, setClose3] = useState(false)
  const [disable1, setDisable1] = useState(false)
  const [disable2, setDisable2] = useState(false)
  const [disable3, setDisable3] = useState(false)

  function checkMatch(ev, ans, input, num) {
    if (ev.key === 'Enter') {
      if (num === 1) setGuess1(input); else if (num === 2) setGuess2(input); else if (num === 3) setGuess3(input)
      axios.post('/api/useranswers/', { 'user_answer': input, 'image': parseInt(props.match.params.id) }, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
        .then(() => console.log('success'))
      if (ans.toLowerCase() === input.toLowerCase()) {
        console.log(props.match.params.id)
        setDisable1(true); setDisable2(true); setDisable3(true)
      } else if (num === 1) setClose1(true); else if (num === 2) setClose2(true); else if (num === 3) setClose3(true)
      ev.preventDefault()
    }
  }

  function checkFail(g1, g2, g3, ans) {
    if (ans) {
      const lower = ans.toLowerCase()
      if (g1 === lower || g2 === lower || g3 === lower) {
        return 'correct'
      } else if (g1 && g2 && g3) {
        return `you failed :( correct answer is: ${ans}`
      }
    }
  }


  const [username, setUser] = useState('unknown')

  function findArtist(user) {
    if (!user) return
    axios.get(`/api/users/${user}`)
      .then((resp) => {
        setUser(resp.data.username)
      })
  }

  return (<div>
    {/* <p>{data.user_drawn_image}</p> */}
    {/* <p>{answer}</p> */}
    <img src={`http://localhost:4000${data.user_drawn_image}`} alt='drawing not found' width="600px" height="600px" />
    <p>Drawn by {findArtist(data.user_artist)}{username}</p>
    <form className={classes.root} noValidate autoComplete="off">
      <TextField id="outlined-basic" label="guess one" variant="filled" disabled={disable1} error={close1}
        onChange={(e) => handleInput(e)}
        onKeyPress={(ev) => {
          checkMatch(ev, answer, form, 1)
        }}
      />
      <TextField id="outlined-basic2" label="guess two" variant="filled" disabled={disable2} error={close2}
        onChange={(e) => handleInput(e)}
        onKeyPress={(ev) => {
          checkMatch(ev, answer, form, 2)
        }}
      />
      <TextField id="outlined-basic3" label="guess three" variant="filled" disabled={disable3} error={close3}
        onChange={(e) => handleInput(e)}
        onKeyPress={(ev) => {
          checkMatch(ev, answer, form, 3)
        }}
      />
    </form>
    <p>{checkFail(guess1, guess2, guess3, answer)}</p>
    <button onClick={() => props.history.push(route)}>
      {'Next Painting'}
    </button>
  </div>
  )

}

export default Guess