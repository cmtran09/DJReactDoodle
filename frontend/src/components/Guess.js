
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Auth from '../lib/auth'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'



const Guess = (props) => {


  const [data, setData] = useState([])
  const [form, updateForm] = useState()
  const [answer, setAnswer] = useState([])
  const [guess1, setGuess1] = useState([])
  const [guess2, setGuess2] = useState([])
  const [guess3, setGuess3] = useState([])
  useEffect(() => {
    console.log(props.match.params.id)
    fetch(`/api/images/${props.match.params.id}`)
      .then(resp => resp.json())
      .then(resp => {
        setData(resp)
        getAnswer(resp)
      })
    return () => console.log('Unmounting component')
  }, [0])


  function getAnswer(resp) {
    axios.get(`/api/answers/${resp.id}`)
      .then(res => {
        setAnswer(res.data.correct_answer)
        console.log(res.data.correct_answer)
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
    updateForm({ ...form, [e.target.name]: e.target.value })
    // console.log(form)
  }

  const [close, setClose] = useState(false)

  return (<div>
    <p>{data.user_drawn_image}</p>
    <p>{answer}</p>
    <img src={`http://localhost:4000${data.user_drawn_image}`} alt='test' />
    <form className={classes.root} noValidate autoComplete="off">
      <TextField id="outlined-basic" label="guess one" variant="filled" disabled={close} error={close}
        onChange={(e) => handleInput(e)}
        onKeyPress={(ev) => {
          console.log(`Pressed keyCode ${ev.key}`)
          if (ev.key === 'Enter') {
            setGuess1(form)
            if (form === answer) {
              console.log('match!')
            } else setClose(true)
            ev.preventDefault()
          }
        }}
      />
      <TextField id="outlined-basic1" label="guess two" variant="filled" />
      <TextField id="outlined-basic2" label="guess three" variant="filled" />
    </form>
  </div>
  )

}

export default Guess