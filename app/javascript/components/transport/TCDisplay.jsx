import React, { Component, useState, useEffect } from 'react'
import Box from '@material-ui/core/Box'
import Tone from 'tone'

export default function DisplayTC(props) {
  const [currentTC, setTC] = useState(0)

  useEffect(() => {
    Tone.Transport.scheduleRepeat((time) => {setTC(Tone.Transport.position)}, '16n')
  }, [])

  return (
    <Box>
      {currentTC}
    </Box>
  )
}
