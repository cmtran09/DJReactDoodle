import React, { useState, useEffect } from 'react'
import NavBar from './NavBar'
import { Container, Typography } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';



export default function Draw() {

    const [data, setData] = useState([])

    useEffect(() => {
      fetch('http://localhost:4000/doodle/images')
        .then(resp => resp.json())
        .then(resp => setData(resp))
      return () => console.log('Unmounting component')
    }, [])
    console.log(data)

    return (
        <React.Fragment>
            <NavBar />
            <div>
                Draw Pages
            </div>
            <CssBaseline />
            <Container maxWidth="sm">
                <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '80vh' }} />
            </Container>
        </React.Fragment>

    )
}
