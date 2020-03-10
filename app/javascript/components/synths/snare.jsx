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
      volume: 0
    }

    this.allVariables = [
      ParameterAdjuster("Volume", -32, 6, 0, this.state.volume, this.adjustVolume, "dB"),

    ]

    this.triggerSnareSynth = this.triggerSnareSynth.bind(this)
    this.adjustVolume = this.adjustVolume.bind(this)



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

  adjustVolume(event, value) {
    let newVolume = Math.floor(value)
    this.setState( { volume: newVolume } )
    this.snareNoiseSynth.volume.linearRampTo(newVolume, '0.01')
    this.snareSineSynth.volume.linearRampTo(newVolume, '0.01')
  }

  triggerSnareSynth(time, value) {
    if (value) {
      this.snareNoiseSynth.triggerAttackRelease('16n')
      this.snareSineSynth.triggerAttackRelease(this.state.frequency, '32n')
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
          event.stopPropogation()
          }}>Piak</Button>
        </ExpansionPanelSummary>
        <SynthControlPanel />
      </ExpansionPanel>
    )
  }
}
