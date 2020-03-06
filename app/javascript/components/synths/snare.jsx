import React, { Component } from 'react'
import Tone from 'tone'
import Button from  '@material-ui/core/Button'

export default class Snare extends Component {
  constructor(props) {
    super(props)

    this.state = {
      frequency: 200
    }

    this.triggerSnareSynth = this.triggerSnareSynth.bind(this)
    this.snareNoiseSynth = new Tone.NoiseSynth().toMaster()
    this.snareSineSynth = new Tone.MonoSynth( {
      frequency: 200, 
      oscillator: {type: 'sine'}, 
      envelope : {
        attack : 0.005 ,
        decay : 0.1 ,
        sustain : 0.005 ,
        release : 0.025
        }}).toMaster()
  }

  triggerSnareSynth(time, value) {
    if (value) {
      this.snareNoiseSynth.triggerAttackRelease('16n')
      this.snareSineSynth.triggerAttackRelease(this.state.frequency, '32n')
    }
  }

  render() {
    return (
      <div>
        <Button onClick={this.triggerSnareSynth} disabled>KRAK</Button>
      </div>
    )
  }
}
