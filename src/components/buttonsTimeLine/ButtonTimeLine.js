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
		var s  = document.getElementsByClassName('Timelineblocks__cells')
		for(let i =0; i<s.length; i++){
			if(s[i].classList.contains('active'))
			   {
					s[i].classList.remove('active')
			   }
		}
	}


	render(){
		return(
			<>
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