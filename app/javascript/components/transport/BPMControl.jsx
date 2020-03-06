import React, { Component } from 'react'
import Box from '@material-ui/core/Box'
import Tone from 'tone'
import TextField from '@material-ui/core/TextField'

export default class BPMControl extends Component {
  constructor(props) {
    super(props)
    this.state = {
      BPM: Tone.Transport.bpm.value
    }


    this.handleBPMChange = this.handleBPMChange.bind(this)
  }
  
  handleBPMChange (event) {
    let newBPM = event.target.value
    if (newBPM < 250 && newBPM > 30 ) {
      Tone.Transport.bpm.value = newBPM
      this.setState({ BPM: newBPM })
    }
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
