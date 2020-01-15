import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import NavBar from './NavBar'
import axios from 'axios'

import RadialMenu from "react-radial-menu"

const items = [
    { "href": "http://www.facebook.com", "image": "../../dist/images/social/facebook.png)" },
    { "href": "http://www.reddit.com", "image": "../../dist/images/social/reddit.png)" },
    { "href": "http://www.flickr.com", "image": "../../dist/images/social/flickr.png)" },
    { "href": "http://www.google.com", "image": "../../dist/images/social/googleplus.png)" },
    { "href": "http://www.linkedin.com", "image": "../../dist/images/social/linkedin.png)" },
    { "href": "http://www.twitter.com", "image": "../../dist/images/social/twitter.png)" },
    { "href": "http://www.twitter.com", "image": "../../dist/images/social/twitter.png)" }
];

// let categories = [vegetables, Animals, Food, human-body]

const center = {
    "image": "../../dist/images/social/share.png)"
};


export default function StartPage() {
    const [data, setData] = useState([])

    useEffect(() => {
        fetch(`/api/answers/`)
          .then(resp => resp.json())
          .then(resp => {
            setData(resp)
          })
        return () => console.log('Unmounting component')
      }, [0])

    console.log(data)
    return (
        <React.Fragment>
            <NavBar />
            {/* <RadialMenu
                items={items}
                center={center}
            /> */}
            <Button variant="contained" color="primary" >
                Play
            </Button >
        </React.Fragment>

    )
}
