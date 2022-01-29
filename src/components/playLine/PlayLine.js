import React,{Component} from "react";
import { Draw } from "tone";
import  './style.css'
export default class PlayLine extends Component{
    constructor(props){
        super()
        this.state={
            // play:props.play
        }
        // this.animateMove=this.animateMove.bind(this);
        // this.customDraw=this.customDraw.bind(this);
        
    }

    componentDidUpdate(){
        debugger
    }

 


    
    render(){

     
            if(this.props.play){
                let start = Date.now()
                 setInterval(() => {
                    let timePassed = Date.now()-start   
                    if (timePassed >= 4000) {
                        clearInterval(timer); // закончить анимацию через 2 секунды
                        return;
                      }
                    customDraw(timePassed)
                }, 1);
            }
    
       const customDraw=(timePassed)=> {
         document.getElementsByClassName('line')[0].style.left = 100 + timePassed / 15 + 'px'
              }
        

        return(
            <>
            <div className="line">

            </div>
            </>
        )
    }
}