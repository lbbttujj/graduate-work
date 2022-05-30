import axios from "axios";


export const playAllTracks = (Tone,trackMemory,instruments,Piano,bpm)=>{

const oTracks ={}  //Объект треков
let bpm_ = bpm
let recorder = new Tone.Recorder();


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

    
        synth.connect(recorder)
        recorder.start()
}

/* Распаралеливание дорожек. Дорожки играются одновременно в интервале*/
for(let tracks in oTracks){

    const timer = setInterval( async () => { 
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
        let audioSettings={}
        audioSettings.gain=subTrack.gain
        audioSettings.distortion=subTrack.distortion
        audioSettings.chorus=subTrack.chorus
        setTimeout(() => {
            let i=0
            playSubtrack(subTrack.notes,synth,subTrack.release,audioSettings,i,120)
        }, delay);
        setTimeout( async() => {
            const recording = await recorder.stop()
            debugger
            /////////////////////

            // const blobToBase64 =(blob)=> {
            //     const reader = new FileReader();
            //     reader.readAsDataURL(blob);
            //     return new Promise(resolve => {
            //         reader.onloadend = () => {
            //             resolve(reader.result);
            //         };
            //     });
            // };

            // await blobToBase64(recording)
            //  .then( async (base64Data) => {
            //      const file = "data:audio/weba;base64," + base64Data;
            //     //  const formData = new FormData();
            //     //  formData.append('file', file);
            //     debugger
                
            //     const headers = {
            //         "Authorization": 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNWIxMzgzMjZmMjdmNmM0NDQ4ZWY1NzY5OTdkYTE0NTY5YmIzZjVlMTFjNTgxNTc4NTI1ZmM5NmU4NmVkZjdiZDdmMmIzYzYxZjA1M2VlNWEiLCJpYXQiOjE2NTM4MzQ2NTUuNzEyMDEyLCJuYmYiOjE2NTM4MzQ2NTUuNzEyMDEzLCJleHAiOjQ4MDk1MDgyNTUuNzAwMjA2LCJzdWIiOiI1ODE3NTkyMiIsInNjb3BlcyI6WyJ1c2VyLnJlYWQiLCJ1c2VyLndyaXRlIiwidGFzay5yZWFkIiwidGFzay53cml0ZSIsIndlYmhvb2sucmVhZCIsIndlYmhvb2sud3JpdGUiLCJwcmVzZXQucmVhZCIsInByZXNldC53cml0ZSJdfQ.jzJ3Sla07tIUjTj1Lr6y1gKx82Jzul5Som8UxidqtemrV0BnEwwUn9ulacpZ_IyDt4Us-RpgOagv_gB-h9jY1ptlu0VtGPYPBpfgrBmor-cNM-SCD6tbXlhjwiice8RHpwZIYpM-ChKhg_Fo0egrbhTtB5W15Pk0g_W6zYu-kCH7lLDvwhxPcNeo-YHwnS40RCIi_OZ8Hji-xKYc4xIBLDBUTiBgRwvRxAoo0b9aguUo_3n0mZ2chHLutaIoD_U82ileU3DFmG3uhoqJBpWJEUf4oEpAoiJf9YXD8_pJM-qLvOM_Y6LprCe_lVab5XPvAReGeuuWvpM7zyPLA9lCM1_1lqshTxtdCdEnpCYmo9cU51WkP2b43Jkenoy2i0viTXdzx73o53f71NJsS1WoScHNiJygFPVmbLYEj1Gb-AeRce5PRMJ6D53f5UAJRJ4FpgJ2vRSkj6T3rtkaJ5FRR9K7zYCYaBAyTWmNYPB5ov-J0UD2-6uFMFKV2XtPhG4Gy8AsTx8BQwuBCCr7GXkcuglbw4YLQPgbuQ9MHYdhJEnS6KQy9uJS0Bnc8QmYqO0clARI8SblvR7QXE9TZsSPtRLze2rgVlBYozyQstNtV4vy2BoNl4QqEM9DcLAqNjo00IN0x8D-I7tmXxnFIKIklwszVTtGaxmOy0NtvFKv2kU',
            //         "Content-type": "application/json"
            //       }
            //       const data = {
            //         "tasks": {
            //             "import-1": {
            //                 "operation": "import/base64",
            //                 "file": file,
            //                 "filename": "test.weba"
            //             },
            //             "task-1": {
            //                 "operation": "convert",
            //                 "input_format": "weba",
            //                 "output_format": "mp3",
            //                 "engine": "ffmpeg",
            //                 "input": [
            //                     "import-1"
            //                 ],
            //                 "audio_codec": "mp3",
            //                 "audio_qscale": 0
            //             },
            //             "export-1": {
            //                 "operation": "export/url",
            //                 "input": [
            //                     "task-1"
            //                 ],
            //                 "inline": false,
            //                 "archive_multiple_files": false
            //             }
            //         },
            //         "tag": "jobbuilder"
            //     }
            //       await axios.post('https://api.cloudconvert.com/v2/jobs',data,{
            //         headers:headers
            //       })
            //             .then(async(serverResponse)=>{
            //               const id = serverResponse.data.data.id
            //                 await axios.get(`https://sync.api.cloudconvert.com/v2/${id}`)
            //                         .then((ServerResponse)=>{
            //                             debugger
            //                         })
            //                         .catch((error)=>{
            //                             debugger
            //                         })
                            

            //             })
            //             .catch((error)=>{
            //               debugger
            //             })



            //     })

            ///////////////////////
            const url = URL.createObjectURL(recording);
            sessionStorage.setItem('urlBlobTrack',url)
        }, 6000); /// как то нужно динамически менять пока 10 секунд ждать на всякий чтобы все записалось
    }
        


    /*Проигрыш отдельного субтрека с указанной длительностью*/
   function playSubtrack(aNotes,synth,release,audioSettings,i,bpm){
    
    const Distortion = new Tone.Distortion(audioSettings.distortion).toDestination();
    const Gain = new Tone.Gain(audioSettings.gain).toDestination();
    const chorus = new Tone.Chorus(audioSettings.chorus, 2.5, 0.5).toDestination().start()
    // const crusher = new Tone.BitCrusher(0).toDestination();
    // var freeverb = new Tone.Freeverb().toDestination().start();
  
    synth.chain(Distortion)
    synth.chain(Gain)
    synth.chain(chorus)
   const t = setInterval(() => {
    synth.triggerAttackRelease(aNotes[i],release)
    i++
    clearInterval(t)
    }, 0);
       const timer = setInterval(  () => {
            synth.triggerAttackRelease(aNotes[i],release)
            i++
            if(i>=aNotes.length){
                clearInterval(timer)
                
            }
        }, 1/bpm_*60000*release*2);
    
    }
}