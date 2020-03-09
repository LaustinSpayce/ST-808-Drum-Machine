import React, { useState } from 'react'
import Tone from 'tone'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'
import Slider from '@material-ui/core/Slider'
import Grid from '@material-ui/core/Grid'
import SynthSlider from './synthslider'

export default function SynthControlPanel(props) {

  return (
    <ExpansionPanelDetails>
          <Grid 
            container 
            spacing={6}
            justify="space-around">
            <Grid item xs={5}>
              <SynthSlider values={props.variables[0]} />
            </Grid>
            <Grid item xs={5}>
              <SynthSlider values={props.variables[1]} />
            </Grid>
            <Grid item xs={5}>
              <SynthSlider values={props.variables[2]} />
            </Grid>
            <Grid item xs={5}>
              <SynthSlider values={props.variables[3]} />
              </Grid>
          </Grid>
        </ExpansionPanelDetails>
  )
}