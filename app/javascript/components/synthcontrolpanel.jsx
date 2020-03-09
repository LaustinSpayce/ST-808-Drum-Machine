import React, { useState } from 'react'
import Tone from 'tone'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'
import Slider from '@material-ui/core/Slider'
import Grid from '@material-ui/core/Grid'
import SynthSlider from './synthslider'

const myFunction = () => { console.log('my function!') }

const sampleData = [
  {
    name: "Volume from sampleData",
    minimumValue: -32,
    maximumValue: 6,
    defaultValue: 0,
    currentValue: 0,
    onChange: myFunction()
  },
  {
    name: "Tone Frequency",
    minimumValue: -32,
    maximumValue: 6,
    defaultValue: 0,
    currentValue: 0,
    onChange: myFunction()
  },
  {
    name: "Volume",
    minimumValue: -32,
    maximumValue: 6,
    defaultValue: 0,
    currentValue: 0,
    onChange: myFunction()
  },
  {
    name: "Volume",
    minimumValue: -32,
    maximumValue: 6,
    defaultValue: 0,
    currentValue: 0,
    onChange: myFunction()
  }
]

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
              {/* <Typography id="decay-length" gutterBottom>
                bend: {this.state.decay}
              </Typography>
              <Slider
                aria-labelledby="decay-length"
                value={this.state.decay}
                max={this.state.decayLength.maximum}
                min={this.state.decayLength.minimum}
                step={0.01}
                onChange={this.adjustDecay} /> */}
              </Grid>
          </Grid>
        </ExpansionPanelDetails>
  )
}