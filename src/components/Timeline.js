import React, {Component} from "react";
import dataKey from '../data/keys.json'
import * as Tone from 'tone'
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
        
        var dTimelineItems = document.getElementsByClassName('Timelineblocks__items')        
        const synth = this.props.synth
        const recorder = new Tone.Recorder();
        synth.connect(recorder)
        recorder.start()

        if(this.state.stepMemory==0){
            
            for(let i=0; i<48; i++){
                if(dTimelineItems[i].childNodes[0].classList.contains('active')){
                    synth.triggerAttackRelease(dTimelineItems[i].dataset.note, this.props.release);
                }
            }
        }

        let step = this.state.stepMemory
        let stepInterval = setInterval( async () => {
         step++
            for(let i=0; i<48; i++){

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

        let cellsCount = this.props.countCells

        function createTimline(data){
            const items =[]
            for(let i=0; i<48; i++){
                items.push(createItems(data[i].note))
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
        el.target.classList.contains('active') ? 
        el.target.classList.remove('active') :
        el.target.classList.add('active')
    }

        function createCells(cells){
            const aCells =[]
            for(let i=0; i<cells; i++){
                aCells.push(<div onClick={(el)=>{highlightCell(el)}} className="Timelineblocks__cells"/>)
            }
           return(aCells)   
    }
        return(
            <> 
            <div className="Timelineblocks"  style={{width: '92%'}}>
                {createTimline(this.state.data)}
            </div>
            </>
        )
    }
}











