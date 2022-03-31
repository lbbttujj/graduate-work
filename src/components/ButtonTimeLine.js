import React from "react"
import './ButtonTimeLine.css'

 const ButtonTimeLine = ({
	 changePlay,
	 stopMusic,
	 changeCountCells,
	})=>{

	const playMusic = ()=>{
		 changePlay()
	}
	const stopMusicFunc = ()=>{
		//  changePlay()
		 stopMusic()
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
					<span>slider длина ноты по звуку и внешне</span>
 					<button onClick={clearTimeline}>clear timeline</button>
				</div>
			</div>
			</>
		)
	
}

export default ButtonTimeLine 




