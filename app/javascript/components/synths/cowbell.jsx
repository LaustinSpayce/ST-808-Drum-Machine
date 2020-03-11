import React, { Component } from 'react'
import Tone from 'tone'
import Button from '@material-ui/core/Button'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import { ExpansionPanelSummary } from '@material-ui/core'
import SynthControlPanel from '../synthcontrolpanel'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ParameterAdjuster from '../helpers/parameteradjuster'

export default class Cowbell extends Component {

  // highFreq: 800,
  // lowFreq: 540

  constructor (props) {
    super(props)
    
    this.state = {
      volume: 0,
      highFreq: 835,
      lowFreq: 555,
      ENVELOPE: {
        attack : 0.005 ,
        decay : 0.05 ,
        sustain : 0.1 ,
        release : 0.3
        },
      FILTER_ENVELOPE: {
        attack : 0.06 ,
        decay : 0.06 ,
        sustain : 0.5 ,
        release : 2 ,
        baseFrequency : 20000,
        octaves : 7 ,
        exponent : 2,
      },
      BandPassFilterCutoff: 2640,
      cowbellLength: 0.1,
      frequencyRatio: 1.504,
    }

    this.triggerCowbellSynth = this.triggerCowbellSynth.bind(this)
    this.adjustVolume = this.adjustVolume.bind(this)
    this.adjustLength = this.adjustLength.bind(this)
    this.adjustFrequency = this.adjustFrequency.bind(this)
    this.adjustFrequencyRatio = this.adjustFrequencyRatio.bind(this)
    
    this.bandPassFilter = new Tone.Filter( this.state.BandPassFilterCutoff, "bandpass" ).toMaster()

    this.cowbellSynthLow = new Tone.MonoSynth( { oscillator: {type: 'square'}, envelope: this.state.ENVELOPE, filterEnvelope: this.state.FILTER_ENVELOPE}).connect(this.bandPassFilter)
    this.cowbellSynthLow.filter.type = 'allpass'
    this.cowbellSynthHigh = new Tone.MonoSynth( { oscillator: {type: 'square'}, envelope: this.state.ENVELOPE, filterEnvelope: this.state.FILTER_ENVELOPE}).connect(this.bandPassFilter)
    this.cowbellSynthHigh.filter.type = 'allpass'

    this.allVariables = [
      ParameterAdjuster("Volume", -32, 6, 0, this.state.volume, this.adjustVolume, "dB"),
      ParameterAdjuster("Length", 0.05, 0.5, 0.1, this.state.cowbellLength, this.adjustLength, 's', 0.005),
      ParameterAdjuster("Base Frequency", 400, 800, 555, this.state.lowFreq, this.adjustFrequency, 'Hz', 10),
      ParameterAdjuster("Frequency Ratio", 1, 2, 1.504, this.state.frequencyRatio, this.adjustFrequencyRatio, "", 0.001)
    ]
  }

  adjustFrequencyRatio(event, value) {
    let newHighFreq = this.state.lowFreq * value
    this.setState( { highFreq: newHighFreq, frequencyRatio: value })
  }

  adjustVolume(event, value) {
    let newVolume = Math.floor(value)
    this.setState( { volume: newVolume } )
    this.cowbellSynthLow.volume.linearRampTo(newVolume, '0.01')
    this.cowbellSynthHigh.volume.linearRampTo(newVolume, '0.01')
  }

  adjustLength(event, value) {
    this.setState( { cowbellLength: value } )
  }
  
  adjustFrequency(event, value) {
    let newHighFreq = value * this.state.frequencyRatio
    this.setState( { lowFreq: value, highFreq: newHighFreq })
  }


  triggerCowbellSynth(time, value) {
    if (value) {
      this.cowbellSynthLow.triggerAttackRelease(this.state.lowFreq, this.state.cowbellLength)
      this.cowbellSynthHigh.triggerAttackRelease(this.state.highFreq, this.state.cowbellLength)
    }
  }

  returnState() {
    this.props.updateState({cowbell: this.state})
  }

  render() {
    return (
      <ExpansionPanel>
        <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="clap-settings-header"
            id="panel1a-header" >
          <Button onClick={(event)=>{
            this.triggerCowbellSynth(0,"C4")
            event.stopPropagation()
          }}>Moo</Button>
        </ExpansionPanelSummary>
        <SynthControlPanel variables={this.allVariables} />
      </ExpansionPanel>
    )
  }
}
