import React, {useState } from "react";
import { useSelector } from "react-redux";
import Keys from "./Keys";
import Timeline from "./Timeline";
import PlayLine from "./PlayLine";
import ButtonTimeLine from "./ButtonTimeLine";
import './Sequencer.css'

 const Sequencer = ({setBlobRecordURL})=>{
    const [currentNote,setCurrentNote] = useState('')
    const [play,setPlay] = useState(false)
    const [stop,setStop] = useState(false)
    const [cellsCount,setCellsCount  ] = useState(4)
    const bpm = useSelector(state=>state.sequencer.bpm)    


    const changeCountCells=(bMoreCells)=>{
        let widthTimeLine = document.getElementsByClassName('Timelineblocks')[0]
        let currentPercent = Number(widthTimeLine.style.width.match(/\d+(?=%)/)[0])
        if(bMoreCells){
            if(cellsCount<40){
                setCellsCount(cellsCount+4)
                
                if(cellsCount>=24){
                    //надо сделать точнее в относительных единицах
                widthTimeLine.style.width=currentPercent+17+'%'
                }
            }
        }else{
            if(cellsCount>4){
                setCellsCount (cellsCount-4)
                if(cellsCount>24){
                    widthTimeLine.style.width=currentPercent-17+'%'
                }
            }

        }
    }  


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

    const changeNote = (note)=>{
        setCurrentNote(note)
    }

    const getBlobRecordURL = (blobValue)=>{
        setBlobRecordURL(blobValue)
    }

    

  
        return(
        <>
            <div className="sequencer">

            <div className="mainStageSequencer">
                <Keys
                    changeNote = {changeNote}
                    />
                <Timeline
                     play = {play}
                     stop = {stop}
                     valueBpm={bpm}
                     countCells={cellsCount}
                     cellsCount ={cellsCount}
                     getBlobRecordURL={getBlobRecordURL}
                     forcedStop = {stopMusic}
                     />
                <PlayLine
                    play = {play}
                    stop = {stop}
                    bpm = {bpm}
                    cellsCount ={cellsCount}
                    />
            </div>
            <div className="SettingButtons">    
                <ButtonTimeLine
                    changePlay = {changePlay}
                    stopMusic={stopMusic}
                    changeCountCells={changeCountCells}
                    />
            </div> 
            
            </div>
        </>
        )
    
}
export default Sequencer