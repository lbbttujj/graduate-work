import React,{Component} from "react";
import { Draw } from "tone";
import { TickSignal } from "tone/build/esm/core/clock/TickSignal";
import  './style.css'
export default class PlayLine extends Component{
    constructor(props){
        super()
        this.state={
            timePassed:0,
            stopPlay:true,
            beforeStop:0,
            stopPlay2:true
        }
        this.moveLine=this.moveLine.bind(this)
    }

    componentDidUpdate(){
        //заменить стоплэй на паузу
        if((this.props.play && this.state.stopPlay)){
            this.moveLine()

        }
    }

    componentDidMount(){ 
         
    }

    componentWillUnmount(){
        
    }


    moveLine=()=>{
        this.setState({stopPlay:false})
       
        let start = Date.now()
        let timer = setInterval(function() {
            console.log(timer);
            if(!this.props.play){
                clearInterval(timer)
                this.setState({stopPlay:true})
                this.setState({
                    //100 хардкод исправить 
                    beforeStop:Number(document.getElementsByClassName('line')[0].style.left.split('').slice(0,-2).join(''))-100
                })
                this.setState({timePassed:0})
                debugger
                if(this.props.stop){
                    debugger
                    this.setState({
                    beforeStop:0
                    })
                }
            }else{
                this.setState({    
                    timePassed: Date.now()-start   
                })
               
            }
            

         
        }.bind(this), 20) 
    }

    render(){

     
        

        return(
            //15 связано со скоростью 
            <>
            
            <div style={{left:100 + this.state.beforeStop + this.state.timePassed / 15 + 'px'}} className="line">

            </div>
            </>
        )
    }
}