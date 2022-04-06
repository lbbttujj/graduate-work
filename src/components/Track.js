import React from "react";
import { useDispatch } from 'react-redux';
import { setInstrument } from '../store/sequencerSlice';
import {Bass, Guitar,Piano} from './Instruments';

import './Track.css'


 const Track = ({changeViewSeqencer,getCurrentSubTrack,nameTrack})=> {

    const dispatch = useDispatch()
    

    const selectInstrument = (oEvent)=>{
        console.log(nameTrack)
        oEvent.stopPropagation()
        switch (oEvent.target.textContent) {
            case 'guitar':
            dispatch(setInstrument({track:nameTrack,instrument:Guitar})) 
                break;
            case 'bass':
            dispatch(setInstrument({track:nameTrack,instrument:Bass})) 
            case 'piano':
            dispatch(setInstrument({track:nameTrack,instrument:Piano})) 
            default:
                break;
        }
    }

    const addSubTrack = (oEvent)=>{
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
            subTrackNumber =  oEvent.target.childNodes.length-1
        }else{
            const arrr = []
                for(let el of oEvent.target.parentElement.childNodes){
                    arrr.push(el)
                }
         subTrackNumber= arrr.findIndex((el)=>el===oEvent.target)
        }

        let CurrentSubTrack = nameTrack + '/' + subTrackNumber

        subTrack.setAttribute("data-name", CurrentSubTrack)  

        
        getCurrentSubTrack(CurrentSubTrack)
        changeViewSeqencer()
    }

    
        return(
            <>
            
            <div onClick={addSubTrack} className="track">
                <button  className="select_instrument_Btn"  style={{left:'300px'}} onClick={selectInstrument}>guitar</button>
                {/* <button className="select_instrument_Btn" style={{left:'250px'}} onClick={selectInstrument}>bass</button> */}
                <button className="select_instrument_Btn" style={{left:'200px'}} onClick={selectInstrument}>piano</button>
            </div>
           
            </>
        )
    }

export default Track