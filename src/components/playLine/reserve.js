import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux"
import {useDispatch} from 'react-redux'


import './style.css'
const PlayLine = ()=> {
    const [timePassed,setTimePassed] = useState(0)
    const [isPaused,setIsPaused] = useState(true)
    const [beforeStop,setBeforeStop] = useState(0)
    const [alreadyStop,setAlreadyStop] = useState(false)
    const [cellsClientWidth,setCellsClientWidth] = useState(0)
    const [playHere, setPlay] = useState()
    const [timer, setTimer] = useState(false)

    const bpm = useSelector(state=>state.sequencer.bpm)
    const play = useSelector(state=>state.sequencer.play)
    const stop = useSelector(state=>state.sequencer.stop)
    

    const dispatch = useDispatch()

    useEffect(()=>{
        let cellsClientWidth = document.getElementsByClassName('Timelineblocks__cells')[0].clientWidth
        setCellsClientWidth (cellsClientWidth+2)
    },[])

    useEffect(()=>{ 
        console.log('useEffent Play',play);
        if (play) { //надо проверить можно ли обойтись без этой тупой проверки isPaused
            moveLine()
        }else{
            pauseLine()
        }
    },[play])


    const moveLine = () => {


        let start = Date.now()

         setTimer = setInterval(function () {

  
                setTimePassed (Date.now() - start)

            

        }, 20)
    }

    const pauseLine = ()=>{
        

            debugger
            if(timer){

                clearInterval(timer)
                let beforeStop2 = Number(document.getElementsByClassName('line')[0].style.left.split('').slice(0, -2).join('')) - 100 
                beforeStop2 = Math.ceil(beforeStop2 / cellsClientWidth)*cellsClientWidth;
                
                setIsPaused(true)
                setBeforeStop (beforeStop2)
                setTimePassed (0)
                
            }

            if (stop) {
                setBeforeStop (0)
            }
    }

    useEffect(()=>{
        console.log('useEffect stop',stop);
        if (stop) {
            setBeforeStop (0)
        }
    },[stop])
    
        
  

        return (
            <>
            <div style = {
                {
                    left: 100 + beforeStop + timePassed/60000*cellsClientWidth*bpm + 'px'
                }
            }
            className = "line" >

            </div> 
            </>
        )
    
}
export default PlayLine