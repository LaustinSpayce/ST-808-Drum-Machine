import React, { Component } from 'react'
import Box from '@material-ui/core/Box'
import Tone from 'tone'
import TextField from '@material-ui/core/TextField'

export default class BPMControl extends Component {

  constructor(props) {
    super(props)
    this.state = {
      BPM: Tone.Transport.bpm.value,
      MAX_BPM: 250,
      MIN_BPM: 1
    }


    this.handleBPMChange = this.handleBPMChange.bind(this)
  }
  
  handleBPMChange (event) {
    let newBPM = Math.floor(event.target.value)
    if (newBPM < this.state.MAX_BPM && newBPM > this.state.MIN_BPM ) {
      Tone.Transport.bpm.value = newBPM   
    } else if (newBPM > this.state.MAX_BPM) {
      Tone.Transport.bpm.value = this.state.MAX_BPM
    } else if (newBPM < this.state.MIN_BPM) {
      Tone.Transport.bpm.value = this.state.MIN_BPM
    }
      this.setState({ BPM: Tone.Transport.bpm.value })
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') { this.handleBPMChange(event) }
  }



  render() {
    return (
      <Box>
        <TextField
          id="outlined-number"
          label="BPM"
          type="number"
          defaultValue={this.state.BPM}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          onBlur={(event)=>{this.handleBPMChange(event)}}
          onKeyPress={(event) => {this.handleKeyPress(event)}}
        />
      </Box>
    )
  }
}
