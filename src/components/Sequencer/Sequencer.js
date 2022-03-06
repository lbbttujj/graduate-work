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
            bpm:120,
            cellsCount:24
        }
        this.changeNote = this.changeNote.bind(this)
        this.changePlay=this.changePlay.bind(this)
        this.stopMusic=this.stopMusic.bind(this)
        this.changeBpm=this.changeBpm.bind(this)
        this.changeCountCells=this.changeCountCells.bind(this)
    }

    changeCountCells=(bMoreCells)=>{

        if(bMoreCells){
            if(this.state.cellsCount<40)
            this.setState({cellsCount:this.state.cellsCount+4})
            debugger
        }else{
            if(this.state.cellsCount>4)
            this.setState({cellsCount:this.state.cellsCount-4})
        }
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
        this.setState({play:false,stop:true})
        // this.setState({stop:true})
    }
    

    changeNote(note){
            this.setState({currentNote:note})
    }


    render(){    
        return(
            <>
            <div className="mainStageSequencer">
                <Keys
                    changeNote = {this.changeNote}
                />
                <Timeline
                     play = {this.state.play}
                     stop = {this.state.stop}
                     valueBpm={this.state.bpm}
                    countCells={this.state.cellsCount}
                />
                <PlayLine
                    play = {this.state.play}
                    stop = {this.state.stop}
                    bpm = {this.state.bpm}
                />
            </div>
                        <div className="SettingButtons">    
                <ButtonTimeLine
                    changePlay = {this.changePlay}
                    stopMusic={this.stopMusic}
                    changeBpm={this.changeBpm}
                    valueBpm={this.state.bpm}
                    changeCountCells={this.changeCountCells}
                />
            </div> 
            </>
        )
    }
}