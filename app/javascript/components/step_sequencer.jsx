import React, { Component } from 'react'
import Tone from 'tone'
import Button from '@material-ui/core/Button'
import Pad from './pad'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import Clap from './synths/clap'
import Kick from './synths/kick'
import Snare from './synths/snare'
import Cowbell from './synths/cowbell'
import HiHats from './synths/hihats'

export default class StepSequencer extends Component {
  constructor(props) {
    super(props)

    this.closedHatArray = new Array(16).fill(null).map(()=>({ triggered: false }))
    this.openHatArray = new Array(16).fill(null).map(()=>({ triggered: false }))
    this.snareArray = new Array(16).fill(null).map(()=>({ triggered: false }))
    this.kickArray = new Array(16).fill(null).map(()=>({ triggered: false }))
    this.clapArray = new Array(16).fill(null).map(()=>({ triggered: false }))
    this.cowbellArray = new Array(16).fill(null).map(()=>({ triggered: false }))
    this.openHatArray = new Array(16).fill(null).map(()=>({ triggered: false }))

    this.closedHatSeq = new Tone.Sequence((time, value) => {this.triggerHatCl(time, value)}, this.closedHatArray.map((element) => {element.triggered}), "16n")
    this.openHatSeq = new Tone.Sequence((time, value) => {this.triggerHatOp(time, value)}, this.openHatArray.map((element) => {element.triggered}), "16n")
    this.kickSeq = new Tone.Sequence((time, value) => {this.triggerKick(time, value)}, this.kickArray.map((element) => {element.triggered}), "16n")
    this.snareSeq = new Tone.Sequence((time, value) => {this.triggerSnare(time, value)}, this.snareArray.map((element) => {element.triggered}), "16n")
    this.clapSeq = new Tone.Sequence((time, value) => {this.triggerClap(time, value)}, this.kickArray.map((element) => {element.triggered}), "16n")
    this.cowbellSeq = new Tone.Sequence((time, value) => {this.triggerCowbell(time, value)}, this.kickArray.map((element) => {element.triggered}), "16n")
    this.openHatSeq = new Tone.Sequence((time, value) => {this.triggerOpenHat(time, value)}, this.kickArray.map((element) => {element.triggered}), "16n")

  }

  clapClicked(time, index) {
    this.clapSeq.removeAll()
    this.clapArray[index].triggered = !this.clapArray[index].triggered
    let clapSeqArray = this.clapArray.map((element) => (element.triggered))
    this.clapSeq = new Tone.Sequence((time, value) => {this.triggerClap(time, value)}, clapSeqArray, "16n")
    this.clapSeq.start(0)
  }

  triggerClap(time, value) {
    this.refs.clap.triggerClapSynth(time, value)
  }

  kickClicked(time, index) {
    this.kickSeq.removeAll()
    this.kickArray[index].triggered = !this.kickArray[index].triggered
    let kickSeqArray = this.kickArray.map((element) => (element.triggered))
    this.kickSeq = new Tone.Sequence((time, value) => {this.triggerKick(time, value)}, kickSeqArray, "16n")
    this.kickSeq.start(0)
  }

  triggerKick(time, value) {
    this.refs.kick.triggerKickSynth(time, value)
  }

  snareClicked(time, index) {
    this.snareSeq.removeAll()
    this.snareArray[index].triggered = !this.snareArray[index].triggered
    let snareSeqArray = this.snareArray.map((element) => (element.triggered))
    this.snareSeq = new Tone.Sequence((time, value) => {this.triggerSnare(time, value)}, snareSeqArray, "16n")
    this.snareSeq.start(0)
  }

  triggerSnare(time, value) {
    this.refs.snare.triggerSnareSynth(time, value)
  }

  cowbellClicked(time, index) {
    this.cowbellSeq.removeAll()
    this.cowbellArray[index].triggered = !this.cowbellArray[index].triggered
    let cowbellSeqArray = this.cowbellArray.map((element) => (element.triggered))
    this.cowbellSeq = new Tone.Sequence((time, value) => {this.triggerCowbell(time, value)}, cowbellSeqArray, "16n")
    this.cowbellSeq.start(0)
  }

  triggerCowbell(time, value) {
    this.refs.cowbell.triggerCowbellSynth(time, value)
  }

