import React, { Component } from 'react'
import Tone from 'tone'
import Button from '@material-ui/core/Button'
import { styled } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const MyTable = styled(TableContainer)({
  background: 'linear-gradient(45deg, #054A7D 30%, #7F9DAC 90%)',
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px',
  color: 'white',
  textAlign: 'center',
});

const SpecialCells = styled(TableCell)({
  border: '1px solid white',
  align: 'center',
  textAlign: 'center',
  color: 'white',
  height: '40px',
  width: '40px'
})

const InstrumentButton = styled(Button)({
  color: 'white'
})

export default class StepSequencer extends Component {

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

    let headerCells = array.map((number)=>{
      return (<SpecialCells>{number.slice(2)}</SpecialCells>)
    },

    ) 
    let blankCells = array.map((number, index) => {
      return(<SpecialCells key={number} id={index}></SpecialCells>)
    })

    return (
      <Container> 
        <MyTable>
          <Table size="small">
            <TableHead>
              <TableRow>
                  <SpecialCells align="center">Inst</SpecialCells>
                  {headerCells}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <SpecialCells>
                  <InstrumentButton onClick={this.props.triggerHatOp}>Tssh</InstrumentButton>
                </SpecialCells>
                  {blankCells}
              </TableRow>
              <TableRow>
                <SpecialCells>
                  <InstrumentButton onClick={this.props.triggerHatCl}>Ts</InstrumentButton>
                </SpecialCells>
                  {blankCells}
              </TableRow>
              <TableRow>
                <SpecialCells>
                  <InstrumentButton onClick={this.props.triggerSnare}>Piak</InstrumentButton>
                </SpecialCells>
                  {blankCells}
              </TableRow>
              <TableRow>
                <TableCell>
                  <InstrumentButton onClick={this.props.triggerKick}>Boom</InstrumentButton> 
                </TableCell>
                  {blankCells}
              </TableRow>
            </TableBody>
          </Table>
        </MyTable>
      </Container>
    )
  }
}
