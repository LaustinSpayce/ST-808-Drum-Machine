import React, { Component } from 'react'
import Tone from 'tone'
import Button from '@material-ui/core/Button'

export default class Kick extends Component {
  constructor(props) {
    super(props)


    this.triggerKickSynth = this.triggerKickSynth.bind(this)

    this.state = {
      tone: 167.1,
      decay: 0.5,
      volume: 1,
      minTone: 41
    }

    this.kickSynth = new Tone.MonoSynth( { oscillator: {type: 'sine'}}).toMaster()
    this.kickSynth.fadeOut = 0.01
    this.frequencyEnvelope = new Tone.ScaledEnvelope( { attack: 0.01, decay: this.state.decay, sustain: 1, release: 0.01 })
    this.frequencyEnvelope.min = this.state.minTone
    this.frequencyEnvelope.max = this.state.tone
    this.frequencyEnvelope.sustain = 0.01
    this.frequencyEnvelope.connect(this.kickSynth.frequency)
  }

  triggerKickSynth(time, value) {
    if (value) {
      this.kickSynth.triggerAttackRelease(1, "16n" )
      this.frequencyEnvelope.triggerAttackRelease()
    }
  }

  render() {
    return (
      <div>
        <Button onClick={()=>{this.triggerKickSynth(0,"C4")}} disabled>Boom</Button>
      </div>
    )
  }
}
