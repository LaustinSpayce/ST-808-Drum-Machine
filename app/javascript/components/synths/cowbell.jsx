import React, { Component } from 'react'
import Tone from 'tone'
import Button from '@material-ui/core/Button'

export default class Cowbell extends Component {

  //HIGH_OSC_FREQ: 800,
  // LOW_OSC_FREQ: 540

  constructor (props) {
    super(props)

    this.triggerCowbellSynth = this.triggerCowbellSynth.bind(this)
    
    this.state = {
      HIGH_OSC_FREQ: 835,
      LOW_OSC_FREQ: 555,
      ENVELOPE: {
        attack : 0.005 ,
        decay : 0.05 ,
        sustain : 0.1 ,
        release : 0.3
        },
      FILTER_ENVELOPE: {
        attack : 0.06 ,
        decay : 0.06 ,
        sustain : 0.5 ,
        release : 2 ,
        baseFrequency : 20000,
        octaves : 7 ,
        exponent : 2,
      },
      BandPassFilterCutoff: 2640,
      cowbellLength: 0.1
    }

    
    this.bandPassFilter = new Tone.Filter( this.state.BandPassFilterCutoff, "bandpass" ).toMaster()

    this.cowbellSynthLow = new Tone.MonoSynth( { oscillator: {type: 'square'}, envelope: this.state.ENVELOPE, filterEnvelope: this.state.FILTER_ENVELOPE}).connect(this.bandPassFilter)
    this.cowbellSynthLow.filter.type = 'allpass'
    this.cowbellSynthHigh = new Tone.MonoSynth( { oscillator: {type: 'square'}, envelope: this.state.ENVELOPE, filterEnvelope: this.state.FILTER_ENVELOPE}).connect(this.bandPassFilter)
    this.cowbellSynthHigh.filter.type = 'allpass'

  }


  triggerCowbellSynth(time, value) {
    if (value) {
      this.cowbellSynthLow.triggerAttackRelease(this.state.LOW_OSC_FREQ, this.state.cowbellLength)
      this.cowbellSynthHigh.triggerAttackRelease(this.state.HIGH_OSC_FREQ, this.state.cowbellLength)
    }
  }

  render() {
    return (
      <div>
        <Button onClick={()=>{this.triggerCowbellSynth(0,"C4")}}>Moo</Button>
      </div>
    )
  }
}
