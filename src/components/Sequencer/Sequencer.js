import React, {Component } from "react";
import Keys from "../keys/Keys";
import Timeline from "../timeline/Timeline";
export default class Sequencer extends Component{
    constructor(){
        super()
    }
    render(){
        return(
            <>
            <div className="mainStageSequencer">
                <Keys/>
                <Timeline/>
            </div>
            </>
        )
    }
}