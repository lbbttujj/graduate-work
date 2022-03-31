import * as Tone from "tone";
import React from 'react'

export default  function Cheeeck() {
    const play = async () => {
        await Tone.start()
        const synth = new Tone.Synth().toDestination();
        const synth2 = new Tone.Synth().toDestination();
        // repeated event every 8th note
        let count = 0
        const notes = ['C','G','F','A','F','C']
        Tone.Transport.scheduleRepeat((time) => {
            if(count==2){
                Tone.Transport.stop()
            }
            
            // use the callback time to schedule events
            let currentNote = notes[count]+'4'
            synth.triggerAttackRelease(currentNote,'8n')
            synth2.triggerAttackRelease(currentNote+3,'8n')
            count++
        }, 0.5);
        
        // transport must be started before it starts invoking events
    }
    Tone.Transport.start();
    return(
        <>
        <h2>chheeeeck</h2>
        <button onClick={play}>press me</button>
        </>
    )
  
  };