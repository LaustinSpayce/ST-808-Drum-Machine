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
      filterFreq: 7000
    }

    this.groupFilter = new Tone.Filter(this.state.filterFreq, 'highpass', -24).toMaster()

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

    this.changeVolume = this.changeVolume.bind(this)
    this.changeFilter = this.changeFilter.bind(this)
  }

  triggerOscillators(time, closed) {
    let releaseTime = closed ? this.state.closedDecay : this.state.openDecay
    this.oscBank.forEach((osc, index) => {
      osc.triggerAttackRelease(this.state.OSC_FREQUENCIES[index], releaseTime)
    })
  }

  changeVolume(event, value) {
    let adjustedValue = value - 12;
    this.oscBank.forEach((osc, index) => {
      osc.volume.linearRampTo(adjustedValue, '0.01')
    })
  }

  changeFilter(event, value) {
    this.groupFilter.frequency.linearRampTo(value, '0.01')
  }
}
