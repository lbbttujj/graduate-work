import React, {Component } from "react";
import Keys from "../keys/Keys";
export default class Sequencer extends Component{
    constructor(){
        super()
    }
    render(){
        return(
            <>
            <div className="mainStageSequencer">
                <Keys></Keys>
            </div>
            </>
        )
    }
}