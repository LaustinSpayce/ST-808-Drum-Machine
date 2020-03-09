import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography'
import Slider from '@material-ui/core/Slider'

export default function SynthSlider (props) {
  const [sliderValue, setValue] = useState(props.values.defaultValue)
  const values = props.values

  function onValueChange(event, value) {
    setValue(value)
    props.values.onChange(event, value)
  }

  const sliderMarks = [
    { value: values.minimumValue, 
      label: values.minimumValue + " " + values.unit},
    { value: values.defaultValue,
      label: values.defaultValue + " " + values.unit},
    { value: values.maximumValue,
      label: values.maximumValue + " " + values.unit}
  ]

  return (
    <div>
      <Typography id={values.name} gutterBottom>
        {values.name} {sliderValue} {values.unit}
      </Typography>
        <Slider
        aria-labelledby={values.name}
        value={sliderValue}
        marks={sliderMarks}
        max={values.maximumValue}
        min={values.minimumValue}
        step={values.step ? values.step : 1}
        scale={values.scale ? values.scale : (x => x) }
        onChange={onValueChange}/>
    </div>
  )
}