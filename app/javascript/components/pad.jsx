import React, { Component } from 'react'
import Tone from 'tone'
import Box from '@material-ui/core/Box'
import { styled, withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

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
      playing: false,
      activeIndex: 0,
      content: ""
    }

    this.onClick = this.onClick.bind(this)
  }

  onClick() {
    console.log('pad clicked')
    let state = this.state.active
    state = !state
    this.setState({active: state})
    console.log(this.state.active)
    this.props.clicked()
  }

  render () {
    let content = this.props.currentTick === this.props.index ? "X" : ""
    content += this.state.active === true ? "!" : ""
    return (
      <PadBox onClick={() => {this.onClick()}}>{content}</PadBox>
    )
  }
}