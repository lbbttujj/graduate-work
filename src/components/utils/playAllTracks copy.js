export const playAllTracks = (Tone,trackMemory,instruments,Piano,bpm)=>{

    const siblingsTracks = {}
    let bpm_ = bpm
    for(let el in trackMemory){
       let trackName = trackMemory[el].information.split('/')[0]
       let currentInstrument = instruments[trackName]
       let synth
      if(currentInstrument){
        synth = (new Tone.Sampler({
            urls: currentInstrument
          }).toDestination())
      }else{
        synth = (new Tone.Sampler({
            urls: Piano
          }).toDestination())
      }


      setTimeout(() => {
          
      }, timeout);
      
        
        

    }

  
   function playSubtrack(aNotes,synth,release,i){
    const timer = setInterval( () => {   
        // if(aNotes[i]=='/'){
        //     release = aNotes[i+1]
        //     i=i+2
        // } 
        
        synth.triggerAttackRelease(aNotes[i],release)
        i++
            if(i>=aNotes.length){
                clearInterval(timer)
            }
        }, 1/120*60000*release*2);
    }
 
}