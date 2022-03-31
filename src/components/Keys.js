import React,{Component} from "react";
import dataKey from '../data/keys.json'
import * as Tone from 'tone'
import { useState } from "react";
import './Keys.css'
const Keys = ({changeNote})=>{


    const [countKeys,setcountKeys] = useState(64)
    const [data,setData] = useState(dataKey)
    const [isMouseDown,setIsMouseDown] = useState(false)
    const [counter,setCounter] = useState(0)
  

    const pressKeyUp = (oEvent)=>{
        var color = oEvent.target.dataset.color
        oEvent.currentTarget.style.backgroundColor = color;
    }

    const pressKeyDown = (oEvent)=>{
        oEvent.currentTarget.style.backgroundColor="#0437F2"
        const synth = new Tone.Synth().toDestination();
        let note = oEvent.currentTarget.dataset.note
        synth.triggerAttackRelease(note, "8n");
        changeNote(note)
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
                    data.map((el)=>{
                        
                            return(
                          <div style={{height:'20px',display:'flex', border:'1px solid transparent', alignItems:'center'}}>
                             <div className="keyNote" 
                             onMouseDown={pressKeyDown}
                              onMouseUp={pressKeyUp} 
                              onClick={pressKey} 
                              onMouseLeave={pressKeyUp}
                              data-color = {el.colorkey}
                              data-note = {el.note}
                              style={{height:'20px',width:'80px', backgroundColor:el.colorkey, border:'1px solid black'}}/>
                            <h2 className="keyNoteText" style={{display:el.visible}} > {el.note}</h2>
                          </div>
                            
                            
                            )
                    
                    })
                }
            </div>
            </>
        )
    }

    export default Keys