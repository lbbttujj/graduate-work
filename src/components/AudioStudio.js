import React, {useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeBpm } from "../store/sequencerSlice";
import Track from "./Track";
import AlertDialogSlide from "./Dialog";
import './AudioStudio.css'


 const AudioStudio = ()=>{
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
        // проигрыване без записей
    }

  
    
        return(
            <>
            <div style={{height:'100px'}} className="HeadButtons">
                <button onClick={playAllTracks}>play</button>    
                <span>slider</span>
                <input id='bpm' type="number" min="60" max='300' onChange={(value)=>dispatch(changeBpm(value))} value={bpm} /> 
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