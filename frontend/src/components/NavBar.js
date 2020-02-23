import React from 'react'
import { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import BrushIcon from '@material-ui/icons/Brush'
import ArtTrackIcon from '@material-ui/icons/ArtTrack'
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom'
import AllInboxIcon from '@material-ui/icons/AllInbox'
import { Link } from 'react-router-dom'
import FaceIcon from '@material-ui/icons/Face'

import Auth from '../lib/auth'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}))


function handleLogout() {
  Auth.logout()
}

function randomAnswer() {
  return Math.floor(Math.random() * 31) + 1
}

const ButtonAppBar = () => {
  const classes = useStyles()

  // const [change, setChange] = useState(false)
  // const [url, setUrl] = useState(false)
  // const [num, setNum] = useState(0)

  // useEffect(() => {
  //   if (window.location.href === 'http://localhost:8000/') {
  //     setNum(1)
  //     setUrl(false)
  //     if (url === false) {
  //       setNum(num + 1)
  //       setUrl(true)
  //     }
  //     console.log(num)
  //   }
  //   if (window.location.href !== 'http://localhost:8000/') {
  //     setNum(2)
  //     setUrl(true)
  //     if (url === true) {
  //       setNum(num + 1)
  //       setUrl(false)
  //     }
  //     console.log(num)
  //   }
  //   console.log('url', window.location.href)
  //   if (Auth.isAuthorized()) {
  //     setChange(true)
  //   }
  //   return () => console.log('Unmounting component')
  // }, [0])


  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <Link to='/start'>
              <MenuIcon />
            </Link>
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Scribble
          </Typography>
          {/* {Auth.isAuthorized && */}
          <IconButton color="inherit">
            {/* <BrushIcon badgeContent={0} color="secondary"> */}
            <Link to={`/draw/${randomAnswer()}`}>
              <BrushIcon />
            </Link>
          </IconButton>
          {/* {Auth.isAuthorized() && */}
          <IconButton color="inherit">
            {/* <BrushIcon badgeContent={0} color="secondary"> */}
            <Link to='/drawings'>
              <AllInboxIcon />
            </Link>
          </IconButton>
          {/* {Auth.isAuthorized() && */}
          <IconButton color="inherit">
            <Link to='/guess/1'>     {/* CHANGEEEEETHISSS */}
              <ArtTrackIcon />
            </Link>
          </IconButton>
          {Auth.isAuthorized() &&
            <IconButton color="inherit">
              <Link to='/profile'>     {/* CHANGEEEEETHISSS */}
                <FaceIcon />
              </Link>
            </IconButton>}
          {/* 
          {Auth.isAuthorized() &&
            <IconButton color="inherit">
              <div onClick={handleLogout()}>
              <Link >
              <MeetingRoomIcon />
              </Link>
              </div>
            </IconButton>}
             */}
          <Button color="inherit"><Link to="/" style={{ textDecoration: 'none' }}>Login</Link></Button>
          <Button color="inherit"><Link to="/register" style={{ textDecoration: 'none' }}>Register</Link></Button>
          {/* {Auth.isAuthorized() && */}
            <Button color="inherit"><Link to="/" style={{ textDecoration: 'none' }} onClick={() => { handleLogout() }}>Log Out</Link></Button>
          {/* } */}
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default ButtonAppBar