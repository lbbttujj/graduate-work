import React, { useEffect,useState } from 'react';
import * as Tone from "tone";
import { useSelector, useDispatch } from 'react-redux';
import { changeTrackMemory,setNotesSize } from '../store/sequencerSlice';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Sequencer from './Sequencer';
import { Piano } from './Instruments';
import './Dialog.css'


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


 const AlertDialogSlide =({openDialog,handleClose,
  // currentSubTrack
})=> {
  const [blobRecordURL, setBlobRecordURL] = useState(null)
  const trackMemory = useSelector(state=>state.sequencer.trackMemory)
  const instruments = useSelector(state=>state.sequencer.currentInstrument)
  const currentSubTrack = useSelector(state=>state.sequencer.currentSubTrack.nameSubTrack)
  let trackFromMemory = trackMemory[currentSubTrack]
  let currentInstrument 
  
  if(currentSubTrack){
    currentInstrument = instruments[currentSubTrack.split('/')[0]]
    if(!currentInstrument){
      currentInstrument = Piano
    }
  }else{
    currentInstrument = Piano
  }
  const synth = new Tone.Sampler({
    urls: currentInstrument
  }).toDestination()
	const dispatch = useDispatch()

  if(trackFromMemory){
    debugger
  // dispatch(setNotesSize(trackFromMemory.release))
  }




  useEffect(()=>{
    if(openDialog){
      
      
      if(trackFromMemory){
       let timeLineItems = document.getElementsByClassName('Timelineblocks__items')
       let trackMask = trackFromMemory.mask

       for(let i=0; i<trackMask.length; i++){
            for( let j=0; j<trackMask[0].length; j++){
              if(trackMask[i][j]!=0){
                  timeLineItems[i].childNodes[j].classList.add('active')
                }
            }
         }
      }
    }
  },[openDialog])


    const getBlobURLFromSeq = (blob)=>{
      setBlobRecordURL(blob)
    }


  const clearTimeline = ()=>{
    var allItems  = document.getElementsByClassName('Timelineblocks__cells')
    for(let i =0; i<allItems.length; i++){
      if(allItems[i].classList.contains('active'))
         {
        allItems[i].classList.remove('active')
         }
    }
  }




  const saveSubTrack = ()=>{
    handleClose()
    const maskMassive = []
    const aNotesInTrack = []

    let Items = document.getElementsByClassName('Timelineblocks')[0].childNodes

    /* Матрица всех нот. Похоже на матрицу смежности*/
    for(let i=0; i<Items.length; i++){
        maskMassive.push([])
        for(let j=0; j<Items[i].childNodes.length; j++){
            if(Items[i].childNodes[j].classList.contains('active')){
                 maskMassive[i].push(Items[i].dataset.note)
              }else{
                 maskMassive[i].push(0)
              }
          }
        }
    
    /* Заполняется массив массивов нот в столбце */
        for(let i=0; i<maskMassive[0].length; i++){
          let aNotesInOneBeat =[]
          for(let j=0; j<maskMassive.length;j++){
            if(maskMassive[j][i]!=0){
              aNotesInOneBeat.push(maskMassive[j][i])
            }
          }
          aNotesInTrack.push(aNotesInOneBeat)
        }
      

    /* Создание объекта который отправляется в редакс слой секвеносора */
    
    if(currentSubTrack){
        const objectMemorise = {
          information:currentSubTrack,
          mask:maskMassive,
          notes:aNotesInTrack,
          // synth:synth
          }

        dispatch(changeTrackMemory({add:true,data:objectMemorise})) 


    /* Заполненине аудио в каждом субтреке работает если было проиграна запись */
        let dAllSubtracks = document.getElementsByClassName('subTrack')
        let aAllSubtracks = []
        for(let el of dAllSubtracks){
            aAllSubtracks.push(el)
          }
         let subtrackToAddAudio = aAllSubtracks.find(el=>el.dataset.name == currentSubTrack)
         subtrackToAddAudio.childNodes[0].src=blobRecordURL 
    }
    
    /* функции возвращающие диалог к дефолтному виду */
    clearTimeline()
  }

    return (
    <Dialog
      fullWidth={true}
      maxWidth={'xl'}
      open={openDialog}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      scroll='body'
    >
      <DialogTitle>{"Трек ..."}</DialogTitle>
      <DialogContent dividers={false}>
        <Sequencer
          setBlobRecordURL={getBlobURLFromSeq} 
          synth = {synth}
          // release = {trackMemory[currentSubTrack].release ?? 0.5 }
          // release = { 0.25 }
        />
        {/* <div id='timeUderTimeLine'>

        </div> */}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Закрыть</Button>
        <Button onClick={saveSubTrack}>Записать</Button>
      </DialogActions>
    </Dialog>
  );
}

export default AlertDialogSlide