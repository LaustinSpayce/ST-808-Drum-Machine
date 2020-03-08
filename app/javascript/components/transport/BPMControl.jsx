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
      MIN_BPM: 30
    }


    this.handleBPMChange = this.handleBPMChange.bind(this)
  }
  
  handleBPMChange (event) {
    let newBPM = event.target.value
    if (newBPM < this.state.MAX_BPM && newBPM > this.state.MIN_BPM ) {
      Tone.Transport.bpm.value = newBPM   
    } else if (newBPM > this.state.MAX_BPM) {
      Tone.Transport.bpm.value = this.state.MAX_BPM
    } else if (newBPM < this.state.MIN_BPM) {
      Tone.Transport.bpm.value = this.state.MIN_BPM
    }
      this.setState({ BPM: Tone.Transport.bpm.value })
  }



  render() {
    return (
      <Box>
        <TextField
          id="outlined-number"
          label="BPM"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          defaultValue={this.state.BPM}
          variant="outlined"
          onChange={(event)=>{this.handleBPMChange(event)}}
        />
      </Box>
    )
  }
}
