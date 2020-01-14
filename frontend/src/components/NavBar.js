import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import BrushIcon from '@material-ui/icons/Brush';
import ArtTrackIcon from '@material-ui/icons/ArtTrack';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import { Link } from 'react-router-dom'

import Auth from '../lib/auth'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);


  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Scribble
          </Typography>
          {Auth.isAuthorized() &&
          <IconButton color="inherit">
              {/* <BrushIcon badgeContent={0} color="secondary"> */}
              <BrushIcon />
            </IconButton>}
            {Auth.isAuthorized() &&
          <IconButton color="inherit">
              <ArtTrackIcon />
            </IconButton>}
            {Auth.isAuthorized() &&
          <IconButton color="inherit">
              <MeetingRoomIcon />
            </IconButton>}
          <Button color="inherit"><Link to="/login" style={{ textDecoration: 'none' }}>Login</Link></Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}