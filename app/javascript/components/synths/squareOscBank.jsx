import React, { Component } from 'react'
import Tone from 'tone'

export default class SquareOscBank extends Component {
  constructor(props) {
    super(props)

    this.state = {
      OSC_FREQUENCIES: [263, 400, 421, 474, 587, 845],
      filter: {
        type: 'highpass'
      },
      closedDecay: 0.005,
      openDecay: 0.4,
    }

    this.groupFilter = new Tone.Filter(7000, 'highpass', -24).toMaster()

    this.oscBank = this.state.OSC_FREQUENCIES.map((frequency, index) => {
      const osc = new Tone.MonoSynth({
        oscillator: {type: 'square'}, 
        filter: {type: 'allpass'}, 
        envelope: {
          attack : 0.005,
          decay : 0.02,
          sustain : 0.2,
          release : 0.05

      }
      }).connect(this.groupFilter)
      osc.volume.value = -12
      return osc
    })
  }

  triggerOscillators(time, closed) {
    let releaseTime = closed ? this.state.closedDecay : this.state.openDecay
    this.oscBank.forEach((osc, index) => {
      osc.triggerAttackRelease(this.state.OSC_FREQUENCIES[index], releaseTime)
    })
  }
}
