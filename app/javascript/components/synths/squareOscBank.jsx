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

    this.groupFilter = new Tone.Filter(5000, 'highpass', -24).toMaster()

    this.oscBank = this.state.OSC_FREQUENCIES.map((frequency, index) => {
      const osc = new Tone.MonoSynth({oscillator: {type: 'square'}, filter: {type: 'allpass'}
      }).connect(this.groupFilter)
      osc.volume.value = -24
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
