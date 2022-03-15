import React, {Component} from "react";
import './style.css'


export default class Track extends Component{
    constructor(props){
        super()
        
    }

    addSubTrack = (oEvent)=>{
        let div = document.createElement('div');
        div.className='subTrack'
        div.addEventListener('contextmenu',(e)=>{
            e.preventDefault()
            alert('done')
            // выпадающее меню с возможностью удаления прогирывания
            
        })
     
        if(oEvent.target.className =='track'){
            oEvent.target.append(div)
        }
        this.props.changeViewSeqencer()
    }

    render(){
        return(
            <>
            <div onClick={this.addSubTrack} className="track">

            </div>
            </>
        )
    }
}