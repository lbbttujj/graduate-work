import React,{Component} from "react"
import './style.css'
export default class ButtonTimeLine extends Component{
	constructor(props){
		super()
		// this.state={

		// }
		this.playMusic=this.playMusic.bind(this)
	}

	playMusic = ()=>{
		this.props.changePlay()
	}


	render(){
		return(
			<>
			<div className='TopButtons'>
				<div className='playButton'>
					<button onClick={this.playMusic}>play</button>
					<button onClick={this.playMusic}>stop</button>
				</div>
			</div>
			</>
		)
	}
}