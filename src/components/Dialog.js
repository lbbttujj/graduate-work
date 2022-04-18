import React, { useEffect,useState } from 'react';
import * as Tone from "tone";
import { useSelector, useDispatch } from 'react-redux';
import { changeTrackMemory,setNotesSize,selectedInstrument,changeCountCells } from '../store/sequencerSlice';
import { clearTimeline } from './utils/clearTimeline';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Sequencer from './Sequencer';
import { Piano } from './Instruments';
import Chords from './Chords';
import './Dialog.css'


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


 const AlertDialogSlide=({openDialog,handleClose,chordPanel})=> {
  const [blobRecordURL, setBlobRecordURL] = useState(null)  // Ссылка на блоб аудио
  const trackMemory = useSelector(state=>state.sequencer.trackMemory)  // Все данные о всех субтреках
  const instruments = useSelector(state=>state.sequencer.currentInstrument) // Данные об инструментах в контексте трека
  const currentSubTrack = useSelector(state=>state.sequencer.currentSubTrack.nameSubTrack)  //Выбранный в этот момент субтрек
  const currentSubTrackChordsUsed = useSelector(state=>state.sequencer.currentSubTrack.isChordsUsed)  //Выбранный в этот момент субтрек
  // const currentSubTrackCountCells = useSelector(state=>state.sequencer.currentSubTrack.countCells)  //Выбранный в этот момент субтрек
  // const [countCells, setCountCells] = useState(16)
  let trackFromMemory = trackMemory[currentSubTrack]  // Информация о выбранном субреке из базы субтректов
  const dispatch = useDispatch()
  
  
  

  /*  выбранный инструмент. Если данных об интрументе нет в треке, то для трека устанвливается пианино */
  let currentInstrument 
  if(currentSubTrack){
    currentInstrument = instruments[currentSubTrack.split('/')[0]]  
     
    if(!currentInstrument){
      currentInstrument = Piano
    }
  }else{
    currentInstrument = Piano
  }
  
  dispatch(selectedInstrument(currentInstrument))


  /* Создание сиинта на основе инструмента */
  const synth = new Tone.Sampler({
    urls: currentInstrument.data
  }).toDestination()


  /* Устновка продолжительности ноты в редакс в разрезе выбранного субтрека, если этот субтрек уже был создан ранее 
   Устновка количества нот в субтреке*/
  if(trackFromMemory){
    dispatch(setNotesSize({value:trackFromMemory.release}))//////////////изменить
    dispatch(changeCountCells(trackFromMemory.countCells))

  }


/* Заполнение нот которые используется в субтреке, который был создан ранее */
  useEffect(()=>{
    if(openDialog){
      if(trackFromMemory){
     
       let timeLineItems = document.getElementsByClassName('Timelineblocks__items')
       let trackMask = trackFromMemory.mask
       
       for(let i=0; i<trackMask.length; i++){
            for( let j=0; j<trackMask[0].length; j++){
              if(trackMask[i][j]!=0){
                  
                  timeLineItems[i]?.childNodes[j].classList.add('active')
                  
                  if(timeLineItems[i].childNodes[j])
                  timeLineItems[i].childNodes[j].style.opacity=1
                }
            }
         }
      }
    }
  },[openDialog])


/* Обработка установки ЮРЛ для блоба аудио. Передается пропсами в секвенсор */
    const getBlobURLFromSeq = (blob)=>{
      setBlobRecordURL(blob)
    }



  const saveSubTrack = ()=>{
    
    handleClose()
    let Items = document.getElementsByClassName('Timelineblocks')[0].childNodes
    
    
    /* Матрица всех нот. Похоже на матрицу смежности*/
    const maskMassive = []
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
    const aNotesInTrack = []
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
      color ='black'
    >
      <DialogTitle>{`Трек ...`}</DialogTitle>
      <DialogContent dividers={false}>
        <Sequencer
          setBlobRecordURL={getBlobURLFromSeq} 
          synth = {synth}
          // cellsCount= {countCells}
        >
        </Sequencer>
        {currentSubTrackChordsUsed &&<Chords/>}
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