import Tone from 'tone'
import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import BPMControl from './transport/BPMControl'
import TimeSignature from './transport/TimeSignature'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Link from '@material-ui/core/Link'
import TCDisplay from './transport/TCDisplay'
import Grid from '@material-ui/core/Grid'
import PlayStopPause from './transport/PlayStopPause'
import Shuffle from './transport/Shuffle'

export default function Transport() {
  const [isPlaying, setIsPlaying] = useState(false)

  Tone.Transport.loopEnd = '1m'
  Tone.Transport.loop = true

  function loopPlay() {
    if (isPlaying) {
      // console.log ('stop playing')
      setIsPlaying(false)
      Tone.Transport.toggle()
    } else {
      // console.log ('start playing')
      // console.log(Tone.Transport.timeSignature)
      // console.log(Tone.Transport.loopEnd)
      setIsPlaying(true)
      Tone.Transport.toggle()
    }
  }

  function stopPlay() {
    Tone.Transport.stop()
  }

    return (
      <Container maxWidth="lg">
        <Grid container justify="space-around" spacing={2}>
          <Grid item xs={2}>
            <BPMControl/>
          </Grid>
          <Grid item xs={2}>
            <Shuffle />
          </Grid>
          <Grid item xs={3}>
            <PlayStopPause playToggle={loopPlay} stopButton={stopPlay} />
          </Grid>
          <Grid item xs={3}>
            <TCDisplay isPlaying={isPlaying}/> 
          </Grid>
          <Grid item xs={2}>
            <TimeSignature/>
          </Grid>
        </Grid>
      </Container>
    )
}
