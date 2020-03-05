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
    this.triggerKick = this.triggerKick.bind(this)
    this.triggerSnare = this.triggerSnare.bind(this)
    this.triggerHatClosed = this.triggerHatClosed.bind(this)
    this.triggerHatOpen = this.triggerHatOpen.bind(this)

    // Initialise the Samplers / Synths    
    this.osc = new Tone.Synth().toMaster()
    this.kickDrum = new Tone.Sampler({'C4' : '/samples/kick.mp3'}).toMaster()
    this.snareDrum = new Tone.Sampler({'C4' : '/samples/snare.mp3'}).toMaster()
    this.Hats = new Tone.Sampler({'C4' : '/samples/Hat_op.mp3', 'D4' : '/samples/Hat_cl.mp3'}).toMaster()
    
    Tone.Transport.loopEnd = '1m'
    Tone.Transport.loop = true
  }
  
  handleClick () {
    this.osc.triggerAttackRelease('C4', '8n')
  }

  triggerKick (time, value) {
    if (value) this.kickDrum.triggerAttack('C4')
  }

  triggerSnare (time, value) {
    if (value) this.snareDrum.triggerAttack('C4')
  }

  triggerHatClosed (time, value) {
    if (value) this.Hats.triggerAttack('D4')
  }

  triggerHatOpen (time, value) {
    if (value) this.Hats.triggerAttack('C4')
  }

  render() {
    return (
      <div>
        <StepSequencer 
          triggerKick={this.triggerKick} 
          triggerSnare={this.triggerSnare} 
          triggerHatOp={this.triggerHatOpen} 
          triggerHatCl={this.triggerHatClosed} 
        />
        <Transport />
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