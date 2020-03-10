import React, { useState, useEffect } from 'react'
import Tone from 'tone'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles';

// this is in ms, not seconds!
const PAD_LIGHT_DURATION = 100

const useStyles = makeStyles({
  root: {
    display: 'inline-block',
    background: props =>
      props.onBeat ? 'linear-gradient(45deg, #81AB77 30%, #D5E3B8 90%)' :
      props.active ? 'linear-gradient(45deg, #C53F52 30%, #EDAAB3 90%)'
        : 'linear-gradient(45deg, #444444 30%, #777777 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: props =>
      props.onBeat ? '0 3px 5px 2px rgba(129, 171, 119 .3)' :
      props.active ? '0 3px 5px 2px rgba(197, 63, 82, .3)' 
        : '0 3px 5px 2px rgba(105, 105, 105, .3)',
    color: 'white',
    height: 32,
    width: 32,
    margin: '0px 4px'
  },
  active: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)'
  },
  onBeat: {
    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)'
  }
});

export default function Pad(props) {
  const [active, setActive] = useState(false)
  const [onBeat, setOnBeat] = useState(false)

  function onClick() {
    let state = active
    state = !state
    setActive(state)
    props.clicked()
  }

  function lightPad() {
    setOnBeat(true)
    setTimeout(turnOffPad, PAD_LIGHT_DURATION)
  }

  function turnOffPad() {
    setOnBeat(false)
  }

  useEffect(() => {
    Tone.Transport.scheduleRepeat((time) => {Tone.Draw.schedule(lightPad, time)}, '1m', props.timing)
  }, [])

  const propsStyle = { active: active, onBeat: onBeat }

  const classes = useStyles(propsStyle)

  return (
    <Box 
    onClick={() => {onClick()}}
    className={classes.root}></Box>
  )
}