import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { setCurrentSubTrack } from "../store/sequencerSlice";
import { setInstrument } from '../store/sequencerSlice';
import {Bass, Guitar,Piano,Drums} from './Instruments';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import  guitar1 from '../data/img/guitar1.png'
import  bass1 from '../data/img/bass1.png'
import  piano1 from '../data/img/piano1.png'
import  drums1 from '../data/img/drums1.png'
import './Track.css'


 const Track = ({changeViewSeqencer,idTrack,nameTrack})=> {

    const dispatch = useDispatch()
    

    const InstrumentsFromServerMock = [
        {
            imgLink:piano1,
            imgWidth:'140px',
            instrumentName:'piano',
            id:'piano1'
        },
        {
            imgLink:guitar1,
            imgWidth:'140px',
            instrumentName:'guitar',
            id:'guitar1'
        },
        {
            imgLink:bass1,
            imgWidth:'140px',
            instrumentName:'bass',
            id:'bass1'
        },
        {
            imgLink:drums1,
            imgWidth:'140px',
            instrumentName:'drums',
            id:'drums1'
        }
    ]

    const selectInstrument = (instrumentName)=>{
        
        switch (instrumentName) {
            case 'guitar':
            dispatch(setInstrument({track:nameTrack,instrument:Guitar})) 
            break
            case 'bass':
            dispatch(setInstrument({track:nameTrack,instrument:Bass})) 
            break
            case 'piano':
            dispatch(setInstrument({track:nameTrack,instrument:Piano})) 
            break
            case 'drums':
            dispatch(setInstrument({track:nameTrack,instrument:Drums})) 
            break
            default:
                break;
        }
    }

    const selectSubTrack = (oEvent)=>{

        let subTrack = document.createElement('div');
        subTrack.className='subTrack'
        subTrack.addEventListener('contextmenu',(e)=>{
            e.preventDefault()
            alert('done')
            // выпадающее меню с возможностью удаления прогирывания
        })

        let audio = document.createElement('audio')
        subTrack.appendChild(audio)
        let subTrackNumber

        if(oEvent.target.className =='track'){
            oEvent.target.append(subTrack)
            subTrackNumber =  oEvent.target.childNodes.length-1 //отделить кнопки от трека !!!!!! бесят именна субтреков
        }else{
            const arrr = []
                for(let el of oEvent.target.parentElement.childNodes){
                    arrr.push(el)
                }
         subTrackNumber= arrr.findIndex((el)=>el===oEvent.target)
        }

        let CurrentSubTrack = nameTrack + '/' + subTrackNumber

        subTrack.setAttribute("data-name", CurrentSubTrack)  

        
        dispatch(setCurrentSubTrack(CurrentSubTrack))
        
        changeViewSeqencer()

    }
    
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };

      const afterChangeSlide = (oEvent)=> {
          
        selectInstrument(InstrumentsFromServerMock[oEvent].instrumentName)
        
      }
    
    
        return(
            <>
            <div id={nameTrack} onClick={selectSubTrack} className="track">
            <div className="label_for_track" for={nameTrack}>{nameTrack}</div>     
            </div>
          
        <Slider {...settings}
        afterChange={afterChangeSlide}
        >
           {InstrumentsFromServerMock.map((el)=>{
               return <div data-name={el.instrumentName}><img width={el.imgWidth} alt={el.id} src={el.imgLink}></img></div>
           })}
        
       
        </Slider>
    
            </>
        )
    }

export default Track