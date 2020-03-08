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

export default class App extends React.Component {
  constructor (props) {
    super(props)

    // Need to bind the functions here.
    this.handleClick = this.handleClick.bind(this)

    // Initialise the Samplers / Synths    
    this.osc = new Tone.Synth().toMaster()
    
  }
  
  handleClick () {
    this.osc.triggerAttackRelease('C4', '8n')
  }

  render() {
    return (
      <div>
        <StepSequencer/>
        <Transport/>
      </div>
    );
  }
};

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App/>,
    document.body.appendChild(document.createElement('div')),
  )
})