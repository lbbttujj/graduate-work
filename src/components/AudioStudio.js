import React, {useState,useRef} from "react";
import * as Tone from "tone";
import { useSelector, useDispatch } from "react-redux";
import { changeBpm } from "../store/sequencerSlice";
import Track from "./Track";
import AlertDialogSlide from "./Dialog";
import { Piano } from "./Instruments";
import { playAllTracks } from "./utils/playAllTracks";
import Button from '@mui/material/Button';
import DialogAddTrack from "./DialogAddTrack";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import './AudioStudio.css'


 const AudioStudio = ()=>{
    const [openDialog,SetOpenDialog ] = useState(false)
    const [openDialogAddTrack,setOpenDialogAddTrack ] = useState(false)
    const bpm = useSelector(state=>state.sequencer.bpm)
    const trackMemory = useSelector(state=>state.sequencer.trackMemory)
    const instruments = useSelector(state=>state.sequencer.currentInstrument)
    const [tracksName,setTracksName]= useState(['Harmony', 'Melody'])
    const [valueNameTrack,setValueNameTrack]= useState('')
    const TracksContainer = useRef(null);

    const dispatch = useDispatch()

    const handleClickOpen = ()=>{
        SetOpenDialog(true)
    }

    const handleClose = ()=>{
        SetOpenDialog(false)
    }
    const handleCloseAddTrack = ()=>{
        setOpenDialogAddTrack(false)
    }

    const changeViewSeqencer=()=>{
        handleClickOpen()
    }

    
    const playAllTracksOffline = ()=>{
        playAllTracks(Tone,trackMemory,instruments,Piano.data,bpm)
    }

    const addTrack = ()=>{
        setOpenDialogAddTrack(true)
    }

    const submitAddTrack = ()=>{
       
        handleCloseAddTrack()
        setValueNameTrack('')
        let copy = Object.assign([], tracksName);
        copy.push(valueNameTrack);
        setTracksName(copy);
    }

    const changeValueNameTrack = (oEvent)=>{
        setValueNameTrack(oEvent.target.value)
    }
  
    
        return(
            <>
            <div style={{height:'100px'}} className="HeadButtons">
                {/* <button onClick={playAllTracks}>play</button>     */}
                <button onClick={playAllTracksOffline}>play2</button>    
                <span>slider</span>
                <input id='bpm' type="number" min="60" max='300' onChange={(value)=>dispatch(changeBpm(value))} value={bpm} /> 
            </div>

            <div id='Tracks' ref={TracksContainer}>
                {tracksName.map((track)=>{
                    return (
                        <Track
                        changeViewSeqencer={changeViewSeqencer}
                        nameTrack = {track}
                        idTrack = {track + Math.floor(Math.random()*10000)}
                        />
                    )
                })}
        
            </div>
           <Button variant="contained" style={{position:'fixed', right:'130px'}} onClick={addTrack}>
        +
      </Button>

        

            <AlertDialogSlide
                openDialog = {openDialog}
                handleClickOpen = {handleClickOpen}
                handleClose = {handleClose}
                />

           
        <Dialog open={openDialogAddTrack} onClose={handleCloseAddTrack}>
        <DialogContent>
          <DialogContentText>
            Введите имя нового трека
          </DialogContentText>
          <TextField
            autoFocus
            value={valueNameTrack}
            onChange={changeValueNameTrack}
            margin="dense"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Закрыть</Button>
          <Button onClick={submitAddTrack}>Добавить</Button>
        </DialogActions>
      </Dialog>
            </>

        )
    
}

export default AudioStudio
