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
      if (!siblingsTracks[trackName]){
          siblingsTracks[trackName] = {notes:[],synth}
        }
        
        siblingsTracks[trackName].notes = siblingsTracks[trackName].notes.concat(['/',trackMemory[el].release],trackMemory[el].notes)
        

    }

    for (let el in siblingsTracks){
        
        let aNotes = siblingsTracks[el].notes
        let synth = siblingsTracks[el].synth
        let release = aNotes[1]
        debugger
        let bpm = bpm_
        // let i=0
        let i=2
        playSubtrack(aNotes,synth,release,i)
        // const timer = setInterval( () => {   
        //     // if(aNotes[i]=='/'){
        //     //     release = aNotes[i+1]
        //     //     i=i+2
        //     // } 
            
        //     synth.triggerAttackRelease(aNotes[i],release)
        //     i++
        //         if(i>=aNotes.length){
        //             clearInterval(timer)
        //         }
        //     }, 1/120*60000*release*2);
        
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