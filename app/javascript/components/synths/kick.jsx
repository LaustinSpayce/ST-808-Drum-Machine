import React, { Component } from 'react'
import Tone from 'tone'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Slider from '@material-ui/core/Slider'
import Grid from '@material-ui/core/Grid'


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default class Kick extends Component {
  constructor(props) {
    super(props)


    this.triggerKickSynth = this.triggerKickSynth.bind(this)

    this.state = {
      tone: 167.1,
      decay: 0.02,
      volume: 0,
      minTone: 41
    }

    this.adjustTone = this.adjustTone.bind(this)
    this.adjustVolume = this.adjustVolume.bind(this)
    this.triggerKickSynth = this.triggerKickSynth.bind(this)
  
    this.kickSynth = new Tone.MonoSynth( { oscillator: {type: 'sine'}}).toMaster()
    this.kickSynth.fadeOut = 0.01
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
      {value: -32, label: '-32dB'},
      {value: 0, label: '0dB'},
      {value: 6, label: '+6dB'}]
  }

  triggerKickSynth(time, value) {
    if (value) {
      this.kickSynth.triggerAttackRelease(1, "16n" )
      this.frequencyEnvelope.triggerAttackRelease()
    }
  }

  adjustVolume(event, value) {
    let newVolume = Math.floor(value)
    this.setState( { volume: newVolume } )
    this.kickSynth.volume.value = newVolume
  }

  adjustTone(event, value) {
    let newTone = value
    this.setState( { tone: newTone } )
    this.frequencyEnvelope.max = newTone
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
              onChange={this.adjustVolume} /><br/>
            <Typography id="tone-slider" gutterBottom>
              Tone Frequency: {this.state.tone}
            </Typography>
            <Slider
              aria-labelledby="tone-slider"
              value={this.state.tone}
              max={200}
              min={100}
              marks={this.toneMarks}
              onChange={this.adjustTone} /><br/>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    )
  }
}
