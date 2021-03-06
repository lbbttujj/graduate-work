import React ,{useEffect,useState,useRef}from "react"
import { useSelector,useDispatch} from "react-redux";
import { setNotesSize,changeCountCells,changeCellsWidthRatio,changeCellsWidthDefault,changeChordUsing } from "../store/sequencerSlice";
import * as Tone from "tone";
import { Piano } from "./Instruments";
import { playAllTracks } from "./utils/playAllTracks";
import Slider from '@mui/material/Slider';
import { clearTimeline } from "./utils/clearTimeline";
import trashCan from '../data/img/trashCan.png'
import plus from '../data/img/plus.png'



import './ButtonTimeLine.css'

 const ButtonTimeLine = ({
	 changePlay,
	 stopMusic,
	})=>{

	const trackMemory = useSelector(state=>state.sequencer.trackMemory)
	const instruments = useSelector(state=>state.sequencer.currentInstrument)
	const currentNameSubTrack = useSelector(state=>state.sequencer.currentSubTrack.nameSubTrack) 
	const currentNoteSize = useSelector(state=>state.sequencer.currentSubTrack.currentNoteSize) 
	const cellsCount = useSelector(state=>state.sequencer.currentSubTrack.countCells) 
	const isChordsUsed = useSelector(state=>state.sequencer.currentSubTrack.isChordsUsed)

	const sliderIntupt = useRef(null);
	const [targerValue, setTargetValue] = useState(5)
	const [currentCellsWidthRatio, setCurrentCellsWidthRatio] = useState(5)
	// const [labelCurrentCellsWidthRatio, setLabelCurrentCellsWidthRatio] = useState('normal')

	let valueNotesSize  
	const [noteDuration,setNoteDuration] = useState(5)
	const dispatch = useDispatch()

	useEffect(()=>{
		
		let oldSlideValue
		if(trackMemory[currentNameSubTrack]){
			 switch (trackMemory[currentNameSubTrack].release) {
				case 0.062:{
					oldSlideValue = 2
					break
				}
				case 0.125:{
					oldSlideValue = 3
					break
				}
				case 0.250:{
					oldSlideValue = 4
					break
				}
				case 0.500:{
					oldSlideValue = 5
					break
				}
				case 1:{
					oldSlideValue = 6
					break
				}			
				case 2:{
					oldSlideValue = 7
					break
				}			
				case 9:{
					oldSlideValue = 8
					break
				}			
				default:
					break;
				}
				let newCellsWidth = 92*trackMemory[currentNameSubTrack].release*2+'%'
				document.getElementsByClassName('Timelineblocks')[0].style.width = newCellsWidth
				let elements = document.getElementsByClassName('Timelineblocks__cells')
				for(let i =0; i<elements.length; i++){
					elements[i].style.width=72*trackMemory[currentNameSubTrack].release*2+'%'
				}
			
		}else{
			switch (currentNoteSize) {
				case 0.062:{
					oldSlideValue = 2
					break
				}
				case 0.125:{
					oldSlideValue = 3
					break
				}
				case 0.250:{
					oldSlideValue = 4
					break
				}
				case 0.500:{
					oldSlideValue = 5
					break
				}
				case 1:{
					oldSlideValue = 6
					break
				}			
				case 2:{
					oldSlideValue = 7
					break
				}			
				case 9:{
					oldSlideValue = 8
					break
				}			
				default:
					break;
				}
				let newCellsWidth = 92*currentNoteSize*2+'%'
				document.getElementsByClassName('Timelineblocks')[0].style.width = newCellsWidth
				let elements = document.getElementsByClassName('Timelineblocks__cells')
				for(let i =0; i<elements.length; i++){
					elements[i].style.width=72*currentNoteSize*2+'%'
				}
			}
			
				setTargetValue(oldSlideValue)
				dispatch(setNotesSize({value:currentNoteSize}))

		
			
			},[currentNameSubTrack])
			
	const playMusic = ()=>{
		 changePlay()
	}
	const stopMusicFunc = ()=>{
		 stopMusic()
	}
	const playAllMusic = ()=>{
		playAllTracks(Tone,trackMemory,instruments,Piano)
		setTimeout(() => {
			playMusic()
		}, 500);
	}

	const addChords = (oEvent)=>{
		if(oEvent.target.checked){
			dispatch(changeChordUsing(true))
		}else{
			dispatch(changeChordUsing(false))
		}
	}
	


	const changeCountCellsFunc = (oEvent)=>{
		
		let widthTimeLine = document.getElementsByClassName('Timelineblocks')[0]
			let currentPercent = Number(widthTimeLine.style.width.match(/\d+(?=%)/)[0])
		if(oEvent.target.textContent==='+'){	
			if(cellsCount<40){
				dispatch(changeCountCells(cellsCount+4))
				let widthCellsDefault = widthTimeLine.childNodes[0].childNodes[0].style.width
				dispatch(changeCellsWidthDefault(widthCellsDefault))

			}
		}else{
			if(cellsCount>4){
				dispatch(changeCountCells(cellsCount-4))
			}

		} 
	
	}

	const changeDurationNotes = (oEvent)=>{
		setTargetValue(oEvent.target.value)
		setCurrentCellsWidthRatio(5)
		let currentNoteDuration
		switch (oEvent.target.value) {
			case 2:{
				currentNoteDuration = 0.062
				break
			}
			case 3:{
				currentNoteDuration = 0.125
				break
			}
			case 4:{
				currentNoteDuration = 0.250
				break
			}
			case 5:{
				currentNoteDuration = 0.500
				break
			}
			case 6:{
				currentNoteDuration = 1
				break
			}			
			case 7:{
				currentNoteDuration = 2
				break
			}			
			case 8:{
				currentNoteDuration = 4
				break
			}			
			default:
				break;
			}

			if(currentNoteDuration==noteDuration){
				return
			}else{
				
				setNoteDuration(currentNoteDuration)
				dispatch(setNotesSize({value:currentNoteDuration}))
				// Number(document.getElementsByClassName('Timelineblocks')[0].style.width.match(/\d+(?=%)/)[0])//92 ((((
				let newCellsWidth = 92*currentNoteDuration*2+'%'
				document.getElementsByClassName('Timelineblocks')[0].style.width = newCellsWidth
				let elements = document.getElementsByClassName('Timelineblocks__cells')
				for(let i =0; i<elements.length; i++){
				elements[i].style.width=72*currentNoteDuration*2+'%'
					}
			}

	}

	const sliderScale = (oEvent)=>{


			switch (oEvent) {
		
				case 2:{
					valueNotesSize ='1/8'
					break
				}
				case 3:{
					valueNotesSize ='1/4'
					break
				}
				case 4:{
					valueNotesSize ='1/2'
					break
				}
				case 5:{
					valueNotesSize ='1'
					break
				}
				case 6:{
					valueNotesSize ='2/1'

					break
				}			
				case 7:{
					valueNotesSize ='4/1'
					break
				}			
				case 8:{
					valueNotesSize ='8/1'
					break
				}			
				default:
					break;
				}

				


				return valueNotesSize

			
	}
	
	const changeCellsWidth=(oEvent)=>{
		let cellsWidthRatio = oEvent.target.value
		if(cellsWidthRatio==currentCellsWidthRatio){
			return
		}else{
			// if(cellsWidthRatio==10){
			// 	cellsWidthRatio='max'
			// }
			// if(cellsWidthRatio==1){
			// 	cellsWidthRatio='min'
			// }
			dispatch(changeCellsWidthRatio(cellsWidthRatio))
			let items = document.getElementsByClassName('Timelineblocks')[0].childNodes
			
			let timeline = document.getElementsByClassName('Timelineblocks')[0]
			if((cellsWidthRatio-currentCellsWidthRatio)>0){
				timeline.style.width= +timeline.style.width.split('%')[0]*1.5+'%'
			}else if((cellsWidthRatio-currentCellsWidthRatio)<0){
				timeline.style.width= +timeline.style.width.split('%')[0]/1.5+'%'
			}

			for(let el of items){
				for(let cells of el.childNodes){
					if((cellsWidthRatio-currentCellsWidthRatio)>0){
						cells.style.width = +cells.style.width.split('%')[0]*1.5+'%'
					}else if((cellsWidthRatio-currentCellsWidthRatio)<0){
						cells.style.width = +cells.style.width.split('%')[0]/1.5+'%'
					}
				}
			}
			setCurrentCellsWidthRatio(cellsWidthRatio)
			
		}
	}

	
		return(
			<>
			<div id="cellsCount" className="seqBtns">
            <button className="cellsCount" data-type='+' onClick={changeCountCellsFunc}>+</button>    
            <button className="cellsCount" data-type='-' onClick={changeCountCellsFunc}>-</button>    
            </div>
		
			<div id='playButtons' className="seqBtns">
					<button onClick={playMusic}>???</button>
					<button onClick={stopMusicFunc}>???</button>
					<button onClick={playAllMusic}><span style={{fontSize:'15px'}}>all</span>???</button>
			</div>

			<div id="settingsButtons">
				<input id='addChordCheckBox' checked={isChordsUsed} class="custom-checkbox" type='checkbox' onClick={addChords}/>
				<label for='addChordCheckBox'>??????????????</label>
			</div>
			<label id='labelSliderRelease' >???????????? ????????: <span style={{fontSize:'23px', marginLeft:'6px', fontWeight: 'bold'}}>{targerValue}</span> </label>
				<Slider   max={8} value={targerValue} min={2} scale={sliderScale} id='SliderRealease' onChange={changeDurationNotes} aria-label="Default" />
				
				<label id='labelSliderWidthCells' >???????????? ????????????: <span style={{fontSize:'23px', marginLeft:'6px', fontWeight: 'bold'}}>{currentCellsWidthRatio}</span> </label>
				<Slider  max={10} value={currentCellsWidthRatio} min={1} id='SliderWidthCells' onChange={changeCellsWidth} aria-label="Default" />
			

			<div id="utilsButton" className="seqBtns">
 					<button id="trashCanBtn" onClick={clearTimeline}><img height='30px' src={trashCan}></img></button>
			</div>
			</>
		)
	
}

export default ButtonTimeLine 




