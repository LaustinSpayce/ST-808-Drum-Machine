import React, { useState } from 'react'
import Box from '@material-ui/core/Box'
import Tone from 'tone'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'

const MAX_BPM = 250
const MIN_BPM = 1

const useStyles = makeStyles({
  BPMDisplay: {
    width: '100%',
    height: '100%'
  }
})

export default function BPMControl(props) {
  const [BPM, setBPM] = useState(Tone.Transport.bpm.value)
  const classes = useStyles()

  function handleBPMChange (event) {
    let newBPM = Math.floor(event.target.value)
    if (newBPM < MAX_BPM && newBPM > MIN_BPM ) {
      Tone.Transport.bpm.value = newBPM   
    } else if (newBPM > MAX_BPM) {
      Tone.Transport.bpm.value = MAX_BPM
    } else if (newBPM < MIN_BPM) {
      Tone.Transport.bpm.value = MIN_BPM
    }
    setBPM(Tone.Transport.bpm.value)
  }
  
  function handleKeyPress(event) {
    if (event.key === 'Enter') { handleBPMChange(event) }
  }

  function onInputChange(event) {
    setBPM(event.target.value)
  }

  return (
    <Box>
      <TextField
        className={classes.BPMDisplay}
        id='outlined-number'
        label='BPM'
        type='number'
        value={BPM}
        InputLabelProps={{
          shrink: true,
        }}
        variant='outlined'
        onBlur={(event)=>{handleBPMChange(event)}}
        onChange={(event) => {onInputChange(event)}}
        onKeyPress={handleKeyPress}
      />
    </Box>
  )
}
