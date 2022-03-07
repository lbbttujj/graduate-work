import React,{Component} from "react"
import './style.css'
export default class ButtonTimeLine extends Component{
	constructor(props){
		super()
		this.state={

		}
	}

	playMusic = ()=>{
		this.props.changePlay()
	}
	stopMusic = ()=>{
		// this.props.changePlay()
		this.props.stopMusic()
	}
	changeBpm = ()=>{
		this.props.changeBpm()
	}

	clearTimeline = ()=>{
		this.stopMusic();
		var allItems  = document.getElementsByClassName('Timelineblocks__cells')
		for(let i =0; i<allItems.length; i++){
			if(allItems[i].classList.contains('active'))
			   {
				allItems[i].classList.remove('active')
			   }
		}
	}

	changeCountCells = (oEvent)=>{
		if(oEvent.target.textContent==='+'){	
			this.props.changeCountCells(true)
		}else{
			this.props.changeCountCells(false)

		}
	
	}


	render(){
		return(
			<>
			<div className="cellsCount">
            <button  onClick={this.changeCountCells}>+</button>    
            <button  onClick={this.changeCountCells}>-</button>    
            </div>
			<div className='TopButtons'>
				<div className='playButton'>
					<button onClick={this.playMusic}>play</button>
					<button onClick={this.stopMusic}>stop</button>
					<input id='bpm' type="number" min="60" max='300' onChange={this.changeBpm} value={this.props.valueBpm} /> 
					<button onClick={this.clearTimeline}>clear timeline</button>
				</div>
			</div>
			</>
		)
	}
}