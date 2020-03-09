import React, { Component } from 'react'
import Box from '@material-ui/core/Box'
import Tone from 'tone'

export default class TCDisplay extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      currentTC: "0"
    }

    this.updateTC = this.updateTC.bind(this)
    Tone.Transport.scheduleRepeat((time) => {Tone.Draw.schedule(this.updateTC, time)}, '16n')
  }

  updateTC() {
    let currentTC = Tone.Transport.position
    this.setState( { currentTC: currentTC } )
  }
  
  render() {
    return (
      <Box>
        {this.state.currentTC}
      </Box>
    )
  }
}
