import React, {Component} from "react";
import {Draw} from "tone";
import {TickSignal} from "tone/build/esm/core/clock/TickSignal";
// import { useSelector } from "react-redux"

import './style.css'
export default class PlayLine extends Component {
    constructor(props) {
        super()
        this.state = {
            timePassed: 0,
            isPaused: true,
            beforeStop: 0,
            alreadyStop: false,
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
        if ((this.props.play && this.state.isPaused)) {
            this.moveLine()
        }
    }

    moveLine = () => {
        this.setState({
            isPaused: false,
            alreadyStop: false
        })

        let start = Date.now()

        let timer = setInterval(function () {
            if (!this.props.play) {

                clearInterval(timer)
                let beforeStop = Number(document.getElementsByClassName('line')[0].style.left.split('').slice(0, -2).join('')) - 100 
                beforeStop = Math.ceil(beforeStop / this.state.cellsClientWidth)*this.state.cellsClientWidth;
                
                this.setState({
                    isPaused: true,
                    //100 хардкод исправить 
                    beforeStop:beforeStop,
                    timePassed: 0
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
        
        if (this.props.stop && !this.state.alreadyStop) {
            this.setState({
                beforeStop: 0,
                alreadyStop: true
            })
        }

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