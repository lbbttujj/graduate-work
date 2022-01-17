import React,{Component} from "react";
import dataKey from '../../data/keys.json'
import './style.css'
export default class Keys extends Component{
    constructor(){
        super()
        this.state={
            countKeys:64,
            data:dataKey
        }
        this.pressKey=this.pressKey.bind(this)
        this.pressKeyUp=this.pressKeyUp.bind(this)
        this.pressKeyDown=this.pressKeyDown.bind(this)
    }

    pressKeyUp = (oEvent)=>{
        oEvent.currentTarget.style.opacity='100%'
    }
    pressKeyDown = (oEvent)=>{
        oEvent.currentTarget.style.opacity='50%'
    }
    pressKey=(oEvent)=>{

    }
    
    render(){
        const keys = []; 

        return(
            <>
            <div className="KeyBoard">
                {
                    this.state.data.map((el)=>{
                        return(
                            
                            
                        <div style={{height:'20px',display:'flex',alignItems:'center'}}>
                             <div className="keyNote" 
                             onMouseDown={this.pressKeyDown}
                              onMouseUp={this.pressKeyUp} 
                              onClick={this.pressKey} 
                              onMouseLeave={this.pressKeyUp}
                              style={{height:'20px',width:'80px', backgroundColor:el.colorkey,border:'1px solid black'}}/>
                            <h2 className="keyNoteText" style={{display:el.visible}} > {el.note}</h2>
                        </div>
                            
                 
                )
                    })
                }
            </div>
            </>
        )
    }
}