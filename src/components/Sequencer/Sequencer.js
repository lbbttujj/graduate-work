import React, {Component } from "react";
import Keys from "../keys/Keys";
import Timeline from "../timeline/Timeline";
import PlayLine from "../playLine/PlayLine";
import ButtonTimeLine from "../buttonsTimeLine/ButtonTimeLine";
export default class Sequencer extends Component{
    constructor(){
        super()
        this.state = {
            currentNote:'',
            play:false
        }
        this.changeNote = this.changeNote.bind(this)
        this.changePlay=this.changePlay.bind(this)
    }

    componentDidUpdate(){
        // debugger
    }

    changePlay=()=>{
        this.state.play ? 
        this.setState({play:false}):
        this.setState({play:true})
    }
    

    changeNote(note){
            this.setState({currentNote:note})
    }
    render(){
        return(
            <>
            <div className="mainStageSequencer">
                <ButtonTimeLine
                changePlay = {this.changePlay}
                />
                <Keys
                changeNote = {this.changeNote}
                />
                <Timeline/>
                <PlayLine
                play = {this.state.play}
                />
            </div>
            </>
        )
    }
}