  // Hats are ganged together
  openHatClicked(time, index) {
    this.openHatSeq.removeAll()
    this.openHatArray[index].triggered = !this.openHatArray[index].triggered
    let openHatSeqArray = this.openHatArray.map((element) => (element.triggered))
    this.openHatSeq = new Tone.Sequence((time, value) => {this.triggerOpenHat(time, value)}, openHatSeqArray, "16n")
    this.openHatSeq.start(0)
  }

  closedHatClicked(time, index) {
    this.closedHatSeq.removeAll()
    this.closedHatArray[index].triggered = !this.closedHatArray[index].triggered
    let closedHatSeqArray = this.closedHatArray.map((element) => (element.triggered))
    this.closedHatSeq = new Tone.Sequence((time, value) => {this.triggerClosedHat(time, value)}, closedHatSeqArray, "16n")
    this.closedHatSeq.start(0)
  }

  triggerOpenHat(time, value) {
    this.refs.hihats.triggerOpenHats(time, value)
  }

  triggerClosedHat(time, value) {
    this.refs.hihats.triggerClosedHats(time, value)
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
    let clapPads = this.clapArray.map((state, index) => {
      return <Pad sound='clap' timing={array[index]} index={index} clicked={()=>{this.clapClicked(array[index], index)}}/>
    })

    let closedHatPads = this.closedHatArray.map((state, index) => {
      return <Pad sound='closed hat' timing={array[index]} index={index} clicked={()=>{this.closedHatClicked(array[index], index)}}/>
    })

    let openHatPads = this.openHatArray.map((state, index) => {
      return <Pad sound='open hat' timing={array[index]} index={index} clicked={()=>{this.openHatClicked(array[index], index)}}/>
    })

    let snarePads = this.snareArray.map((state, index) => {
      return <Pad sound='snare' timing={array[index]} index={index} clicked={()=>{this.snareClicked(array[index], index)}}/>
    })

    let kickPads = this.kickArray.map((state, index) => {
      return <Pad sound='kick' timing={array[index]} index={index} clicked={()=>{this.kickClicked(array[index], index)}}/>
    })

    let cowbellPads = this.cowbellArray.map((state, index) => {
      return <Pad sound='cowbell' timing={array[index]} index={index} clicked={()=>{this.cowbellClicked(array[index], index)}}/>
    })

    return (
      <Container fixed>
        <Box boxShadow={3} align="center" margin={"0 auto 1rem auto"}>        
          <Kick ref="kick">Boom</Kick><Clap ref="clap"/><Snare ref="snare"/><Cowbell ref="cowbell"/><HiHats ref="hihats"/>
        </Box>
        <Box boxShadow={3} align="center" padding="1rem">
          <Box>
            <Button variant="outlined" 
              style={
                { margin: '0 8px', width: '96px'}
              }
              onClick={()=>{this.triggerCowbell(0,'C4')}}
              >Moo
            </Button>{cowbellPads}
          </Box>
          <Box>
          <Button variant="outlined" 
            style={
              { margin: '0 8px', width: '96px'}
            }
            onClick={()=>{this.triggerClap(0,'C4')}}
            >Clap
          </Button>{clapPads}
          </Box>
          <Box>
          <Button variant="outlined" 
            style={
              { margin: '0 8px', width: '96px'}
            }
            onClick={()=>{this.triggerOpenHat(0,'C4')}}
            >Tssh
          </Button>{openHatPads}
          </Box>
          <Box>
          <Button variant="outlined" 
            style={
              { margin: '0 8px', width: '96px'}
            }
            onClick={()=>{this.triggerClosedHat(0,'C4')}}
            >Ts
          </Button>{closedHatPads}
          </Box>
          <Box>
          <Button variant="outlined" 
            style={
              { margin: '0 8px', width: '96px'}
            }
            onClick={()=>{this.triggerSnare(0,'C4')}}
            >Piak
          </Button>{snarePads}
          </Box>
          <Box>
          <Button variant="outlined" 
            style={
              { margin: '0 8px', width: '96px'}
            }
            onClick={()=>{this.triggerKick(0, 'C4')}}
            >Boom
          </Button>{kickPads}
          </Box>
        </Box>
      </Container>
    )
  }
}
