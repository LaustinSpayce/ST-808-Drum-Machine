// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React, { useState, useRef, useEffect, Component }  from 'react'
import ReactDOM from 'react-dom'
import Tone from 'tone'
import StepSequencer from '../components/step_sequencer'
import { ThemeProvider } from '@material-ui/core/styles'

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
  }
  
  handleClick () {
    this.osc.triggerAttackRelease('C4', '8n')
  }

  triggerKick () {
    this.kickDrum.triggerAttack('C4')
  }

  triggerSnare () {
    this.snareDrum.triggerAttack('C4')
  }

  triggerHatClosed () {
    this.Hats.triggerAttack('D4')
  }

  triggerHatOpen () {
    this.Hats.triggerAttack('C4')
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