## Project Post Mortem

#### Approach and Process

1. What in my process and approach to this project would I do differently next time?
  - Plan further out in advance the structure of my project
  - Wildly overscoping at the beginning (but being able to cut back on features and still maintain MVP)

1. What in my process and approach to this project went well that I would repeat next time?
  - Having a quick 'proof of concept' done early helped ensure that the project was do-able.
  - Being bale to integrate a whole new library (Tone.js)

#### Code and Code Design

1. What in my code and program design in the project would I do differently next time?
  - Cut everything down into more components, make components as small as possible while still being helpful.
  - Look at step_sequencer.jsx, it's one huge file. Would be much easier to hack everything down into small parts.
  - use less array.map functions as I think they could be computationally taxing and cause audio skips/dropouts.

1. What in my code and program design in the project went well? Is there anything I would do the same next time?
  - The transport, everything is nice and small and self-contained.
  - Only one function needs to be lifted in the trnasport. Very lean and everything else is pretty much self contained.
```
export default function Transport() {
  const [isPlaying, setIsPlaying] = useState(false)

  Tone.Transport.loopEnd = '1m'
  Tone.Transport.loop = true

  function loopPlay() {
    if (isPlaying) {
      setIsPlaying(false)
      Tone.Transport.toggle()
    } else {
      setIsPlaying(true)
      Tone.Transport.toggle()
    }
  }

  function stopPlay() {
    Tone.Transport.stop()
  }

    return (
      <Container maxWidth='lg'>
        <Grid container justify='space-around' spacing={2}>
          <Grid item xs={2}>
            <BPMControl/>
          </Grid>
          <Grid item xs={2}>
            <Shuffle />
          </Grid>
          <Grid item xs={3}>
            <PlayStopPause playToggle={loopPlay} stopButton={stopPlay} />
          </Grid>
          <Grid item xs={3}>
            <TCDisplay isPlaying={isPlaying}/> 
          </Grid>
          <Grid item xs={2}>
            <TimeSignature/>
          </Grid>
        </Grid>
      </Container>
    )
}
```

#### SEI Unit 4 Post Mortem
1. What habits did I use during SEI that helped me, that I will take on to my future coding projects?
- Trying to make readable code, revisiting some code a couple days after I've made it, it's like reading code I've never read before!

2. What habits did I have during SEI I can improve on that I will try to change on future projects?
- Better organisation of my project

3. How is the overall level of the course overall? (instruction, course materials, etc.)
- Feels just about right for me, challenging but not overwhelming!