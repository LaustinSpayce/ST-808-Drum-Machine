import React from 'react'

export default function ParameterAdjuster(name, 
  minimumValue, maximumValue, defaultValue,
  currentValue, onChange, unit, step, scale) {

  return (
    {
      name: name,
      minimumValue: minimumValue,
      maximumValue: maximumValue,
      defaultValue: defaultValue,
      currentValue: currentValue,
      onChange: onChange,
      unit: unit,
      step: step ? step : 1,
      scale: scale ? scale : ( x => x )
    }
  )
}
