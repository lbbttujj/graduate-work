import React,{useEffect} from "react";
import { useSelector } from "react-redux";
import * as Tone from 'tone'

import { useState } from "react";
import './DrumPad.css'
const DrumPad = ({notes})=>{

   
    const [counter,setCounter] = useState(0)
    const [drumsName, setDrumsName] = useState({})
    const currentInstrument = useSelector(state=>state.sequencer.currentSubTrack.selectedInstrument)
    useEffect(()=>{
        let temporarymass ={}
        let t  = notes
        for(let el in t){
            temporarymass[el]= t[el].match(/(?<=\w+\/\w+\/)\w+/g)[0]
        }
        setDrumsName(temporarymass)
        console.log(Object.keys(notes));
        debugger
    },[notes])

    const pressKeyUp = (oEvent)=>{
        // var color = oEvent.target.dataset.color
        oEvent.currentTarget.style.backgroundColor = 'white';
    }

    const pressKeyDown = (oEvent)=>{
        console.log(currentInstrument.data)
        oEvent.currentTarget.style.backgroundColor="#0437F2"
        const synth = new Tone.Sampler({
            urls: currentInstrument.data
          }).toDestination()
        
        let note = oEvent.currentTarget.dataset.note
        synth.triggerAttackRelease(note, "8n");
   
    }

    const pressKey=(oEvent)=>{
    }

    const checkPressDown=(oEvent)=>{
        debugger
    }
    
   

       //Криво надо понять почему вызывается два раза и счетчик это несерьезно
        if(counter==0){
            setCounter(1)
        }
        ///////


        return(
            <>
            <div className="KeyBoard">
                {
                     Object.keys(notes)&&
                    Object.keys(notes).map((el)=>{
                            return(
                          <div style={{height:'75px',display:'flex', border:'1px solid transparent', alignItems:'center'}}>
                             <div className="keyNote" 
                             data-note = {el}
                             onMouseDown={pressKeyDown}
                              onMouseUp={pressKeyUp} 
                              onClick={pressKey} 
                              onMouseLeave={pressKeyUp}
                              style={{height:'75px',width:'90px', border:'1px solid black'}}/>
                            <h2 className="keyNoteTextDrums"> {drumsName[el]}</h2>
                          </div>                           
                        )
                    })
                }
            </div>
            </>
        )
    }

    export default DrumPad