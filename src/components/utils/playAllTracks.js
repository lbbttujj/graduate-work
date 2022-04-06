export const playAllTracks = (Tone,trackMemory,instruments,Piano)=>{

    const siblingsTracks = {}
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
      debugger
        if (!siblingsTracks[trackName]){

            siblingsTracks[trackName] = {notes:[],synth}
        }
        
        siblingsTracks[trackName].notes = siblingsTracks[trackName].notes.concat(trackMemory[el].notes)

    }

    for (let el in siblingsTracks){
        
        let aNotes = siblingsTracks[el].notes
        let synth = siblingsTracks[el].synth
        let i=0
        const timer = setInterval( () => {      
            synth.triggerAttackRelease(aNotes[i],'8n')
            i++
                if(i>=aNotes.length){
                    clearInterval(timer)
                }
            }, 500);
        
    }
 
}