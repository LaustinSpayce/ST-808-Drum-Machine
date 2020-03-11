import React, { Component } from 'react'
import Tone from 'tone'
import Button from '@material-ui/core/Button'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import { ExpansionPanelSummary } from '@material-ui/core'
import SynthControlPanel from '../synthcontrolpanel'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'


export default class Clap extends Component {
  constructor(props) {
    super(props)

    this.state = {
      volume: 0,
      filterFrequency: 1000,
      clapDelay: 0.025,
      clapDecay: 0.1
    }

    this.adjustVolume = this.adjustVolume.bind(this)
    this.triggerClapSynth = this.triggerClapSynth.bind(this)
    this.adjustFilterFrequency = this.adjustFilterFrequency.bind(this)
    this.adjustClapDelay = this.adjustClapDelay.bind(this)
    this.adjustClapDecay = this.adjustClapDecay.bind(this)

    this.clapFilter = new Tone.Filter(this.state.filterFrequency, "bandpass").toMaster()
    this.clapSynth = new Tone.NoiseSynth().connect(this.clapFilter)

    this.volumeVariables = {
      name: "Volume",
      minimumValue: -32,
      maximumValue: 6,
      defaultValue: 0,
      currentValue: this.state.volume,
      onChange: this.adjustVolume,
      unit: "dB"
    }

    this.filterVariables = {
      name: "Filter Frequency",
      minimumValue: 500,
      maximumValue: 4000,
      defaultValue: 1000,
      currentValue: this.state.filterFrequency,
      onChange: this.adjustFilterFrequency,
      unit: "Hz"
    }

    this.clapDelayVariables = {
      name: "Clap Delay",
      minimumValue: 0.01,
      maximumValue: 0.1,
      defaultValue: 0.025,
      currentValue: this.state.clapDelay,
      onChange: this.adjustClapDelay,
      unit: "s",
      step: 0.001,
      scale: (x => {Math.pow(10, x)})
    }

    this.clapDecayVariables = {
      name: "Clap Reverb",
      minimumValue: 0.005,
      maximumValue: 0.5,
      defaultValue: 0.1,
      currentValue: this.clapSynth.envelope.decay,
      onChange: this.adjustClapDecay,
      unit: "s",
      step: 0.001
    }

    this.allVariables=[
      this.volumeVariables,
      this.filterVariables,
      this.clapDelayVariables,
      this.clapDecayVariables]
  }

  triggerClapSynth(time, value) {
    if (value) {
      let firstDelay = "+" + this.state.clapDelay
      let secondDelay = "+" + (2 * this.state.clapDelay)
      this.clapSynth.triggerAttackRelease('16n')
      this.clapSynth.triggerAttackRelease('16n', firstDelay )
      this.clapSynth.triggerAttackRelease('16n', secondDelay )
    }
    
  }

  adjustClapDecay(event, value) {
    this.setState({clapDecay: value})
    this.clapSynth.envelope.decay = value
  }

  adjustFilterFrequency(event, value) {
    this.setState({filterFrequency: value})
    this.clapFilter.frequency.value = value
  }

  adjustVolume(event, value) {
    let newVolume = Math.floor(value)
    this.setState( {volume: newVolume } )
    this.clapSynth.volume.linearRampTo(newVolume, '0.01')
  }

  adjustClapDelay(event, value) {
    this.setState({clapDelay: value})
  }

  returnState() {
    this.props.updateState({clap: this.state})
  }

  render() {
    return (
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="clap-settings-header"
          id="panel1a-header" >
          <Button
          onClick={(event) => {
            this.triggerClapSynth(0, 'C4')
            event.stopPropagation()
          }} 
          onFocus={event => event.stopPropagation()}>Clap</Button>
        </ExpansionPanelSummary>
        <SynthControlPanel variables={this.allVariables} />
      </ExpansionPanel>
    )
  }
}
