// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React, { useState, useRef, useEffect, Component }  from 'react'
import ReactDOM from 'react-dom'
import Tone from 'tone'
import StepSequencer from '../components/step_sequencer'
import { ThemeProvider } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'

export default class App extends React.Component {
  constructor (props) {
    super(props)

    // Need to bind the functions here.
    this.handleClick = this.handleClick.bind(this)
    this.triggerKick = this.triggerKick.bind(this)
    this.triggerSnare = this.triggerSnare.bind(this)
    this.triggerHatClosed = this.triggerHatClosed.bind(this)
    this.triggerHatOpen = this.triggerHatOpen.bind(this)
    this.loopPlay = this.loopPlay.bind(this)

    // Initialise the Samplers / Synths    
    this.osc = new Tone.Synth().toMaster()
    this.kickDrum = new Tone.Sampler({'C4' : '/samples/kick.mp3'}).toMaster()
    this.snareDrum = new Tone.Sampler({'C4' : '/samples/snare.mp3'}).toMaster()
    this.Hats = new Tone.Sampler({'C4' : '/samples/Hat_op.mp3', 'D4' : '/samples/Hat_cl.mp3'}).toMaster()
    this.isPlaying = false
    // Tone.Transport.schedule(this.triggerSnare, '0:1:0')
    // Tone.Transport.schedule(this.triggerSnare, '0:3:0')
    // Tone.Transport.schedule(this.triggerKick, 0)
    // Tone.Transport.schedule(this.triggerKick, '0:1:2')
    // Tone.Transport.schedule(this.triggerKick, '0:2:2')
    // Tone.Transport.schedule(this.triggerKick, '0:3:0')
    // Tone.Transport.schedule(this.triggerHatClosed, 0)
    // Tone.Transport.schedule(this.triggerHatClosed, '0:0:2')
    // Tone.Transport.schedule(this.triggerHatClosed, '0:1:0')
    // Tone.Transport.schedule(this.triggerHatClosed, '0:1:2')
    // Tone.Transport.schedule(this.triggerHatClosed, '0:2:0')
    // Tone.Transport.schedule(this.triggerHatClosed, '0:2:2')
    // Tone.Transport.schedule(this.triggerHatClosed, '0:3:0')
    // Tone.Transport.schedule(this.triggerHatOpen, '0:3:2')
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

  
  loopPlay () {
    if (this.isPlaying) {
      console.log ('stop playing')
      this.isPlaying = !this.isPlaying
      Tone.Transport.toggle()
    } else {
      console.log ('start playing')
      this.isPlaying = !this.isPlaying
      Tone.Transport.toggle()
    }
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
        <Button onClick={this.loopPlay} color="primary"><PlayArrowIcon/></Button>
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