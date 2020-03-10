import React, { useState } from 'react'
import Tone from 'tone'
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles ({
  TimeSigDisplay: {
    width: '100%',
    height: '100%'
  }
})

export default function TimeSignature () {
  const classes = useStyles()
  const [timeSignature, setTimeSignature] = useState(4)

  function handleChange(event) {
    let newTimeSignature = parseInt(event.target.value)
    if (newTimeSignature === 3 || newTimeSignature === 4) {
      Tone.Transport.timeSignature = newTimeSignature
      setTimeSignature(newTimeSignature)
      Tone.Transport.loopEnd = '1m'
    } else if (newTimeSignature < 3) {
      setTimeSignature(3)
    } else if (newTimeSignature > 4) {
      setTimeSignature(4)
    }
  }

  return (
    <Box>
      <TextField
        className={classes.TimeSigDisplay}
        id="outlined-number"
        label="Time Signature"
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
        value={timeSignature}
        variant="outlined"
        onChange={handleChange}
      />
    </Box>
  )
}
