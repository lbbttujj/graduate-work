import React, {Component} from "react";

import './PlayLine.css'
export default class PlayLine extends Component {
    constructor(props) {
        super()
        this.state = {
            timePassed: 0,
            stateUpdate:true,
            beforeStop: 0,
            cellsClientWidthState:0
        }
        this.moveLine = this.moveLine.bind(this)
        
    }

    componentDidMount(){
     
    }


    componentDidUpdate() {
        if ((this.props.play && this.state.stateUpdate)) {
            let cellsClientWidth = document.getElementsByClassName('Timelineblocks__items')[0].childNodes[0].clientWidth
            this.moveLine(cellsClientWidth)
            

        }
    }

    moveLine = (cellsClientWidth) => {
        let endScreenPX = this.props.cellsCount*cellsClientWidth
        
        this.setState({stateUpdate:false,cellsClientWidthState:cellsClientWidth})

        let start = Date.now()
        let timer = setInterval(function () {
        
                 if(+document.getElementsByClassName('line')[0].style.left.split('').slice(0,7).join('') >= 100+endScreenPX){
                 
                    
                clearInterval(timer)
                
                this.setState({
                    beforeStop: 0,
                    timePassed: 0,
                    stateUpdate:true
                })
                return
            }

            if (!this.props.play) {
                
                clearInterval(timer)
                let beforeStop = Number(document.getElementsByClassName('line')[0].style.left.split('').slice(0, -2).join('')) - 100 
                beforeStop = Math.ceil(beforeStop / cellsClientWidth)*cellsClientWidth;
                
                this.setState({
                    beforeStop:beforeStop,
                    timePassed: 0,
                    stateUpdate:true
                })

                if (this.props.stop) {
                    this.setState({
                        beforeStop: 0
                    })
                }
            } else {
                this.setState({
                    timePassed: Date.now() - start
                })
            }

        }.bind(this), 20)
    }

    render() {

        return (
            <>
            <div style = {
                {
                    left: 100 + this.state.beforeStop + this.state.timePassed/60000*this.state.cellsClientWidthState*this.props.bpm / (this.props.release*2) + 'px'
                }
            }
            className = "line" >

            </div> 
            </>
        )
    }
}