import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { changeCurrentChord } from "../store/sequencerSlice";
import   ChordsData from '../data/chords.json'

import './Chords.css'

const Chords = ()=>{

    const dispatch = useDispatch()


    const changeChord =(oEvent)=>{
        let list = oEvent.target.parentElement.childNodes
         for(let el of list){
           if(el.classList.contains('selected')){
             el.classList.remove('selected')
             }
         }
         let currentChord
         for(let el of ChordsData){
             if(el.chord==oEvent.target.textContent)
             currentChord =el
            }

        oEvent.target.classList.add('selected')
        dispatch(changeCurrentChord(currentChord))
    }
    return(
        <>
        <div id='ChordsLine'>
            <ul id='ChordsList' onClick={changeChord}>
                <li>Major</li>
                <li>Minor</li>
                <li>sus2</li>
                <li>sus4</li>
                <li>5</li>
                <li>maj7</li>
                <li>m7</li>
                <li>7</li>
                <li>dim7</li>
                <li>add9</li>
                <li>add13</li>
                <li>6</li>
                <li>6-9</li>
                <li>9</li>
                <li>11</li>
                <li>13</li>
            </ul>
        </div>
        </>
    )
}


export default Chords