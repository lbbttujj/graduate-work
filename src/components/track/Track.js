import React, {Component} from "react";
import './style.css'


 const Track = ({changeViewSeqencer,getCurrentSubTrack,nameTrack})=> {
   

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

            </div>
            </>
        )
    }

export default Track