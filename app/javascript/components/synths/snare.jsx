import React, { Component } from 'react'
import Tone from 'tone'
import Button from  '@material-ui/core/Button'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import { ExpansionPanelSummary } from '@material-ui/core'
import SynthControlPanel from '../synthcontrolpanel'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ParameterAdjuster from '../helpers/parameteradjuster'

export default class Snare extends Component {
  constructor(props) {
    super(props)

    this.state = {
      frequency: 200,
      volume: 0,
      sineGain: 1,
      decay: 0.1
    }

    this.triggerSnareSynth = this.triggerSnareSynth.bind(this)
    this.adjustVolume = this.adjustVolume.bind(this)
    this.adjustTone = this.adjustTone.bind(this)
    this.adjustDecay = this.adjustDecay.bind(this)
    this.adjustSineGain = this.adjustSineGain.bind(this)

    this.sineGain = new Tone.Gain(this.state.sineGain).toMaster()

    this.snareNoiseSynth = new Tone.NoiseSynth().toMaster()
    this.snareSineSynth = new Tone.MonoSynth( {
      frequency: 200, 
      oscillator: {type: 'sine'}, 
      envelope : {
        attack : 0.005 ,
        decay : 0.1 ,
        sustain : 0.005 ,
        release : 0.025
        }}).connect(this.sineGain)

    this.allVariables = [
      ParameterAdjuster("Volume", -32, 6, 0, this.state.volume, this.adjustVolume, "dB"),
      ParameterAdjuster("Tone", 100, 400, 200, this.state.frequency, this.adjustTone, "Hz", 1),
      ParameterAdjuster("Snap", 0, 2, 1, this.state.sineGain, this.adjustSineGain, "", 0.01),
      ParameterAdjuster("Decay", 0.005, 0.5, 0.1, this.state.decay, this.adjustDecay, "s", 0.001)
    ]
  }

  adjustVolume(event, value) {
    let newVolume = Math.floor(value)
    this.setState( { volume: newVolume } )
    this.snareNoiseSynth.volume.linearRampTo(newVolume, '0.01')
    this.snareSineSynth.volume.linearRampTo(newVolume, '0.01')
  }

  adjustTone(event, value) {
    this.setState( { frequency: value })
    this.snareSineSynth.frequency.value = value
  }

  adjustSineGain(event, value) {
    this.setState( { sineGain: value })
    this.sineGain.gain.linearRampTo(value, '0.01')
  }

  adjustDecay(event, value) {
    this.setState( { decay: value })
    this.snareNoiseSynth.envelope.decay = value
  }

  triggerSnareSynth(time, value) {
    if (value) {
      this.snareNoiseSynth.triggerAttackRelease('16n')
      this.snareSineSynth.triggerAttackRelease(this.state.frequency, '16n')
    }
  }

  render() {
    return (
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="clap-settings-header"
          id="panel1a-header" >
          <Button onClick={(event) => {
            this.triggerSnareSynth(0,'C4')
            event.stopPropagation()
          }}>Piak</Button>
        </ExpansionPanelSummary>
        <SynthControlPanel variables={this.allVariables} />
      </ExpansionPanel>
    )
  }
}
