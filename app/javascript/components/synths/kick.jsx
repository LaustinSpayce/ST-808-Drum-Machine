import React, { Component } from 'react'
import Tone from 'tone'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

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
      volume: 1,
      minTone: 41
    }

    this.kickSynth = new Tone.MonoSynth( { oscillator: {type: 'sine'}}).toMaster()
    this.kickSynth.fadeOut = 0.01
    this.frequencyEnvelope = new Tone.ScaledEnvelope( { attack: 0.001, decay: this.state.decay, sustain: 1, release: 0.01 })
    this.frequencyEnvelope.min = this.state.minTone
    this.frequencyEnvelope.max = this.state.tone
    this.frequencyEnvelope.sustain = 0.01
    this.frequencyEnvelope.connect(this.kickSynth.frequency)
  }

  triggerKickSynth(time, value) {
    if (value) {
      this.kickSynth.triggerAttackRelease(1, "16n" )
      this.frequencyEnvelope.triggerAttackRelease()
    }
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
          Here are the settings for Boom Boom Pow
        </ExpansionPanelDetails>
      </ExpansionPanel>
    )
  }
}
