import React, {Component} from "react";
import {Draw} from "tone";
import {TickSignal} from "tone/build/esm/core/clock/TickSignal";
import './style.css'
export default class PlayLine extends Component {
    constructor(props) {
        super()
        this.state = {
            timePassed: 0,
            isPaused: true,
            beforeStop: 0,
            alreadyStop: false
        }
        this.moveLine = this.moveLine.bind(this)
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
                beforeStop = Math.ceil(beforeStop / 52)*52;
                
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
                    //надо ориентироваться на значение ширина у клетки 52 = ширина вместе с бортом
                    left: 100 + this.state.beforeStop + this.state.timePassed * this.props.bpm /1153 + 'px'
                }
            }
            className = "line" >

            </div> 
            </>
        )
    }
}