import React, {Component} from "react";
import dataKey from '../data/keys.json'
import * as Tone from 'tone'
// import { onMouseOver } from "./utils/onMouseOverChords";
import './Timeline.css'

export default class Timeline extends Component{
    constructor(props){
        super()
        this.state={
            data:dataKey,
            stepMemory:0,
            forsedStop:false,
        }
        this.playMusic=this.playMusic.bind(this)
    }

    componentDidUpdate(){
        if((this.props.play)){
            this.playMusic()
        }
    }


    playMusic=()=>{ 
        
        let countRows = 48
        if(this.props.selectedInstrument.noteType=='drums'){
            countRows = Object.keys(this.props.selectedInstrument.data).length
        }
        var dTimelineItems = document.getElementsByClassName('Timelineblocks__items')        
        const synth = this.props.synth
        const recorder = new Tone.Recorder();
        synth.connect(recorder)
        recorder.start()

        if(this.state.stepMemory==0){
            
            for(let i=0; i<countRows; i++){
                if(dTimelineItems[i].childNodes[0].classList.contains('active')){
                    synth.triggerAttackRelease(dTimelineItems[i].dataset.note, this.props.release);
                }
            }
        }

        let step = this.state.stepMemory
        let stepInterval = setInterval( async () => {
         step++
            for(let i=0; i<countRows; i++){

                if(!this.props.play){
                    this.setState({
                        stepMemory:step
                    })
                    clearInterval(stepInterval)
                    if(this.props.stop){
                        this.setState({stepMemory:0})
                    }
                    return
                }
                
                if(step == this.props.countCells){
                    this.props.forcedStop()
                    this.setState({
                        stepMemory:0,
                    })
                    
                    clearInterval(stepInterval)
                    const recording = await recorder.stop()
                    const url = URL.createObjectURL(recording);
                    this.props.getBlobRecordURL(url)
                    return
                }
                if(dTimelineItems[i].childNodes[step].classList.contains('active')){
                   synth.triggerAttackRelease(dTimelineItems[i].dataset.note, this.props.release);
                }
             
            }
         
        }, 1/this.props.valueBpm*60000*this.props.release*2);
              //500
    }

    render(){

        const onMouseOver =  this.props.onMouseOver
        const onMouseOut =  this.props.onMouseOut
        const noteInChord = this.props.noteInChord
        const selectedInstrument = this.props.selectedInstrument
        let countRows = 48
        if(selectedInstrument.noteType=='drums'){
            
            countRows = Object.keys(selectedInstrument.data).length
            
        }
        let cellsCount = this.props.countCells
        let cellsWidthDefault = this.props.cellsWidthDefault


        function createTimline(data){
            const items =[]
            if(selectedInstrument.noteType=='drums'){
                
                for(let el in data){
                    items.push(createItems(el))
                }
            }else{
                for(let i=0; i<countRows; i++){    //кол-во клеток строк
                    items.push(createItems(data[i].note))
                }
            }
            return items
        }

        function createItems(note){
           return(
               <div 
               key={note} 
               data-note = {note}
               className="Timelineblocks__items">
                   {createCells(cellsCount)}
               </div>
           )   
    }

    function highlightCell(el){
        if(noteInChord){
            for(let el of noteInChord){
                el.classList.contains('active') ? 
                el.classList.remove('active') :
                el.classList.add('active')
            }
        }
        el.target.classList.contains('active') ? 
        el.target.classList.remove('active') :
        el.target.classList.add('active')
        
    }

        function createCells(cells){
            const aCells =[]
            for(let i=0; i<cells; i++){
                if(cellsWidthDefault){
                    aCells.push(<div onClick={(el)=>{highlightCell(el)}} onMouseOver={onMouseOver}  onMouseOut={onMouseOut} style={{width:cellsWidthDefault}} className="Timelineblocks__cells"/>)
                }else{
                    aCells.push(<div onClick={(el)=>{highlightCell(el)}} onMouseOver={onMouseOver} onMouseOut={onMouseOut} style={{width:'72%'}} className="Timelineblocks__cells"/>)

                }
                  if(selectedInstrument.noteType=='drums'){
                    aCells[aCells.length-1].props.style.height='75px'
                  }
            }
           return(aCells)   
    }
        return(
            <> 
            <div className="Timelineblocks" >
                {selectedInstrument.noteType!='drums' ?
                createTimline(this.state.data):
                createTimline(selectedInstrument.data)

                }
            </div>
            </>
        )
    }
}











