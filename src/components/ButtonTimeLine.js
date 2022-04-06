import React from "react"
import { useSelector} from "react-redux";
import * as Tone from "tone";
import { Piano } from "./Instruments";
import { playAllTracks } from "./utils/playAllTracks";


import './ButtonTimeLine.css'

 const ButtonTimeLine = ({
	 changePlay,
	 stopMusic,
	 changeCountCells,
	})=>{

	const trackMemory = useSelector(state=>state.sequencer.trackMemory)
	const instruments = useSelector(state=>state.sequencer.currentInstrument)

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
					<span>slider длина ноты по звуку и внешне</span>
 					<button onClick={clearTimeline}>clear timeline</button>
				</div>
			</div>
			</>
		)
	
}

export default ButtonTimeLine 




