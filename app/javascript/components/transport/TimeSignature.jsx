import React, { Component } from 'react'
import Tone from 'tone'
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'

export default class TimeSignature extends Component {
  constructor(props) {
    super(props)

    this.state = {
      timeSignature: Tone.Transport.timeSignature
    }
  }

  handleChange(event) {
    console.log('time sig changed')
    let newTimeSignature = parseInt(event.target.value)
    if (newTimeSignature === 3 || newTimeSignature === 4) {
      Tone.Transport.timeSignature = newTimeSignature
      console.log('new time signature')
      this.setState({ timeSignature: newTimeSignature })
      Tone.Transport.loopEnd = '1m'
    } else if (newTimeSignature < 3) {
      this.setState({ timeSignature: 3 })
    } else if (newTimeSignature > 4) {
      this.setState({timeSignature: 4})
    }
  }

  render() {
    return (
      <Box>
        <TextField
          id="outlined-number"
          label="Time Signature"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          value={this.state.timeSignature}
          variant="outlined"
          onChange={(event)=>{this.handleChange(event)}}
        />
      </Box>
    )
  }
}
