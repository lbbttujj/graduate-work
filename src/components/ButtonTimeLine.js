import React ,{useState}from "react"
import { useSelector,useDispatch} from "react-redux";
import { setNotesSize } from "../store/sequencerSlice";
import * as Tone from "tone";
import { Piano } from "./Instruments";
import { playAllTracks } from "./utils/playAllTracks";
import Slider from '@mui/material/Slider';



import './ButtonTimeLine.css'

 const ButtonTimeLine = ({
	 changePlay,
	 stopMusic,
	 changeCountCells,
	})=>{

	const trackMemory = useSelector(state=>state.sequencer.trackMemory)
	const instruments = useSelector(state=>state.sequencer.currentInstrument)
	const currentSubTrack = useSelector(state=>state.sequencer.currentSubTrack) 

	let valueNotesSize  
	const [noteDuration,setNoteDuration] = useState(500)
	const dispatch = useDispatch()

	const playMusic = ()=>{
		 changePlay()
	}
	const stopMusicFunc = ()=>{
		//  changePlay()
		 stopMusic()
	}
	const playAllMusic = ()=>{
		playAllTracks(Tone,trackMemory,instruments,Piano)
		setTimeout(() => {
			playMusic()
		}, 500);
	}
	

	const clearTimeline = ()=>{
		stopMusicFunc();
		var allItems  = document.getElementsByClassName('Timelineblocks__cells')
		for(let i =0; i<allItems.length; i++){
			if(allItems[i].classList.contains('active'))
			   {
				allItems[i].classList.remove('active')
			   }
		}
	}

	const changeCountCellsFunc = (oEvent)=>{
		if(oEvent.target.textContent==='+'){	
			 changeCountCells(true)
		}else{
			 changeCountCells(false)

		}
	
	}

	const changeDurationNotes = (oEvent)=>{
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


	
		return(
			<>
			<div className="cellsCount">
            <button  onClick={changeCountCellsFunc}>+</button>    
            <button  onClick={changeCountCellsFunc}>-</button>    
            </div>
			<div className='TopButtons'>
				<div className='playButton'>
					<button onClick={playMusic}>play</button>
					<button onClick={playAllMusic}>playAll</button>
					<button onClick={stopMusicFunc}>stop</button>
					<Slider defaultValue={5} max={8} min={2} scale={sliderScale} onChange={changeDurationNotes} aria-label="Default" valueLabelDisplay="auto" />
 					<button onClick={clearTimeline}>clear timeline</button>
				</div>
			</div>
			</>
		)
	
}

export default ButtonTimeLine 




