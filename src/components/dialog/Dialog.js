import React, { useEffect,useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeTrackMemory } from '../../store/sequencerSlice';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Sequencer from '../Sequencer/Sequencer';
import './style.css'


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

 const AlertDialogSlide =({openDialog,handleClose,currentSubTrack})=> {


  const [blobRecordURL, setBlobRecordURL] = useState(null)


  const trackMemory = useSelector(state=>state.sequencer.trackMemory)
	const dispatch = useDispatch()


  // useEffect(()=>{
  //   debugger
  //   if(openDialog){
  //     debugger
  //   }
  // },[openDialog])

  useEffect(()=>{
    if(openDialog){
      let trackFromMemory = trackMemory.find(el=>el.information===currentSubTrack)
      if(trackFromMemory){
       let timeLineItems = document.getElementsByClassName('Timelineblocks__items')
       let trackMask = trackFromMemory.mask

       for(let i=0; i<trackMask.length; i++){
            for( let j=0; j<trackMask[0].length; j++){
              if(trackMask[i][j]==1){
                  console.log(timeLineItems[i].childNodes[j].classList.add('active'));
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
    // console.log(blobRecordURL);
    let smth = getBlobURLFromState()
    debugger
    handleClose()
    const maskMassive = []
    let Items = document.getElementsByClassName('Timelineblocks')[0].childNodes
    for(let i=0; i<Items.length; i++){
        maskMassive.push([])
      for(let j=0; j<Items[i].childNodes.length; j++){
        if(Items[i].childNodes[j].classList.contains('active')){
          maskMassive[i].push(1)
        }else{
          maskMassive[i].push(0)
        }
      }
      }


      if(currentSubTrack){

        const objectMemorise = {
          information:currentSubTrack,
          mask:maskMassive,
          // blob:blobRecordURL
        }
        // let objectMemoriseJSON = JSON.stringify(objectMemorise)
        dispatch(changeTrackMemory({add:true,data:objectMemorise}))


          let koll = document.getElementsByClassName('subTrack')
          let mass = []
          for(let el of koll){
              mass.push(el)
          }
         let subtrackToAddAudio = mass.find(el=>el.dataset.name == currentSubTrack)
         subtrackToAddAudio.childNodes[0].src=blobRecordURL
        
      }

      clearTimeline()
    }

  


    return (
        <div>
      {/* <Button variant="outlined" onClick={ handleClickOpen}>
        Slide in alert dialog
      </Button> */}
      <Dialog
       fullWidth={true}
       maxWidth={'xl'}
       open={openDialog}
        TransitionComponent={Transition}
        keepMounted
       onClose={handleClose}
       scroll='body'
        // aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Use Google's location service?"}</DialogTitle>
        <DialogContent dividers={false}>
          {/* <DialogContentText id="alert-dialog-slide-description"> */}
          <Sequencer
          setBlobRecordURL={getBlobURLFromSeq} 
          />
          {/* </DialogContentText> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>no</Button>
          <Button onClick={saveSubTrack}>Записать</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AlertDialogSlide