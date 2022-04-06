// import * as Tone from "tone";
// import React from 'react'
// import { ToneWithContext } from "tone/build/esm/core/context/ToneWithContext";


// const audioExample = require("./A2.mp3");


// export default  function Cheeeck() {
//     const synth = new Tone.PolySynth().toDestination();
//     const play = async () => {

//         await Tone.start()
       
//         // const synth2 = new Tone.Synth().toDestination();
//         // repeated event every 8th note
//         let count = 0
//         const notes = ['C','G','F','A','F','C']

//         const noteExample = 
//         [
//             ['G4', 'E4'],
//             ['E4'],
//             ['G#4', 'E4'],
//             ['A#2', 'E3']
//         ]
       
//         let i=0
//         const timer = setInterval(() => {      
//                     synth.triggerAttackRelease(noteExample[i],'8n')
//                 i++
//                 if(i>=noteExample.length){
//                     clearInterval(timer)
//                 }
//         }, 500);
        

        
        
//         // transport must be started before it starts invoking events
//     }
    
//     return(
//         <>
//         <h2>chheeeeck</h2>
//         <audio src={audioExample} controls />;
//         <button onClick={play}>press me</button>
//         </>
//     )
  
//   };