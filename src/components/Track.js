import React from "react";
import { useDispatch } from 'react-redux';
import { setCurrentSubTrack } from "../store/sequencerSlice";
import { setInstrument } from '../store/sequencerSlice';
import {Bass, Guitar,Piano,Drums} from './Instruments';

import './Track.css'


 const Track = ({changeViewSeqencer,idTrack,nameTrack})=> {

    const dispatch = useDispatch()
    

    const selectInstrument = (oEvent)=>{
        oEvent.stopPropagation()
        switch (oEvent.target.textContent) {
            case 'guitar':
            dispatch(setInstrument({track:nameTrack,instrument:Guitar})) 
            break
            case 'bass':
            dispatch(setInstrument({track:nameTrack,instrument:Bass})) 
            break
            case 'piano':
            dispatch(setInstrument({track:nameTrack,instrument:Piano})) 
            break
            case 'drums':
            dispatch(setInstrument({track:nameTrack,instrument:Drums})) 
            break
            default:
                break;
        }
    }

    const selectSubTrack = (oEvent)=>{

        let subTrack = document.createElement('div');
        subTrack.className='subTrack'
        subTrack.addEventListener('contextmenu',(e)=>{
            e.preventDefault()
            alert('done')
            // выпадающее меню с возможностью удаления прогирывания
        })

        let audio = document.createElement('audio')
        subTrack.appendChild(audio)
        let subTrackNumber

        if(oEvent.target.className =='track'){
            oEvent.target.append(subTrack)
            subTrackNumber =  oEvent.target.childNodes.length-1 //отделить кнопки от трека !!!!!! бесят именна субтреков
        }else{
            const arrr = []
                for(let el of oEvent.target.parentElement.childNodes){
                    arrr.push(el)
                }
         subTrackNumber= arrr.findIndex((el)=>el===oEvent.target)
        }

        let CurrentSubTrack = nameTrack + '/' + subTrackNumber

        subTrack.setAttribute("data-name", CurrentSubTrack)  

        
        dispatch(setCurrentSubTrack(CurrentSubTrack))
        
        changeViewSeqencer()
    }

    
        return(
            <>
            <div id={nameTrack} onClick={selectSubTrack} className="track">
            <div className="label_for_track" for={nameTrack}>{nameTrack}</div>
                <button  className="select_instrument_Btn"  style={{left:'-300px'}} onClick={selectInstrument}>guitar</button>
                <button className="select_instrument_Btn" style={{left:'-250px'}} onClick={selectInstrument}>bass</button>
                <button className="select_instrument_Btn" style={{left:'-200px'}} onClick={selectInstrument}>piano</button>
                <button className="select_instrument_Btn" style={{left:'-350px'}} onClick={selectInstrument}>drums</button>
            </div>
           
            </>
        )
    }

export default Track