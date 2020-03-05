import React, { Component } from 'react'
import Tone from 'tone'
import Button from '@material-ui/core/Button'
import Pad from './pad'
import Container from '@material-ui/core/Container'

export default class StepSequencer extends Component {
  constructor(props) {
    super(props)

    this.closedHatArray = new Array(16).fill(null).map(()=>({ triggered: false, active: false }))
    this.openHatArray = new Array(16).fill(null).map(()=>({ triggered: false, active: false }))
    this.snareArray = new Array(16).fill(null).map(()=>({ triggered: false, active: false }))
    this.kickArray = new Array(16).fill(null).map(()=>({ triggered: false, active: false }))

    this.closedHatSeq = new Tone.Sequence((time, value) => {this.props.triggerHatCl(time, value)}, this.closedHatArray.map((element) => {element.triggered}), "16n")
    this.openHatSeq = new Tone.Sequence((time, value) => {this.props.triggerHatOp(time, value)}, this.openHatArray.map((element) => {element.triggered}), "16n")
    this.kickSeq = new Tone.Sequence((time, value) => {this.props.triggerKick(time, value)}, this.kickArray.map((element) => {element.triggered}), "16n")
    this.snareSeq = new Tone.Sequence((time, value) => {this.props.triggerSnare(time, value)}, this.snareArray.map((element) => {element.triggered}), "16n")
  }

  closedHatClicked(time, index) {
    this.closedHatSeq.removeAll()
    this.closedHatArray[index].triggered = !this.closedHatArray[index].triggered
    let closedHatSeqArray = this.closedHatArray.map((element) => (element.triggered))
    this.closedHatSeq = new Tone.Sequence((time, value) => {this.props.triggerHatCl(time, value)}, closedHatSeqArray, "16n")
    this.closedHatSeq.start(0)
  }

  openHatClicked(time, index) {
    this.openHatSeq.removeAll()
    this.openHatArray[index].triggered = !this.openHatArray[index].triggered
    let openHatSeqArray = this.openHatArray.map((element) => (element.triggered))
    this.openHatSeq = new Tone.Sequence((time, value) => {this.props.triggerHatOp(time, value)}, openHatSeqArray, "16n")
    this.openHatSeq.start(0)
  }

  kickClicked(time, index) {
    this.kickSeq.removeAll()
    this.kickArray[index].triggered = !this.kickArray[index].triggered
    let kickSeqArray = this.kickArray.map((element) => (element.triggered))
    this.kickSeq = new Tone.Sequence((time, value) => {this.props.triggerKick(time, value)}, kickSeqArray, "16n")
    this.kickSeq.start(0)
  }

  snareClicked(time, index) {
    this.snareSeq.removeAll()
    this.snareArray[index].triggered = !this.snareArray[index].triggered
    let snareSeqArray = this.snareArray.map((element) => (element.triggered))
    this.snareSeq = new Tone.Sequence((time, value) => {this.props.triggerSnare(time, value)}, snareSeqArray, "16n")
    this.snareSeq.start(0)
  }

  render() {
    let array = []
    let bars = 0
    let beats = 0
    let subbeats = 0
    for (let i = 1; i <= 16; i++) {
      let string = bars + ":" + beats + ":" + subbeats
      array.push(string)
      subbeats++;
      if (subbeats === 4) {
        beats++
        subbeats = 0
        if (beats === 4 ) {
          bars++
          beats = 0
        }
      }
    }

    let closedHatPads = this.closedHatArray.map((state, index) => {
      return <Pad sound='closed hat' timing={array[index]} index={index} whenClicked={()=>{this.closedHatClicked(array[index], index)}}/>
    })

    let openHatPads = this.openHatArray.map((state, index) => {
      return <Pad sound='closed hat' timing={array[index]} index={index} whenClicked={()=>{this.openHatClicked(array[index], index)}}/>
    })

    let snarePads = this.snareArray.map((state, index) => {
      return <Pad sound='closed hat' timing={array[index]} index={index} whenClicked={()=>{this.snareClicked(array[index], index)}}/>
    })

    let kickPads = this.kickArray.map((state, index) => {
      return <Pad sound='closed hat' timing={array[index]} index={index} whenClicked={()=>{this.kickClicked(array[index], index)}}/>
    })

    return (
      <Container>
        <Button onClick={()=>{this.props.triggerHatOp(0,'C4')}}>Tssh</Button>{openHatPads}<br/>
        <Button onClick={()=>{this.props.triggerHatCl(0,'C4')}}>Ts</Button>{closedHatPads}<br/>
        <Button onClick={()=>{this.props.triggerSnare(0,'C4')}}>Piak</Button>{snarePads}<br/>
        <Button onClick={()=>{this.props.triggerKick(0,'C4')}}>Boom</Button>{kickPads}<br/> 
      </Container>
    )
  }

}
