import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography'
import Slider from '@material-ui/core/Slider'

export default function SynthSlider (props) {
  const [sliderValue, setValue] = useState(props.values.defaultValue)

  function onValueChange(event, value) {
    setValue(value)
    props.values.onChange(event, value)
  }

  return (
    <div>
      <Typography id={props.values.name} gutterBottom>
        {props.values.name}
      </Typography>
        <Slider
        aria-labelledby={props.values.name}
        value={sliderValue}
        max={props.values.maximumValue}
        min={props.values.minimumValue}
        onChange={onValueChange}/>
    </div>
  )
}