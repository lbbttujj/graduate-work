import React, {Component} from "react";
import dataKey from '../../data/keys.json'
import * as Tone from 'tone'
import './style.css'
import { debug } from "tone";
export default class Timeline extends Component{
    constructor(props){
        super()
        this.state={
            data:dataKey,
            stopPlay:true,
            stepMemory:0,
            alreadyStop: false,
            synth:new Tone.PolySynth(Tone.Synth).toDestination(),
            
        }
        this.playMusic=this.playMusic.bind(this)
    }

    componentDidUpdate(){
        if((this.props.play)){
            this.playMusic()
        }
    }

    playMusic=()=>{ 
            var items = document.getElementsByClassName('Timelineblocks__items')
            const synth =this.state.synth
            const recorder = new Tone.Recorder();
            synth.connect(recorder)
            const audioFile = document.getElementById('audioFile');
            const audioFile1 = document.getElementById('audioFile1');


            recorder.start();

            //тоже можно изменять
            const release = '0.2s'
            if(this.state.stepMemory==0){
                for(let i=0; i<36; i++){
                    if(items[i].childNodes[0].classList.contains('active')){
                        synth.triggerAttackRelease(items[i].dataset.note, release);
                    }
                }
            }
            let step = this.state.stepMemory
            let stepInterval = setInterval( async () => {
                
             step++
          
                for(let i=0; i<36; i++){
                    

                    if(!this.props.play){
                        this.setState({
                            stepMemory:step,
                            alreadyStop: false,
                        })
                        clearInterval(stepInterval)

                        if(this.props.stop){
                            this.setState({stepMemory:0})
                        }
                        return
                    }
                    if(step == this.props.countCells){
                        clearInterval(stepInterval)
                        const recording = await recorder.stop()
                        const url = URL.createObjectURL(recording);
                        this.props.getBlobRecordURL(url)
                        audioFile.src = url
                        audioFile1.src = url
                        return
                    }
                    if(items[i].childNodes[step].classList.contains('active')){
                       synth.triggerAttackRelease(items[i].dataset.note, release);
                    }
                   
                }
            
            }, 1/this.props.valueBpm*60000);


         
              //500
    }


    //  playNote = (items)=>{
    //     let note = items.currentTarget.dataset.note;
    //     const synth = this.state.synth
    //     synth.triggerAttackRelease(note, "8t");
    // }


    render(){

        let cellsCount = this.props.countCells
        console.log('cellsCount ',cellsCount );
        if (this.props.stop && !this.state.alreadyStop) {
            this.setState({
                stepMemory: 0,
                alreadyStop: true
            })
        }

        function createTimline(data){
            const items =[]
            for(let i=0; i<36; i++){
                items.push(createItems(data[i].note))
            }

            return items
        }

        function createItems(note){
           return(
               <div 
               key={note} 
               //Не рабоатет но в целом к лучшему, пока не придумал как не пергружать память адекватно
            //    onClick={(items)=>{this.playNote(items)}}
               data-note = {note}
               className="Timelineblocks__items">
                   {createCells(cellsCount)}
               </div>
           )   
    }

    // function playNote(items){
    //     let note = items.currentTarget.dataset.note;
    //     const synth = this.state.synth
    //     const now = Tone.now()
    //     synth.triggerAttackRelease(note, "8t");
    // }

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











