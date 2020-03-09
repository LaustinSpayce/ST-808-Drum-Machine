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

const useStyles = makeStyles(theme => ({
  root: {
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
      theme.palette.type === 'dark' ? theme.palette.grey[800] : theme.palette.grey[200],
  },
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
      <Container component="main" className={classes.main} maxWidth="md">
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