import React, { Component } from 'react'
import Tone from 'tone'
import Box from '@material-ui/core/Box'
import { styled, withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

const PadBox = styled(Box)({
  display: 'inline-block',
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
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
      playing: false,
      activeIndex: 0,
      content: ""
    }

  }

  whenClicked() {
    this.props.clicked()
    let state = this.state
    state = !state
    this.setState({active: state})
  }

  render () {
    let content = this.props.currentTick === this.props.index ? "X" : ""
    return (
      <PadBox onClick={() => {this.props.whenClicked()}}>{content}</PadBox>
    )
  }
}