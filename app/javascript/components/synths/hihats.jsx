import React, { Component } from 'react'
import Tone from 'tone'
import Button from '@material-ui/core/Button'
import SquareOscBank from './squareOscBank'

// Both hats are inside this one class, and using the same synth as I want to
// 'choke' the hat
export default class HiHats extends Component {
  constructor(props) {
    super(props)

    this.state = {
      hiPassFilter: 3000,
      openHatDecay: 1,
      closedHatDecay: 0.1,
      envelope: {
        attack: 0.005,
        decay: 1,
        sustain: 0.2,
        release: 1,
      }
    }

    // this.highPassFilter = new Tone.Filter(this.state.hiPassFilter, 'highpass').toMaster()
    // this.highPassFilter.Q = 100
    // this.hihatSynth = new Tone.NoiseSynth({noise: {type:'white'}, envelope: this.state.envelope}).connect(this.highPassFilter)
    this.oscBank = new SquareOscBank()
  }

  triggerClosedHats(time, value) {
    if (value) {
      this.oscBank.triggerOscillators(time, true)
    }
    
  }

  triggerOpenHats(time, value) {
    if (value) {
      this.oscBank.triggerOscillators(time, false)
    }
    
  }

  render() {
    return (
      <div>
        <Button onClick={()=>{this.triggerClosedHats(0,"C4")}} disabled>Closed</Button><br/>
        <Button onClick={()=>{this.triggerOpenHats(0,"C4")}} disabled>Open</Button>
      </div>
    )
  }
}
