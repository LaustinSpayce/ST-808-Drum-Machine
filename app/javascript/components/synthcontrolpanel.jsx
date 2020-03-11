import React, { useState } from 'react'
import Tone from 'tone'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'
import Slider from '@material-ui/core/Slider'
import Grid from '@material-ui/core/Grid'
import SynthSlider from './synthslider'

export default function SynthControlPanel(props) {

  const panels = props.variables.map((settings, index) => {
    return (
      <Grid item xs={5} key={index}>
        <SynthSlider values={settings} />
      </Grid>
    )
  })

  return (
    <ExpansionPanelDetails>
          <Grid 
            container 
            spacing={6}
            justify='space-around'>
              {panels}
          </Grid>
        </ExpansionPanelDetails>
  )
}