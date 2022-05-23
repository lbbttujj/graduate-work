import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { setCurrentSubTrack,changeTrackMemory } from "../store/sequencerSlice";
import { setInstrument } from '../store/sequencerSlice';
import {Bass, Guitar,Piano,Drums} from './Instruments';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import  guitar1 from '../data/img/guitar1.png'
import  bass1 from '../data/img/bass1.png'
import  piano1 from '../data/img/piano1.png'
import  drums1 from '../data/img/drums1.png'
import  littleBin from '../data/img/little_bin.png'
import  edit from '../data/img/edit.png'
import  deleteTrackImg from '../data/img/deleteTrack.png'
import './Track.css'


 const Track = ({changeViewSeqencer,idTrack,nameTrack})=> {

    const dispatch = useDispatch()
    
    const [contextMenu, setContextMenu] = useState(null);
    const [nameSelectedSubTrack, setNameSelectedSubTrack] = useState(null);

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

    const handleContextMenu = (event) => {
        setContextMenu(
          contextMenu === null
            ? {
                mouseX: event.clientX + 2,
                mouseY: event.clientY - 6,
              }
            : // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
              // Other native context menus might behave different.
              // With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
              null,
        );
      };

      const closeContextMenu = () => {
        setContextMenu(null);
      };


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
            setNameSelectedSubTrack(e.target.dataset.name)
            e.preventDefault()
            handleContextMenu(e)
            // выпадающее меню с возможностью удаления прогирывания
        })

        let audio = document.createElement('audio')
        subTrack.appendChild(audio)
        let subTrackNumber
        if(oEvent.target.className =='track'){
            oEvent.target.append(subTrack)
            let allSubtracks = document.getElementsByClassName('subTrack')
            
            if(allSubtracks.length==1){
                subTrackNumber = 1
            }else{
                subTrackNumber = +allSubtracks[allSubtracks.length-2].dataset.name.split('/')[1]+1

            }
        }else{
          
            const arrr = []
                for(let el of oEvent.target.parentElement.childNodes){
                    arrr.push(el)
                }
         subTrackNumber= arrr.findIndex((el)=>el===oEvent.target)
        }
        let CurrentSubTrack
        if(oEvent.target.dataset.name){
            CurrentSubTrack = oEvent.target.dataset.name
        }else{
            CurrentSubTrack= nameTrack + '/' + subTrackNumber
            subTrack.setAttribute("data-name", CurrentSubTrack)  
        }

        
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

      const editSubTrack=()=>{
        closeContextMenu();  
        dispatch(setCurrentSubTrack(nameSelectedSubTrack)); 
        changeViewSeqencer()
      }

      const deleteSubtrack = (e)=>{
        closeContextMenu();
        dispatch(changeTrackMemory({add:false,subTrack:nameSelectedSubTrack}))
        let allSubtracks = document.getElementsByClassName('subTrack')
        for(let el of allSubtracks){
            if(el.dataset.name==nameSelectedSubTrack){      
            el.parentElement.removeChild(el)
        }
        
    }
        
      }

      const deleteTrack = (oEvent)=>{
          let CurrentTrack = oEvent.target.parentElement.parentElement
          dispatch(changeTrackMemory({add:false,track:CurrentTrack.id}))
          CurrentTrack.parentElement.removeChild(CurrentTrack)
      }
    
    
        return(
            <>
            <div id={nameTrack}>
            {/* <div id={nameTrack} onClick={selectSubTrack} className="track"> */}
            <div onClick={selectSubTrack} className="track">
            <div className="label_for_track" for={nameTrack}>{nameTrack}</div>     
            </div>
            <div onClick={deleteTrack} className="deleteTrackBtn"><img     onClick={deleteTrack} alt='deleteTrackImg' width='40px' src={deleteTrackImg}></img></div>

        <Slider {...settings}
        afterChange={afterChangeSlide}
        >
           {InstrumentsFromServerMock.map((el)=>{
               return <div data-name={el.instrumentName}><img width={el.imgWidth} alt={el.id} src={el.imgLink}></img></div>
            })}
        
       
        </Slider>
        <Menu
        open={contextMenu !== null}
        onClose={closeContextMenu}
        anchorReference="anchorPosition"
        anchorPosition={
            contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
        >
          <div style={{display:'flex'}}>
        <MenuItem onClick={editSubTrack} ><img alt ='edit' width={'16px'} src={edit} ></img></MenuItem>
        <MenuItem color="red" onClick={deleteSubtrack}><img alt ='littleBin' width={'30px'} src={littleBin} ></img></MenuItem>
          </div>
        
      </Menu>
          </div>
            </>
        )
    }

export default Track