import React, { useState, useEffect } from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

export default function LoadDialog(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    if (props.loading) { setOpen(true) }
  }, [props.loading])

  function submitForm() {
    console.log('submit')
  }

  return (
    <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-labelledby='alert-dialog-slide-title'
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogTitle id='alert-dialog-slide-title'>{'Load Song'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-slide-description'>
            Thank you for clicking this button. This action is a work in progress so please check back again soon to load your song!
          </DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            id='number'
            label='Song Number'
            type='number'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={submitForm} color='primary'>
            Hit it!
          </Button>
        </DialogActions>
      </Dialog>
  )
}
