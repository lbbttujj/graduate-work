import React, { useEffect,useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeTrackMemory } from '../store/sequencerSlice';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Sequencer from './Sequencer';
import './Dialog.css'


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


 const AlertDialogSlide =({openDialog,handleClose,currentSubTrack})=> {

  const [blobRecordURL, setBlobRecordURL] = useState(null)
  const trackMemory = useSelector(state=>state.sequencer.trackMemory)
	const dispatch = useDispatch()


  useEffect(()=>{
    if(openDialog){
      let trackFromMemory = trackMemory.find(el=>el.information===currentSubTrack)
      if(trackFromMemory){
       let timeLineItems = document.getElementsByClassName('Timelineblocks__items')
       let trackMask = trackFromMemory.mask

       for(let i=0; i<trackMask.length; i++){
            for( let j=0; j<trackMask[0].length; j++){
              if(trackMask[i][j]==1){
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

    const getBlobURLFromState =()=>{
      return blobRecordURL
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
    let smth = getBlobURLFromState()
    handleClose()
    const maskMassive = []
    let Items = document.getElementsByClassName('Timelineblocks')[0].childNodes

    for(let i=0; i<Items.length; i++){
        maskMassive.push([])
        for(let j=0; j<Items[i].childNodes.length; j++){
            if(Items[i].childNodes[j].classList.contains('active')){
         //заполнить матрицу по нотам
              maskMassive[i].push(1)
           }else{
              maskMassive[i].push(0)
           }
        }
      }

    if(currentSubTrack){
        const objectMemorise = {
          information:currentSubTrack,
          mask:maskMassive
          }
        dispatch(changeTrackMemory({add:true,data:objectMemorise})) 

        let dAllSubtracks = document.getElementsByClassName('subTrack')
        let aAllSubtracks = []
        for(let el of dAllSubtracks){
            aAllSubtracks.push(el)
          }
         let subtrackToAddAudio = aAllSubtracks.find(el=>el.dataset.name == currentSubTrack)
         subtrackToAddAudio.childNodes[0].src=blobRecordURL 
    }
      clearTimeline()
      // добавить функции возвращающие диалог к дефолтному виду
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
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Закрыть</Button>
        <Button onClick={saveSubTrack}>Записать</Button>
      </DialogActions>
    </Dialog>
  );
}

export default AlertDialogSlide