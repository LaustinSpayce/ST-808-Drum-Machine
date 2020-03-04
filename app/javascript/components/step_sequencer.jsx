import React, { Component } from 'react'
import Tone from 'tone'
import Button from '@material-ui/core/Button'

export default class StepSequencer extends Component {

  render() {
    return (
      <div>
        <Button onClick={this.props.triggerHatOp}>Tssh</Button><br />
        <Button onClick={this.props.triggerHatCl}>Ts</Button><br />
        <Button onClick={this.props.triggerSnare}>Piak</Button><br />
        <Button onClick={this.props.triggerKick}>Boom</Button><br />   
      </div>
    )
  }
}
