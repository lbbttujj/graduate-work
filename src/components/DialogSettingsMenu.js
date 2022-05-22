import React ,{useState} from 'react'
import settingsViget from '../data/img/control.png'
import { Knob } from 'primereact/knob';
import { Button } from 'primereact/button';

import './DialogSettingsMenu.css'
import { useSelector,useDispatch } from 'react-redux';
import { changeGainRedux,changeDistortionRedux,changeChorusRedux, changeFreverbRedux } from '../store/sequencerSlice';

const DialogSettingsMenu = ()=>{

    // const [gain, setGain] = useState(0);
    const gain = useSelector(state=>state.sequencer.currentSubTrack.gain)
    const distortion = useSelector(state=>state.sequencer.currentSubTrack.distortion)
    const chorus = useSelector(state=>state.sequencer.currentSubTrack.chorus)
    const freeverb = useSelector(state=>state.sequencer.currentSubTrack.freverb)

    // const [distortion, setDistortion] = useState(0);
    // const [chorus, setСhorus] = useState(0);
    // const [freeverb, setFreeverb] = useState(0);
    
    const dispatch = useDispatch()

    const showAudioSettings = (oEvent)=>{
        
        if(oEvent.target.dataset.showed!=='true'){
            oEvent.target.parentNode.parentNode.style.width='322px';
            oEvent.target.parentNode.parentNode.style.backgroundColor='#bbadad'
            document.getElementsByClassName('mainStageSequencer')[0].style.width='73%'
            document.getElementById('settingsCards').style.display='flex'

            oEvent.target.dataset.showed=true
        }else{
            oEvent.target.parentNode.parentNode.style.width='80px'
            oEvent.target.parentNode.parentNode.style.backgroundColor='#959595'
            
            document.getElementById('settingsCards').style.display='none'

            document.getElementsByClassName('mainStageSequencer')[0].style.width='90%'
            oEvent.target.dataset.showed=false
        }
    }

    const changeGain=(oEvent)=>{
        dispatch(changeGainRedux(oEvent.value))
    }
    const changeDistortion=(oEvent)=>{
        dispatch(changeDistortionRedux(oEvent.value))
    }
    const changeСhorus=(oEvent)=>{
        dispatch(changeChorusRedux(oEvent.value))
        
        
    }
    const changeFreeverb=(oEvent)=>{
        dispatch(changeFreverbRedux(oEvent.value))
        
        
    }

    return (
        <>
        <div id='audioSettings'>
        <div onClick={showAudioSettings} id='settingsViget'><img style={{'cursor':'pointer'}} alt='settings' src={settingsViget}></img></div> 
        <div id='settingsCards'>
            <div className="card">
                <div className="grid formgrid text-center">
                    <div className="field col-2 md:col-4">
                        <h5>Gain</h5>
                        <Knob value={gain} min={0} max={10} size={50} valueColor={"violet"} valueTemplate={"{value}"} textColor={'white'} rangeColor={"white"} onChange={changeGain}/>
                    </div>
        
                </div>
            </div>
            <div className="card">
                <div className="grid formgrid text-center">
                    <div className="field col-2 md:col-5">
                        <h5>distortion</h5>
                        <Knob value={distortion}  min={0} max={10} size={50} valueColor={"violet"} valueTemplate={"{value}"} textColor={'white'} rangeColor={"white"} onChange={changeDistortion}/>
                    </div>
        
                </div>
            </div>
            <div className="card">
                <div className="grid formgrid text-center">
                    <div className="field col-2 md:col-7">
                        <h5>chorus</h5>
                        <Knob value={chorus}  min={0} max={10} size={50} valueColor={"violet"} valueTemplate={"{value}"} textColor={'white'} rangeColor={"white"} onChange={changeСhorus}/>
                    </div>
        
                </div>
            </div>
            <div className="card">
                <div className="grid formgrid text-center">
                    <div className="field col-2 md:col-9">
                        <h5>freeverb</h5>
                        <Knob value={freeverb}  min={0} max={10} size={50} valueColor={"violet"} valueTemplate={"{value}"} textColor={'white'} rangeColor={"white"} onChange={changeFreeverb}/>
                    </div>
        
                </div>
            </div>
        </div>
        </div>
        </>
    )
}   

export default DialogSettingsMenu