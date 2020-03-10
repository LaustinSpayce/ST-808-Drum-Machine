import React, { useState } from 'react'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import { makeStyles } from '@material-ui/core'
import StopIcon from '@material-ui/icons/Stop'
import { flexbox } from '@material-ui/system'

const useStyles = makeStyles({
  playButton: {
    display: 'block',
    margin: '1rem',
    background: 'linear-gradient(45deg, #81AB77 30%, #D5E3B8 90%)',
    boxShadow: '0 3px 5px 2px rgba(129, 171, 119 .3)',
    margin: '0px 24px'
  },
  stopButton: {
    display: 'block',
    background: 'linear-gradient(45deg, #C53F52 30%, #EDAAB3 90%)',
    boxShadow: '0 3px 5px 2px rgba(197, 63, 82, .3)',
    margin: '0px 24px'
  }
})

export default function PlayStopPause(props) {

  const classes = useStyles()

  return (
    <Box
    display="flex"
    justifyContent="center"
    alignItems="center" 
    height="56px">
      <Button onClick={props.playToggle} className={classes.playButton}>
        <PlayArrowIcon style={{ color: '#30303B' }}/>
      </Button>
      <Button onClick={props.stopButton} className={classes.stopButton}>
        <StopIcon style={{ color: '#30303B' }}/>
      </Button>
    </Box>
  )
}
