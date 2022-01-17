import React,{Component} from "react";
import dataKey from '../../data/keys.json'
import * as Tone from 'tone'
import './style.css'
export default class Keys extends Component{
    constructor(){
        super()
        this.state={
            countKeys:64,
            data:dataKey,
            octave:'3'
        }
        this.pressKey=this.pressKey.bind(this)
        this.pressKeyUp=this.pressKeyUp.bind(this)
        this.pressKeyDown=this.pressKeyDown.bind(this)
    }

    pressKeyUp = (oEvent)=>{
        var color = oEvent.target.dataset.color
        
        oEvent.currentTarget.style.backgroundColor = color;
    }
    pressKeyDown = (oEvent)=>{
        oEvent.currentTarget.style.backgroundColor="#0437F2"
        const synth = new Tone.Synth().toDestination();
        synth.triggerAttackRelease(oEvent.currentTarget.dataset.note, "8n");
    }
    pressKey=(oEvent)=>{
    
    }
    
    render(){
        const keys = []; 

        document.addEventListener('keydown', (oEvent)=>{
            if(oEvent.key=='x'){
                
                // if(this.state.octave<5)
                this.setState({octave:4})
                console.log(this.state.octave);
            }
            if(oEvent.key=='z'){
                // if(this.state.octave>2)
                this.setState({octave:2})
                
            }
        })


        return(
            <>
            <div className="KeyBoard">
                {
                    this.state.data.map((el)=>{
                        
                        if(el.note.split('').pop() ==this.state.octave){

                            return(
                                <div style={{height:'20px',display:'flex',alignItems:'center'}}>
                             <div className="keyNote" 
                             onMouseDown={this.pressKeyDown}
                              onMouseUp={this.pressKeyUp} 
                              onClick={this.pressKey} 
                              onMouseLeave={this.pressKeyUp}
                              data-color = {el.colorkey}
                              data-note = {el.note}
                              style={{height:'20px',width:'80px', backgroundColor:el.colorkey,border:'1px solid black'}}/>
                            <h2 className="keyNoteText" style={{display:el.visible}} > {el.note}</h2>
                        </div>
                            
                            
                            )
                        }
                    })
                }
            </div>
            </>
        )
    }
}