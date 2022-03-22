import React, {Component, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeBpm } from "../../store/sequencerSlice";
import Sequencer from "../Sequencer/Sequencer";
import Track from "../track/Track";
import ButtonTimeLine from "../buttonsTimeLine/ButtonTimeLine";
import AlertDialogSlide from "../dialog/Dialog";
import Fab from '@mui/material/Fab';
import './style.css'


 const AudioStudio = ()=>  {
    const [openDialog,SetOpenDialog ] = useState(false)
    const [currentSubTrack, setCurrentSubTrack] = useState(null)
    
    const bpm = useSelector(state=>state.sequencer.bpm)
    const dispatch = useDispatch()

    const handleClickOpen = ()=>{
        SetOpenDialog(true)
    }

    const handleClose = ()=>{
        SetOpenDialog(false)
    }

    const changeViewSeqencer=()=>{
        handleClickOpen()
    }

    const getCurrentSubTrack = (oValue)=>{
        setCurrentSubTrack(oValue)
    }

    const playAllTracks = ()=>{
        for(let el of document.getElementsByClassName('track')){
            el.childNodes[0].childNodes[0].play()
        }
    }

  
    
        return(
            <>
            <div style={{height:'100px'}} className="HeadButtons">
                <button onClick={playAllTracks}>play</button>    
                <span>slider</span>
                <input id='bpm' type="number" min="60" max='300' onChange={(value)=>dispatch(changeBpm(value))} value={bpm} /> 
                <audio  id="audioFile"></audio>
                <audio  id="audioFile1"></audio>
            </div>
            <Track
                changeViewSeqencer={changeViewSeqencer}
                getCurrentSubTrack = {getCurrentSubTrack}
                nameTrack = {'Harmony'}
            />
            <Track
                changeViewSeqencer={changeViewSeqencer}
                getCurrentSubTrack={getCurrentSubTrack}
                nameTrack = {'Melody'}
            />
            {/* <Fab className='addTrackButton' color="primary" aria-label="add">
                + 
            </Fab>  */}
            
            

            <AlertDialogSlide
                openDialog = {openDialog}
                handleClickOpen = {handleClickOpen}
                handleClose = {handleClose}
                currentSubTrack = {currentSubTrack}
                />
            </>

        )
    
}

export default AudioStudio