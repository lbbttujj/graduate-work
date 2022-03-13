import React, {Component} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Sequencer from '../Sequencer/Sequencer';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default class AlertDialogSlide extends Component {
constructor(props){
    super()
}
render(){

    return (
        <div>
      {/* <Button variant="outlined" onClick={this.props.handleClickOpen}>
        Slide in alert dialog
      </Button> */}
      <Dialog
       fullWidth={true}
       maxWidth={'xl'}
       open={this.props.openDialog}
        TransitionComponent={Transition}
        keepMounted
       onClose={this.props.handleClose}
       scroll='body'
        // aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Use Google's location service?"}</DialogTitle>
        <DialogContent dividers={false}>
          {/* <DialogContentText id="alert-dialog-slide-description"> */}
          <Sequencer/>
          {/* </DialogContentText> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleClose}>Disagree</Button>
          <Button onClick={this.props.handleClose}>Agree</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
}