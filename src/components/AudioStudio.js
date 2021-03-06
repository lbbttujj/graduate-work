import React, {useState, useEffect, useRef} from "react";
import * as Tone from "tone";
import { useSelector, useDispatch } from "react-redux";
import { changeBpm } from "../store/sequencerSlice";
import Track from "./Track";
import AlertDialogSlide from "./Dialog";
import { Piano } from "./Instruments";
import { playAllTracks } from "./utils/playAllTracks";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Slider from '@mui/material/Slider';
import DialogTitle from '@mui/material/DialogTitle';
import BurgerMenu from './BurgerMenu'
// import { Carousel } from '@trendyol-js/react-carousel';
import API from './utils/API'
import './AudioStudio.css';
import axios from "axios";


 const AudioStudio = ()=>{
    const [openDialog,SetOpenDialog ] = useState(false)
    const [openDialogAddTrack,setOpenDialogAddTrack ] = useState(false)
    const [bpmLocal,setBpmLocal ] = useState(60)
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

    const bpmChange = (oEvent)=>{
        // dispatch(changeBpm(oEvent.target.value))
        // setBpmLocal(oEvent.target.value)
    }
  
    
        return(
            <>
            <div id="HeadButtons">
                <label id='labelSliderBpm'>????????: {bpm} bpm</label>
				<Slider  max={300} value={bpm} min={60} id='sliderBpm' onChange={(value)=>dispatch(changeBpm(value))}  aria-label="Default"  />
                <button id='mainPlayButton' onClick={playAllTracksOffline}>???</button>   
                <button id='mainStopButton'>???</button>   
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
           <Button variant="contained" style={{position:'fixed', right:'120px',bottom:'40px'}} onClick={addTrack}>
        +
      </Button>

      <BurgerMenu/>

        

            <AlertDialogSlide
                openDialog = {openDialog}
                handleClickOpen = {handleClickOpen}
                handleClose = {handleClose}
                />

           
        <Dialog 
        
        open={openDialogAddTrack} onClose={handleCloseAddTrack}>
        <DialogContent sx={{backgroundColor:'white'}}>
          <DialogContentText>
            ?????????????? ?????? ???????????? ??????????
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
        <DialogActions sx={{backgroundColor:'white'}}>
          <Button onClick={handleCloseAddTrack}>??????????????</Button>
          <Button onClick={submitAddTrack}>????????????????</Button>
        </DialogActions>
      </Dialog>

            </>

        )
    
}

export default AudioStudio
