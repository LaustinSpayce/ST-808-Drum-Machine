import React, { useState, useEffect } from 'react'
import Box from '@material-ui/core/Box'
import Tone from 'tone'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import Slider from '@material-ui/core/Slider'
import Typography from '@material-ui/core/Typography'

const MIN_SWING = 0
const MAX_SWING = 1

const useStyles = makeStyles({
  Shuffle: {
    width: '100%',
    height: '100%'
  }
})

export default function Shuffle() {
  const [swing, setSwing] = useState(Tone.Transport.swing)
  const classes = useStyles()

  function handleShuffleChange (event, value) {
    setSwing(value)
    Tone.Transport.swing = value
  }

  useEffect(() => {
    Tone.Transport.swingSubdivision = "8n"
  }, [])

  return (
    <Box>
      <Typography id="shuffle slider" gutterBottom>
        Shuffle
      </Typography>
      <Slider
        className={classes.Shuffle}
        value={swing}
        onChange={handleShuffleChange}
        max={MAX_SWING}
        min={MIN_SWING}
        step={0.01}
        />
    </Box>
  )
}
