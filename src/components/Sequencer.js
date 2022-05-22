import React, {useState,useEffect } from "react";
import { useSelector } from "react-redux";
import Keys from "./Keys";
import Timeline from "./Timeline";
import DrumPad from "./DrumPad";
import PlayLine from "./PlayLine";
import ButtonTimeLine from "./ButtonTimeLine";
import DialogSettingsMenu from './DialogSettingsMenu';

import './Sequencer.css'

 const Sequencer = ({setBlobRecordURL,synth,
    // cellsCount
    // release
})=>{
    // const [currentNote,setCurrentNote] = useState('')
    const [play,setPlay] = useState(false)
    const [stop,setStop] = useState(false)
    // const [cellsCount,setCellsCount  ] = useState(16)
    const bpm = useSelector(state=>state.sequencer.bpm)   
    const release = useSelector(state=>state.sequencer.currentSubTrack.currentNoteSize)
    const cellsCount = useSelector(state=>state.sequencer.currentSubTrack.countCells) 
    const cellsWidthDefault = useSelector(state=>state.sequencer.currentSubTrack.cellsWidthDefault) 
    const selectedChord = useSelector(state=>state.sequencer.currentSubTrack.currentChord)
    const isChordMode = useSelector(state=>state.sequencer.currentSubTrack.isChordsUsed)  //Выбранный в этот момент субтрек
    const selectedInstrument = useSelector(state=>state.sequencer.currentSubTrack.selectedInstrument)
    const Instruments = useSelector(state=>state.sequencer.currentInstrument)
    const [noteInChord,setNoteInChord] = useState(null)

  

    const changePlay=()=>{
        if(play){
            setPlay(false)
        } else{
            setPlay(true)
            setStop(false)
        }
    }

    const stopMusic=()=>{
        setPlay(false)
        setStop(true)
    }

    // const changeNote = (note)=>{
    //     setCurrentNote(note)
    // }

    const getBlobRecordURL = (blobValue)=>{
        setBlobRecordURL(blobValue)
    }

    const onMouseOver = (oEvent)=>{
        
    if(isChordMode){
        let currentColumn = []
        let currentNoteInChord =[]
        let HorizontalIndex
        let currentCellHorizontal = null

        let bro = oEvent.target.parentElement.childNodes
        let aBro =[]
        for(let el of bro){
            aBro.push(el)
        }
        HorizontalIndex = aBro.findIndex((el=>el==oEvent.target))
        currentCellHorizontal = aBro[HorizontalIndex]
        
        let verticalIndex
        const items = document.getElementsByClassName('Timelineblocks__items')
        for(let el of items){
            currentColumn.push(el.childNodes[HorizontalIndex])
        }
        verticalIndex = currentColumn.findIndex((el=>el===currentCellHorizontal))
        
        if(!selectedChord){
            setNoteInChord(null)
            currentColumn[verticalIndex].style.opacity=1

        }else{
            let aCurrentStupeni = selectedChord.application.split('/')
            currentColumn[verticalIndex].style.opacity='100%'
        for(let el of aCurrentStupeni){
            let note = verticalIndex - +el
            currentColumn[note].style.opacity='100%'
            currentNoteInChord.push(currentColumn[note])
        }
        setNoteInChord(currentNoteInChord)
    }
    }else{
        oEvent.target.style.opacity='100%'
        setNoteInChord(null)

    }
    }

    const onMouseOut =(oEvent)=>{
        if(isChordMode){
            const aCells = document.getElementsByClassName('Timelineblocks__cells')
            for(let el of aCells){
                if(!el.classList.contains('active'))
                el.style.opacity="50%"
            }
        }else{
            if(!oEvent.target.classList.contains('active'))
            oEvent.target.style.opacity='50%'
        }
    }
        
    

  
        return(
        <>
            <div className="sequencer">

            <div id='mainStageContent' style={{'display':'flex'}}>
            <div className="mainStageSequencer">

                {selectedInstrument.noteType=='drums'?
                <DrumPad 
                // changeNote = {changeNote}
                notes = {selectedInstrument.data}/>:
                <Keys
                // changeNote = {changeNote}
                />
                }
                <Timeline
                     play = {play}
                     stop = {stop}
                     valueBpm={bpm}
                     countCells={cellsCount}
                     cellsCount ={cellsCount}
                     getBlobRecordURL={getBlobRecordURL}
                     forcedStop = {stopMusic}
                     synth = {synth}
                     release= {release}
                     cellsWidthDefault={cellsWidthDefault}
                     onMouseOver={onMouseOver}
                     onMouseOut={onMouseOut}
                     noteInChord={noteInChord}
                     selectedInstrument = {selectedInstrument}
                     />
                <PlayLine
                    play = {play}
                    stop = {stop}
                    release= {release}
                    bpm = {bpm}
                    cellsWidthDefault={cellsWidthDefault}
                    cellsCount ={cellsCount}
                    />
            </div>
            <DialogSettingsMenu/>
            </div>
            <div className="sequencerButtons">    
                <ButtonTimeLine
                    changePlay = {changePlay}
                    stopMusic={stopMusic}
                    />
            </div> 
            
            </div>
        </>
        )
    
}
export default Sequencer