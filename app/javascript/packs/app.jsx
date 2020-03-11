// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React, { useState, useRef, useEffect, Component }  from 'react'
import ReactDOM from 'react-dom'
import Tone from 'tone'
import StepSequencer from '../components/step_sequencer'
import { ThemeProvider } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Transport from '../components/transport'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { sizing } from '@material-ui/system'
import Box from '@material-ui/core/Box'

/* DOPELY COLOURS:
#F7F7F7
#EAE9E7
#D1CDC9
#959087
#30303B
*/

const useStyles = makeStyles(theme => ({
  root: {
    background: '#F7F7F7',
    color: '#30303B',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '50vh',
  },
  main: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(14),
  },
  footer: {
    padding: theme.spacing(3, 2),
    position: 'fixed',
    bottom: '0',  
    width: '100%',
    backgroundColor:
      theme.palette.type === 'dark' ? '#D1CDC9' : '#EAE9E7',
  },
  titleBox: {
    borderBottom: 3,
    borderBottomStyle: 'solid',
    borderBottomColor: '#C53F52',
    width: '100%',
    margin: '0 auto 1rem auto'
  },
  title: {
    fontWeight: 700,
    color: '#C53F52',
    fontSize: '3rem'
  }
}))

export default function App () {
  const classes = useStyles()

  // Initialise a Synth   
  // osc = new Tone.Synth().toMaster()
  // function handleClick () {
  //   osc.triggerAttackRelease('C4', '8n')
  // }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Container component='main' className={classes.main} maxWidth='md'>
      <Box className={classes.titleBox}>
        <Typography className={classes.title}>
          ST-808
        </Typography>
      </Box>
        <StepSequencer />
      </Container>
      <footer className={classes.footer}>
        <Transport/>
      </footer>
    </div>
  )
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App/>,
    document.body.appendChild(document.createElement('div')),
  )
})