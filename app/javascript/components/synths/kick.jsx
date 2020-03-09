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

    this.volumeMarks = [
      {value: -32, label: '-32dB'},
      {value: 0, label: '0dB'},
      {value: 6, label: '+6dB'}]

    this.toneMarks = [
      {value: this.state.toneLimits.minimum, label: '20Hz (E0)'},
      {value: this.state.toneLimits.default, label: '40Hz (E1)'},
      {value: this.state.toneLimits.maximum, label: '80Hz (E2)'}]
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
        <ExpansionPanelDetails>
          <Grid 
            container 
            spacing={6}
            justify="space-around">
            <Grid item xs={5}>
              <Typography id="volume-slider" gutterBottom>
                Volume: {this.state.volume}
              </Typography>
              <Slider
                aria-labelledby="volume-slider"
                value={this.state.volume}
                scale={x => x ** 6}
                max={6}
                min={-32}
                marks={this.volumeMarks}
                onChange={this.adjustVolume} />
            </Grid>
            <Grid item xs={5}>
              <Typography id="tone-slider" gutterBottom>
                Tone Frequency: {this.state.minTone}
              </Typography>
              <Slider
                aria-labelledby="tone-slider"
                value={this.state.minTone}
                max={this.state.toneLimits.maximum}
                min={this.state.toneLimits.minimum}
                marks={this.toneMarks}
                step={0.01}
                onChange={this.adjustTone} />
            </Grid>
            <Grid item xs={5}>
              <Typography id="note-length" gutterBottom>
                Length: {this.state.noteLength.current}
              </Typography>
              <Slider
                aria-labelledby="note-length"
                value={this.state.noteLength.current}
                max={this.state.noteLength.maximum}
                min={this.state.noteLength.minimum}
                step={0.01}
                onChange={this.adjustNoteLength} />
            </Grid>
            <Grid item xs={5}>
              <Typography id="decay-length" gutterBottom>
                bend: {this.state.decay}
              </Typography>
              <Slider
                aria-labelledby="decay-length"
                value={this.state.decay}
                max={this.state.decayLength.maximum}
                min={this.state.decayLength.minimum}
                step={0.01}
                onChange={this.adjustDecay} />
              </Grid>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    )
  }
}
