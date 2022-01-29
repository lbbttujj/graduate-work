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
            FirstViewOctave:'3',
            SecondViewOctave:'2',
            isMouseDown: false,
            counter:0
        }
        this.pressKey=this.pressKey.bind(this)
        this.pressKeyUp=this.pressKeyUp.bind(this)
        this.pressKeyDown=this.pressKeyDown.bind(this)
        // this.checkPressDown = this.checkPressDown.bind(this);
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

    checkPressDown=(oEvent)=>{
        debugger
    }
    
    render(){

       //Криво надо понять почему вызывается два раза и счетчик это несерьезно
        if(this.state.counter==0){
            // document.addEventListener('keydown', (oEvent)=>{
            //     if(oEvent.key=='x'){
            //         this.setState({FirstViewOctave: +this.state.FirstViewOctave+0.5})
            //         this.setState({SecondViewOctave: +this.state.SecondViewOctave+0.5})
            //     }
            //     if(oEvent.key=='z'){
            //         this.setState({FirstViewOctave: +this.state.FirstViewOctave-0.5})
            //         this.setState({SecondViewOctave: +this.state.SecondViewOctave-0.5})                }
            // })
            this.setState({counter:1})
        }
        ///////


        return(
            <>
            <div className="KeyBoard">
                {
                    this.state.data.map((el)=>{
                        
                        // if(el.note.split('').pop() ==this.state.FirstViewOctave || el.note.split('').pop() ==this.state.SecondViewOctave  ){

                            return(
                          <div style={{height:'20px',display:'flex', border:'1px solid transparent', alignItems:'center'}}>
                             <div className="keyNote" 
                             onMouseDown={this.pressKeyDown}
                              onMouseUp={this.pressKeyUp} 
                              onClick={this.pressKey} 
                              onMouseLeave={this.pressKeyUp}
                              data-color = {el.colorkey}
                              data-note = {el.note}
                              style={{height:'20px',width:'80px', backgroundColor:el.colorkey, border:'1px solid black'}}/>
                            <h2 className="keyNoteText" style={{display:el.visible}} > {el.note}</h2>
                          </div>
                            
                            
                            )
                        // }
                    })
                }
            </div>
            </>
        )
    }
}