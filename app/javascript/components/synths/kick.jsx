import React, { Component } from 'react'
import Tone from 'tone'
import Button from '@material-ui/core/Button'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Slider from '@material-ui/core/Slider'
import Grid from '@material-ui/core/Grid'
import ParameterAdjuster from '../helpers/parameteradjuster'
import SynthControlPanel from '../synthcontrolpanel'

export default class Kick extends Component {
  constructor(props) {
    super(props)

    this.triggerKickSynth = this.triggerKickSynth.bind(this)

    this.state = {
      tone: 167.1,
      decay: 0.5,
      volume: 0,
      minTone: 41.20,
      decayLength: {
        minimum: 0.05,
        maximum: 1,
        default: 0.5
      },
      noteLength: {
        minimum: 0.005,
        maximum: 1,
        default: 0.125,
        current: 0.125
      },
      toneLimits: {
        minimum: 20.60,
        maximum: 82.41,
        default: 41.20
      }
    }

    this.adjustTone = this.adjustTone.bind(this)
    this.adjustVolume = this.adjustVolume.bind(this)
    this.triggerKickSynth = this.triggerKickSynth.bind(this)
    this.adjustNoteLength = this.adjustNoteLength.bind(this)
    this.adjustDecay = this.adjustDecay.bind(this)
  
    this.kickSynth = new Tone.MonoSynth( { oscillator: {type: 'sine'}}).toMaster()
    this.kickSynth.fadeOut = 0.01
    this.kickSynth.envelope.release = 0.1
    this.kickSynth.filterEnvelope.decay = 0.01
    this.frequencyEnvelope = new Tone.ScaledEnvelope( { attack: 0.001, decay: this.state.decay, sustain: 1, release: 0.01 })
    this.frequencyEnvelope.min = this.state.minTone
    this.frequencyEnvelope.max = this.state.tone
    this.frequencyEnvelope.sustain = 0.01
    this.frequencyEnvelope.connect(this.kickSynth.frequency)
    this.kickSynth.volume.value = this.state.volume

    this.allVariables = [
      ParameterAdjuster("Volume", -32, 6, 0, this.state.volume, this.adjustVolume, "dB"),
      ParameterAdjuster("Tone Freq", this.state.toneLimits.minimum, this.state.toneLimits.maximum, this.state.minTone, this.state.minTone, this.adjustTone, "Hz", 0.01),
      ParameterAdjuster("Note Length", this.state.noteLength.minimum, this.state.noteLength.maximum, this.state.noteLength.current, this.state.noteLength.current, this.adjustNoteLength, "s", 0.01),
      ParameterAdjuster("Decay Length", this.state.decayLength.minimum, this.state.decayLength.maximum, this.state.decay, this.state.decay, this.adjustDecay, "s", 0.01)
    ]
  }

  triggerKickSynth(time, value) {
    if (value) {
      this.kickSynth.triggerAttackRelease(1, this.state.noteLength.current )
      this.frequencyEnvelope.triggerAttackRelease()
    }
  }

  adjustVolume(event, value) {
    let newVolume = Math.floor(value)
    this.setState( { volume: newVolume } )
    this.kickSynth.volume.linearRampTo(newVolume, '0.001')
  }

  adjustTone(event, value) {
    let newTone = value
    this.setState( { minTone: newTone } )
    this.frequencyEnvelope.min = newTone
  }

  adjustNoteLength(event, value) {
    let noteLength = this.state.noteLength
    let newNoteLength = value
    noteLength.current = newNoteLength
    this.setState( { noteLength: noteLength })
  }

  adjustDecay(event, value) {
    let newDecayLength = value
    this.frequencyEnvelope.decay = newDecayLength
    this.setState( {decay: newDecayLength} )
  }

  returnState() {
    this.props.updateState({kick: this.state})
  }

  render() {
    return (  
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="kick-settings-header"
          id="panel1a-header">
          <Button 
            onClick={(event)=>{
              this.triggerKickSynth(0,"C4")
              event.stopPropagation()
            }}
            onFocus={event => event.stopPropagation()}>Boom</Button>
        </ExpansionPanelSummary>
          <SynthControlPanel variables={this.allVariables} />
      </ExpansionPanel>
    )
  }
}
