import React,{Component} from 'react';
import AudioStudio from '../src/components/AudioStudio'
import './App.css';
import Cheeeck from './components/__checkToneJs';

export default class App extends Component{
  constructor(){
    super()

  }
  render(){
    
    return(
      <>
      <Cheeeck></Cheeeck>
      <AudioStudio/>
      </>
    )
  }
}
