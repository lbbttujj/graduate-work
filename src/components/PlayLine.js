import React, {Component} from "react";

import './PlayLine.css'
export default class PlayLine extends Component {
    constructor(props) {
        super()
        this.state = {
            timePassed: 0,
            stateUpdate:true,
            beforeStop: 0,
            cellsClientWidth:0
        }
        this.moveLine = this.moveLine.bind(this)
    }

    componentDidMount(){
        let cellsClientWidth = document.getElementsByClassName('Timelineblocks__cells')[0].clientWidth

        this.setState({
            cellsClientWidth:cellsClientWidth+2
        })
    }


    componentDidUpdate() {
        if ((this.props.play && this.state.stateUpdate)) {
            this.moveLine()
        }
    }

    moveLine = () => {
        let endScreenPX = this.props.cellsCount*this.state.cellsClientWidth
        this.setState({stateUpdate:false})

        let start = Date.now()
        let timer = setInterval(function () {
        
                 if(+document.getElementsByClassName('line')[0].style.left.split('').slice(0,7).join('') >= 100+endScreenPX){
                 
                    debugger
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
                beforeStop = Math.ceil(beforeStop / this.state.cellsClientWidth)*this.state.cellsClientWidth;
                
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
                    left: 100 + this.state.beforeStop + this.state.timePassed/60000*this.state.cellsClientWidth*this.props.bpm + 'px'
                }
            }
            className = "line" >

            </div> 
            </>
        )
    }
}