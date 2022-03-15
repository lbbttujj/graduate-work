import React, {Component} from "react";
import Sequencer from "../Sequencer/Sequencer";
import Track from "../track/Track";
import ButtonTimeLine from "../buttonsTimeLine/ButtonTimeLine";
import AlertDialogSlide from "../dialog/Dialog";
import Fab from '@mui/material/Fab';
import './style.css'


export default class AudioStudio extends Component {
    constructor(props){
        super()
        this.state = {
            currentNote:'',
            play:false,
            stop:false,
            bpm:120,
            cellsCount:24, //в секвеносор
            viewSeqencer:true,
            openDialog:false
        }
        // this.changeNote = this.changeNote.bind(this)
        // this.changePlay=this.changePlay.bind(this)
        // this.stopMusic=this.stopMusic.bind(this)
        // this.changeBpm=this.changeBpm.bind(this)
        // this.changeCountCells=this.changeCountCells.bind(this)
    }

    handleClickOpen = ()=>{
        this.setState({openDialog:true})
    }

    handleClose = ()=>{
        this.setState({openDialog:false})
    }

   

    changeViewSeqencer=()=>{
        // this.setState({viewSeqencer:!this.state.viewSeqencer})
        this.handleClickOpen()
    }

    changeCountCells=(bMoreCells)=>{

        let widthTimeLine = document.getElementsByClassName('Timelineblocks')[0] //current
        let currentPercent = Number(widthTimeLine.style.width.match(/\d+(?=%)/)[0])
        if(bMoreCells){
            if(this.state.cellsCount<40){
                this.setState({cellsCount:this.state.cellsCount+4})
                
                if(this.state.cellsCount>=24){
                    //надо сделать точнее в относительных единицах
                widthTimeLine.style.width=currentPercent+17+'%'
                }
            }
        }else{
            if(this.state.cellsCount>4){
                this.setState({cellsCount:this.state.cellsCount-4})
                if(this.state.cellsCount>24){
                    widthTimeLine.style.width=currentPercent-17+'%'
                }
            }

        }
    }  

    changeBpm=()=>{
        this.setState({bpm:document.getElementById('bpm').value})
    }

    //отсавить здесь
    changePlay=()=>{
        this.state.play ? 
        this.setState({play:false}):
        this.setState({play:true,stop:false})
    }

    stopMusic=()=>{
        this.setState({play:false,stop:true})
        // this.setState({stop:true})
    }

    render(){
        return(
            <>
            <div style={{height:'100px'}} className="HeadButtons">
                <button>play</button>    
            </div>

            <Track
                changeViewSeqencer={this.changeViewSeqencer}/>
                  <Fab className='addTrackButton' color="primary" aria-label="add">
                    +
                     </Fab>
                {/* <Track
             changeViewSeqencer={this.changeViewSeqencer}/> */}
            <AlertDialogSlide
                openDialog = {this.state.openDialog}
                handleClickOpen = {this.handleClickOpen}
                handleClose = {this.handleClose}/>
           
            </>

        )
    }
}