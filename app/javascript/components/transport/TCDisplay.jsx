import React, { Component, useState, useEffect } from 'react'
import Box from '@material-ui/core/Box'
import Tone from 'tone'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles({
  TCDisplay: {
    fontFamily: ['Roboto-mono', 'Monaco', 'monospace'],
    background: '#30303B',
    color: '#F7F7F7',
    width: '100%',
    height: '56px',
    border: 0,
    borderRadius: 5,
    align: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  TCText: {
    margin: '0px auto',
    fontSize: '2rem',
    width: 192
  }
})

export default function DisplayTC(props) {
  const [currentTC, setTC] = useState(0)

  useEffect(() => {
    Tone.Transport.scheduleRepeat((time) => {setTC(Tone.Transport.position)}, '16n')
  }, [])

  const classes = useStyles()

  return (
    <Box className={classes.TCDisplay}>
      <Box className={classes.TCText}>
        {currentTC}
      </Box>
    </Box>
  )
}
