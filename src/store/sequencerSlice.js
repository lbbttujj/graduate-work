import {createSlice} from '@reduxjs/toolkit'

const sequencerSlice = createSlice({
    name: 'sequencer',
    initialState:{
        bpm:120,
        trackMemory:{},
        currentInstrument:{},
        currentSubTrack:{nameSubTrack:null,currentNoteSize:0.5},
    },
    reducers:{
        changeBpm(state,action){
            state.bpm = action.payload.target.value
        },
        changeTrackMemory(state,action){
            
            if(action.payload.add){
                let nameSubtrack =  state.currentSubTrack.nameSubTrack
                let objectToMemory = action.payload.data
                    objectToMemory.release = state.currentSubTrack.currentNoteSize
                   state.trackMemory[nameSubtrack] = objectToMemory

                   state.currentSubTrack.nameSubTrack=null
                   state.currentSubTrack.currentNoteSize=0.5
            
            }else{
                /// удалить 
            }
        },
        setInstrument(state,action){
            state.currentInstrument[action.payload.track] = action.payload.instrument
        },
        setNotesSize(state,action){
            state.currentSubTrack.currentNoteSize = action.payload.value
        },
        setCurrentSubTrack(state,action){
            state.currentSubTrack.nameSubTrack = action.payload
        }

    }
})

export const {changeBpm,changeTrackMemory,setInstrument,setNotesSize,setCurrentSubTrack} = sequencerSlice.actions
export default sequencerSlice.reducer
