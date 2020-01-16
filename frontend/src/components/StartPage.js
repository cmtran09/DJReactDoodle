import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'
import Auth from '../lib/auth'


import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import BrushIcon from '@material-ui/icons/Brush';
import ArtTrackIcon from '@material-ui/icons/ArtTrack';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';




import axios from 'axios'

import RadialMenu from "react-radial-menu"

import food from '../images/food.png'

const items = [
    { "href": "http://www.facebook.com", "image": "https://raw.githubusercontent.com/Charlotte-Thomas/DJReactDoodle/99ff42e0c6fa58f8af2f26d6e4f91244584aa284/frontend/src/images/food.png" },
    { "href": "http://www.reddit.com", "image": "https://raw.githubusercontent.com/Charlotte-Thomas/DJReactDoodle/99ff42e0c6fa58f8af2f26d6e4f91244584aa284/frontend/src/images/animals.png" },
    { "href": "http://www.flickr.com", "image": "https://raw.githubusercontent.com/Charlotte-Thomas/DJReactDoodle/99ff42e0c6fa58f8af2f26d6e4f91244584aa284/frontend/src/images/emotion.png" },
    { "href": "http://www.google.com", "image": "https://raw.githubusercontent.com/Charlotte-Thomas/DJReactDoodle/99ff42e0c6fa58f8af2f26d6e4f91244584aa284/frontend/src/images/fruitveg.png" },
    { "href": "http://www.linkedin.com", "image": "https://raw.githubusercontent.com/Charlotte-Thomas/DJReactDoodle/99ff42e0c6fa58f8af2f26d6e4f91244584aa284/frontend/src/images/hard2.png" },
    { "href": "http://www.twitter.com", "image": "https://raw.githubusercontent.com/Charlotte-Thomas/DJReactDoodle/99ff42e0c6fa58f8af2f26d6e4f91244584aa284/frontend/src/images/world%202.png" },
    { "href": "http://www.twitter.com", "image": "https://raw.githubusercontent.com/Charlotte-Thomas/DJReactDoodle/99ff42e0c6fa58f8af2f26d6e4f91244584aa284/frontend/src/images/hardest.png" }
];

// let categories = [vegetables, Animals, Food, human-body]

const center = {
    "image": "https://raw.githubusercontent.com/Charlotte-Thomas/DJReactDoodle/99ff42e0c6fa58f8af2f26d6e4f91244584aa284/frontend/src/images/paintbrush.png"
};


function StartPage(props) {
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
            {/* <RadialMenu
                items={items}
                center={center}
            /> */}
            <RadialMenu
                items={items}
                center={center}
            />
            <img src='https://raw.githubusercontent.com/Charlotte-Thomas/DJReactDoodle/99ff42e0c6fa58f8af2f26d6e4f91244584aa284/frontend/src/images/food.png' />
            <img src="https://raw.githubusercontent.com/Charlotte-Thomas/DJReactDoodle/99ff42e0c6fa58f8af2f26d6e4f91244584aa284/frontend/src/images/paintbrush.png" />
            <img src="https://raw.githubusercontent.com/Charlotte-Thomas/DJReactDoodle/99ff42e0c6fa58f8af2f26d6e4f91244584aa284/frontend/src/images/animals.png" />
            <img src="https://raw.githubusercontent.com/Charlotte-Thomas/DJReactDoodle/99ff42e0c6fa58f8af2f26d6e4f91244584aa284/frontend/src/images/emotion.png" />
            <img src="https://raw.githubusercontent.com/Charlotte-Thomas/DJReactDoodle/99ff42e0c6fa58f8af2f26d6e4f91244584aa284/frontend/src/images/fruitveg.png" />
            <img src="https://raw.githubusercontent.com/Charlotte-Thomas/DJReactDoodle/99ff42e0c6fa58f8af2f26d6e4f91244584aa284/frontend/src/images/hard2.png" />
            <img src="https://raw.githubusercontent.com/Charlotte-Thomas/DJReactDoodle/99ff42e0c6fa58f8af2f26d6e4f91244584aa284/frontend/src/images/world%202.png" />
            <img src="https://raw.githubusercontent.com/Charlotte-Thomas/DJReactDoodle/99ff42e0c6fa58f8af2f26d6e4f91244584aa284/frontend/src/images/hardest.png" />
            <Button onClick={() => props.history.push('/draw/1')} className='buttonC'>
                Start
            </Button>
        </React.Fragment>
    )
}


export default StartPage