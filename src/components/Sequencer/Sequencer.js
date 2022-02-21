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
            stop:false,
            bpm:100
        }
        this.changeNote = this.changeNote.bind(this)
        this.changePlay=this.changePlay.bind(this)
        this.stopMusic=this.stopMusic.bind(this)
        this.changeBpm=this.changeBpm.bind(this)
    }

    changeBpm=()=>{
        this.setState({bpm:document.getElementById('bpm').value})
    }

    changePlay=()=>{
        this.state.play ? 
        this.setState({play:false}):
        this.setState({play:true,stop:false})
    
    }
    stopMusic=()=>{
        this.setState({play:false})
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
                changeBpm={this.changeBpm}
                valueBpm={this.state.bpm}
                />
                </div>
                <Keys
                changeNote = {this.changeNote}
                />
                <Timeline
                 play = {this.state.play}
                 valueBpm={this.state.bpm}
                />
                <PlayLine
                play = {this.state.play}
                stop = {this.state.stop}
                bpm = {this.state.bpm}
                />
            </div>
            </>
        )
    }
}