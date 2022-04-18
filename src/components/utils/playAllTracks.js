export const playAllTracks = (Tone,trackMemory,instruments,Piano,bpm)=>{

const oTracks ={}  //Объект треков
let bpm_ = bpm


/*Заполняется объект массивами субтреков по дорожкам*/
for(let subtracks in trackMemory){
    let name = subtracks.split('/')[0]
    if(oTracks[name]){
        oTracks[name].push(trackMemory[subtracks])
    }else{
        oTracks[name] = []
        oTracks[name].push(trackMemory[subtracks])
    }
    
}

/*Привязака инструмента к дорожке*/
for(let tracks in oTracks){
    let currentInstrument = instruments[tracks]
    let synth
    if(currentInstrument){
            synth = (new Tone.Sampler({
                urls: currentInstrument.data
              }).toDestination())
          }else{
            synth = (new Tone.Sampler({
                urls: Piano
              }).toDestination())
          }

    oTracks[tracks].push(synth)
}

/* Распаралеливание дорожек. Дорожки играются одновременно в интервале*/
for(let tracks in oTracks){

    const timer = setInterval( () => { 
        let currentTrack = oTracks[tracks]
        let synth = currentTrack[currentTrack.length-1]
        let prevDelay = 0
        for(let subTrack =0; subTrack<currentTrack.length-1; subTrack++){
            let delay = currentTrack[subTrack].notes.length*currentTrack[subTrack].release *1000
            testtimeOut(currentTrack[subTrack],prevDelay,synth,bpm_)
            prevDelay+=delay
        }

       clearInterval(timer)
   },0);

}

/*Последовательный проигрывание субтреков в рамках одного трека*/
    function testtimeOut(subTrack,delay,synth){
        debugger
        setTimeout(() => {
            let i=0
            playSubtrack(subTrack.notes,synth,subTrack.release,i,120)
        }, delay);
    }
        


    /*Проигрыш отдельного субтрека с указанной длительностью*/ //не получается сделать bpm
   function playSubtrack(aNotes,synth,release,i,bpm){
   const t = setInterval(() => {
    synth.triggerAttackRelease(aNotes[i],release)
    i++
    clearInterval(t)
    }, 0);
       const timer = setInterval( () => {
            synth.triggerAttackRelease(aNotes[i],release)
            i++
            if(i>=aNotes.length){
                clearInterval(timer)
            }
        }, 1/120*60000*release*2);
    
    }
}