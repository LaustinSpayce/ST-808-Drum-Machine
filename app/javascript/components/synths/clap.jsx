import React, { Component } from 'react'
import Tone from 'tone'
import Button from '@material-ui/core/Button'

export default class Clap extends Component {
  constructor(props) {
    super(props)

    this.triggerClapSynth = this.triggerClapSynth.bind(this)
    this.clapFilter = new Tone.Filter(1000, "bandpass").toMaster()
    this.clapSynth = new Tone.NoiseSynth().connect(this.clapFilter)
  }

  triggerClapSynth(time, value) {
    if (value) {
      this.clapSynth.triggerAttackRelease('16n')
      this.clapSynth.triggerAttackRelease('16n', "+0.025")
      this.clapSynth.triggerAttackRelease('16n', "+0.05")
    }
    
  }


  render() {
    return (
      <div>
        <Button onClick={this.triggerClapSynth} disabled>Clap</Button>
      </div>
    )
  }
}
