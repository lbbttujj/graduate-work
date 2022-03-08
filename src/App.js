import React,{Component} from 'react';
import AudioStudio from '../src/components/auidioStudio/AudioStudio'
import './App.css';

export default class App extends Component{
  constructor(){
    super()

  }
  render(){
    
    return(
      <>
      <AudioStudio/>
      </>
    )
  }
}
