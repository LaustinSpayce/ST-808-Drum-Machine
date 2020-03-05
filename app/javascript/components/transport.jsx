import Tone from 'tone'
import React from 'react'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'


export default class Transport extends React.Component {
  constructor(props) {
    super(props)


    this.state = {
      isPlaying: false,
      timePosition: ""
    }

    this.loopPlay = this.loopPlay.bind(this)
    this.updateTC = this.updateTC.bind(this)

    Tone.Transport.scheduleRepeat((time) => {Tone.Draw.schedule(this.updateTC, time)}, '16n')
  }

  updateTC () {
    let currentTC = Tone.Transport.position
    this.setState({ timePosition: currentTC })
  }

  loopPlay () {
    if (this.state.isPlaying) {
      console.log ('stop playing')
      this.setState({ isPlaying: false })
      Tone.Transport.toggle()
    } else {
      console.log ('start playing')
      this.setState({ isPlaying: true })
      Tone.Transport.toggle()
    }
  }

  render() {
    return (
      <Container>
        <Button onClick={this.loopPlay} color="primary"><PlayArrowIcon/></Button>
        <p>{this.state.timePosition}</p>
      </Container>
    )
  }
}
