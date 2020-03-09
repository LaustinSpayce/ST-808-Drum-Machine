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
      volume: 0
    }

    this.adjustVolume = this.adjustVolume.bind(this)
    this.triggerClapSynth = this.triggerClapSynth.bind(this)


    this.clapFilter = new Tone.Filter(1000, "bandpass").toMaster()
    this.clapSynth = new Tone.NoiseSynth().connect(this.clapFilter)

    this.volumeVariables = {
      name: "Volume",
      minimumValue: -32,
      maximumValue: 6,
      defaultValue: 0,
      currentValue: 0,
      onChange: this.adjustVolume
    }

    this.allVariables=[this.volumeVariables,null,null,null]
  }

  triggerClapSynth(time, value) {
    if (value) {
      this.clapSynth.triggerAttackRelease('16n')
      this.clapSynth.triggerAttackRelease('16n', "+0.025")
      this.clapSynth.triggerAttackRelease('16n', "+0.05")
    }
    
  }

    adjustVolume(event, value) {
      let newVolume = Math.floor(value)
      this.setState( {volume: newVolume } )
      this.clapSynth.volume.linearRampTo(newVolume, '0.01')
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
