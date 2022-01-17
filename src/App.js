import React,{Component} from 'react';
import Sequencer from './components/Sequencer/Sequencer';
import './App.css';

export default class App extends Component{
  constructor(){
    super()

  }
  render(){
    return(
      <>
     <Sequencer/>
      </>
    )
  }
}
