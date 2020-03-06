import React, { Component } from 'react'
import Tone from 'tone'
import Box from '@material-ui/core/Box'
import { styled, withStyles } from '@material-ui/core/styles'
import { palette } from '@material-ui/system';

const PadBox = styled(Box)({
  display: 'inline-block',
  border: '2px solid black',
  borderRadius: 3,
  color: 'black',
  height: 48,
  width: 48,
  padding: '2px',
  margin: '4px'
});

export default class Pad extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      active: false,
    }

    this.onClick = this.onClick.bind(this)
  }

  onClick() {
    let state = this.state.active
    state = !state
    this.setState({active: state})
    this.props.clicked()
  }

  render () {
    let color = this.props.currentTick === this.props.index ? "success.main" : "text.secondary"
    color = this.state.active === true ? "warning.main" : color
    return (
      <PadBox onClick={() => {this.onClick()}} bgcolor={color}></PadBox>
    )
  }
}