import React, {Component} from "react";
import dataKey from '../../data/keys.json'
// import ButtonTimeLine from "../buttonsTimeLine/ButtonTimeLine";
import * as Tone from 'tone'
import './style.css'
export default class Timeline extends Component{
    constructor(props){
        super()
        this.state={
            data:dataKey
        }
    }
    render(){
        function createTimline(data){
            const items =[]
            for(let i=0; i<36; i++){
                items.push(createItems(data[i].note))
            }
            
            return(
                items
            )
        }

        function createItems(note){
             
           return(
               <div 
               key={note} 
               onClick={(items)=>{playNote(items)}}
               data-note = {note}
               className="Timelineblocks__items">
                   {
                       createCells()
                   }
               </div>
           )   
    }

    function playNote(items){
        let note = items.currentTarget.dataset.note;
        const synth = new Tone.Synth().toDestination();
        synth.triggerAttackRelease(note, "8n");

    }

    function highlightCell(el){
        el.target.classList.contains('active') ? 
        el.target.classList.remove('active') :
        el.target.classList.add('active')
    }

        function createCells(){
            const aCells =[]
            for(let i=0; i<22; i++){
                aCells.push(<div onClick={(el)=>{highlightCell(el)}} className="Timelineblocks__cells"/>)
            }
           return(aCells)   
    }
        return(
            <>
            {/* <div className='TimelineButtons'> */}
                {/* <ButtonTimeLine/> */}
            {/* </div> */}
            <div className="Timelineblocks">
                {
                    createTimline(this.state.data)
                }
            </div>
            </>
        )
    }
}