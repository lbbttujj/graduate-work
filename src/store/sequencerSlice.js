import {createSlice} from '@reduxjs/toolkit'

const sequencerSlice = createSlice({
    name: 'sequencer',
    initialState:{
        bpm:120,
        trackMemory:{},
        currentInstrument:{},
    },
    reducers:{
        changeBpm(state,action){
            state.bpm = action.payload.target.value
        },
        changeTrackMemory(state,action){
            
            if(action.payload.add){
               let nameSubtrack = action.payload.data.information
        
                 if(state.trackMemory[nameSubtrack]){
                    state.trackMemory[nameSubtrack] = action.payload.data
                 }else{
                    state.trackMemory[nameSubtrack] = action.payload.data
                 }
            
            }else{
                /// удалить 
            }
        },
        setInstrument(state,action){
            state.currentInstrument[action.payload.track] = action.payload.instrument
        }

    }
})

export const {changeBpm,changeTrackMemory,setInstrument} = sequencerSlice.actions
export default sequencerSlice.reducer
