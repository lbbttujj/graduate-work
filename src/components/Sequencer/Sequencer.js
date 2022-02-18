import React, {Component } from "react";
import Keys from "../keys/Keys";
import Timeline from "../timeline/Timeline";
import PlayLine from "../playLine/PlayLine";
import ButtonTimeLine from "../buttonsTimeLine/ButtonTimeLine";
import './style.css'
export default class Sequencer extends Component{
    constructor(){
        super()
        this.state = {
            currentNote:'',
            play:false,
            stop:false
        }
        this.changeNote = this.changeNote.bind(this)
        this.changePlay=this.changePlay.bind(this)
        this.stopMusic=this.stopMusic.bind(this)
    }

    componentDidUpdate(){
        // debugger
    }

    changePlay=()=>{
        this.state.play ? 
        this.setState({play:false}):
        this.setState({play:true,stop:false})
    
    }
    stopMusic=()=>{
        this.setState({stop:true})
    }
    

    changeNote(note){
            this.setState({currentNote:note})
    }
    render(){
        
        return(
            <>
            <div className="mainStageSequencer">
                <div className='TimelineButtons'>
                <ButtonTimeLine
                changePlay = {this.changePlay}
                stopMusic={this.stopMusic}
                />
                </div>
                <Keys
                changeNote = {this.changeNote}
                />
                <Timeline/>
                <PlayLine
                play = {this.state.play}
                stop = {this.state.stop}
                />
            </div>
            </>
        )
    }
}