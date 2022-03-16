import React,{Component} from "react"
import {changeBpm} from '../../store/sequencerSlice'
import {useDispatch} from 'react-redux'
import { useSelector } from "react-redux"
import './style.css'

 const ButtonTimeLine = ({
	 changePlay,
	 stopMusic,
	//  changeBpm,
	 changeCountCells,
	//  valueBpm
	})=>{
	const bpm = useSelector(state=>state.sequencer.bpm)
	const dispatch = useDispatch()

	const playMusic = ()=>{
		 changePlay()
	}
	const stopMusicFunc = ()=>{
		//  changePlay()
		 stopMusic()
	}
	const changeBpmFunc = ()=>{
		 changeBpm()
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
					<button onClick={stopMusicFunc}>stop</button>
					<input id='bpm' type="number" min="60" max='300' onChange={()=>dispatch(changeBpm())} value={bpm} /> 
					<button onClick={clearTimeline}>clear timeline</button>
				</div>
			</div>
			</>
		)
	
}

export default ButtonTimeLine 