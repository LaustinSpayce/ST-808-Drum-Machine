import React, { Component } from 'react'
import Tone from 'tone'
import Box from '@material-ui/core/Box'
import { styled, withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

const PadBox = styled(Button)({
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

    this.updateTC = this.updateTC.bind(this)

    Tone.Transport.scheduleRepeat(this.updateTC, '16n')

  }

  updateTC () {
    let index = this.state.activeIndex
    if (index > 15) index = 0
    if (Tone.Transport.state === "stopped") {
      this.setState( {activeIndex: 0, content: "" })
    } else {     
      if (index === this.props.index) {
        index++
        this.setState( {content: "X", activeIndex: index} )
      } else {
        index++
        this.setState( {content:"", activeIndex: index} )
      }
    }
  }

  whenClicked() {
    this.props.clicked()
    let state = this.state
    state = !state
    this.setState({active: state})
  }

  render () {
    return (
      <PadBox onClick={() => {this.props.whenClicked()}}>{this.state.content}</PadBox>
    )
  }
}