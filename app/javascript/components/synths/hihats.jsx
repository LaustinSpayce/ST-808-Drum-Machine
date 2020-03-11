import React, { Component } from 'react'
import Tone from 'tone'
import Button from '@material-ui/core/Button'
import SquareOscBank from './squareOscBank'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import { ExpansionPanelSummary } from '@material-ui/core'
import SynthControlPanel from '../synthcontrolpanel'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ParameterAdjuster from '../helpers/parameteradjuster'

// Both hats are inside this one class, and using the same synth
// as I want to 'choke' the hat
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

    this.allVariables = [
      ParameterAdjuster('Volume', -32, 6, 0, 0, this.oscBank.changeVolume, 'dB'),
      ParameterAdjuster('Filter Freq', 5000, 10000, 7000, 7000, this.oscBank.changeFilter, 'Hz')
    ]
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

  returnState() {
    this.props.updateState({hihats: this.state})
  }

  render() {
    return (
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='clap-settings-header'
          id='panel1a-header' >
        <Button 
        onClick={
          (event)=>{this.triggerOpenHats(0,'C4')
          event.stopPropagation()
          }}
          onFocus={event => event.stopPropagation()}
          >
            OP
        </Button>
        <Button 
          onClick={
            (event)=>{this.triggerClosedHats(0,'C4')
            event.stopPropagation()
          }} 
          onFocus={event => event.stopPropagation()}
          >
            CL
        </Button>
          <Button disabled>HATS</Button>
        </ExpansionPanelSummary>
        <SynthControlPanel variables={this.allVariables} />
      </ExpansionPanel>
    )
  }
}
