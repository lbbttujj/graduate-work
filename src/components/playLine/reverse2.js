import React, {Component} from "react";
import { useState,useEffect } from "react";
import {Draw} from "tone";
import {TickSignal} from "tone/build/esm/core/clock/TickSignal";

import './style.css'
 const PlayLine = (play,stop,bpm)=> {
   
    const [timePassed,setTimePassed] = useState(0)
    const [isPaused,setIsPaused] = useState(true)
    const [beforeStop,setBeforeStop] = useState(0)
    const [alreadyStop,setAlreadyStop] = useState(false)
    const [cellsClientWidth,setCellsClientWidth] = useState(0)
    const [playHere, setPlay] = useState()
       
        // this.state = {
        //     timePassed: 0,
        //     isPaused: true,
        //     beforeStop: 0,
        //     alreadyStop: false,
        //     cellsClientWidth:0
        // }
      
   useEffect(()=>{
    let cellsClientWidth = document.getElementsByClassName('Timelineblocks__cells')[0].clientWidth
    setCellsClientWidth(cellsClientWidth+2)
    //     this.setState({
    //         cellsClientWidth:cellsClientWidth+2
    //     })
   },[])

   useEffect(()=>{
       console.log(isPaused);
       if ((play && isPaused)) {
           console.log('play');
           
                moveLine()
            }
   },[play,isPaused])

    // componentDidMount(){
    //     let cellsClientWidth = document.getElementsByClassName('Timelineblocks__cells')[0].clientWidth

    //     this.setState({
    //         cellsClientWidth:cellsClientWidth+2
    //     })
    // }

    // componentDidUpdate() {
    //     if ((this.props.play && this.state.isPaused)) {
    //         this.moveLine()
    //     }
    // }



    const moveLine = () => {
        // console.log('fuck');
        setIsPaused(false)
        setAlreadyStop(false)

        let start = Date.now()

        // let timer = setInterval(function () {
        //     console.log('sss');
        //     if (!play) {
        //         console.log('dddd');

        //         clearInterval(timer)
        //         let beforeStop = Number(document.getElementsByClassName('line')[0].style.left.split('').slice(0, -2).join('')) - 100 
        //         beforeStop = Math.ceil(beforeStop / cellsClientWidth)*cellsClientWidth;
                
        //         isPaused(true)
        //         setBeforeStop(beforeStop)
        //         setTimePassed(0)
        //         // this.setState({
        //         //     isPaused: true,
        //         //     //100 хардкод исправить 
        //         //     beforeStop:beforeStop,
        //         //     timePassed: 0
        //         // })
                

        //         if ( stop) {
        //             setBeforeStop(0)
        //             // this.setState({
        //             //     beforeStop: 0
        //             // })
        //         }
        //     } else {
        //         setTimePassed(Date.now() - start)
        //         // this.setState({
        //         //     timePassed: Date.now() - start
        //         // })

        //     }

        // }.bind(this), 20)
    }

   
        
        // if (this.props.stop && !this.state.alreadyStop) {
        //     this.setState({
        //         beforeStop: 0,
        //         alreadyStop: true
        //     })
        // }

        return (
            <>
            <div style = {
                {
                    left: 200 + beforeStop + timePassed/60000*cellsClientWidth* bpm + 'px'
                    // left: 100 + this.state.beforeStop + this.state.timePassed/60000*this.state.cellsClientWidth*this.bpm + 'px'
                }
            }
            className = "line" >

            </div> 
            </>
        )
    
}

export default PlayLine