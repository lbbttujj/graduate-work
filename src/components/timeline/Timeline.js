import React, {Component} from "react";
import dataKey from '../../data/keys.json'
// import ButtonTimeLine from "../buttonsTimeLine/ButtonTimeLine";
import * as Tone from 'tone'
import './style.css'
export default class Timeline extends Component{
    constructor(props){
        super()
        this.state={
            data:dataKey,
            stopPlay:true,
            stepMemory:0,
            alreadyStop: false,
            synth:new Tone.PolySynth(Tone.Synth).toDestination()
        }
        this.playMusic=this.playMusic.bind(this)
        // this.playNote=this.playNote.bind(this)
    }

    componentDidUpdate(){
        if((this.props.play)){
            this.playMusic()
        }
    }

    playMusic=()=>{

          
            var items = document.getElementsByClassName('Timelineblocks__items')
            const synth =this.state.synth
            //тоже можно изменять
            const release = '8t'
            if(this.state.stepMemory==0){
                for(let i=0; i<36; i++){
                    if(items[i].childNodes[0].classList.contains('active')){
                        synth.triggerAttackRelease(items[i].dataset.note, release);
                    }
                }
            }
            let step = this.state.stepMemory
            let stepInterval = setInterval(() => {
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
                    
                    if(items[i].childNodes[step].classList.contains('active')){
                       synth.triggerAttackRelease(items[i].dataset.note, release);
                    }
                }
                if(step==23){
                    clearInterval(stepInterval)
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

            return(
                items
            )
        }

        function createItems(note){
           return(
               <div 
               key={note} 
               //Не рабоатет но в целом к лучшему, пока не придумал как не пергружать память адекватно
               onClick={(items)=>{this.playNote(items)}}
               data-note = {note}
               className="Timelineblocks__items">
                   {
                       createCells()
                   }
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

        function createCells(){
            const aCells =[]
            for(let i=0; i<22; i++){
                aCells.push(<div onClick={(el)=>{highlightCell(el)}} className="Timelineblocks__cells"/>)
            }
           return(aCells)   
    }
        return(
            <>
            <div className="Timelineblocks">
                {
                    createTimline(this.state.data)
                }
            </div>
            </>
        )
    }
}











