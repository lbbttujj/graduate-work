import React, {useState} from "react";
import * as Tone from "tone";
import { useSelector, useDispatch } from "react-redux";
import { changeBpm } from "../store/sequencerSlice";
import Track from "./Track";
import AlertDialogSlide from "./Dialog";
import { Piano } from "./Instruments";
import './AudioStudio.css'
import { playAllTracks } from "./utils/playAllTracks";

 const AudioStudio = ()=>{
    const [openDialog,SetOpenDialog ] = useState(false)
    const bpm = useSelector(state=>state.sequencer.bpm)
    const trackMemory = useSelector(state=>state.sequencer.trackMemory)
    const instruments = useSelector(state=>state.sequencer.currentInstrument)
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

    
    const playAllTracksOffline = ()=>{
        playAllTracks(Tone,trackMemory,instruments,Piano,bpm)
    }
  
    
        return(
            <>
            <div style={{height:'100px'}} className="HeadButtons">
                {/* <button onClick={playAllTracks}>play</button>     */}
                <button onClick={playAllTracksOffline}>play2</button>    
                <span>slider</span>
                <input id='bpm' type="number" min="60" max='300' onChange={(value)=>dispatch(changeBpm(value))} value={bpm} /> 
            </div>

            <Track
                changeViewSeqencer={changeViewSeqencer}
                nameTrack = {'Harmony'}
            />
            <Track
                changeViewSeqencer={changeViewSeqencer}
                nameTrack = {'Melody'}
                /// как добавить новый трек?!. Обязательно должно быть окно с указанием названия
            />
            <div><h2>+</h2></div>

        

            <AlertDialogSlide
                openDialog = {openDialog}
                handleClickOpen = {handleClickOpen}
                handleClose = {handleClose}
                />
            </>

        )
    
}

export default AudioStudio
