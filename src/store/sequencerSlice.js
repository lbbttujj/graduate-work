import {createSlice} from '@reduxjs/toolkit'

const sequencerSlice = createSlice({
    name: 'sequencer',
    initialState:{
        bpm:120,
        trackMemory:[]
    },
    reducers:{
        changeBpm(state,action){
            state.bpm = action.payload.target.value
        },
        changeTrackMemory(state,action){
            if(action.payload.add){
                let index = state.trackMemory.findIndex((el)=>el.information===action.payload.data.information)
                if(index>-1){
                    state.trackMemory[index]=action.payload.data

                }else{
                    state.trackMemory.push(action.payload.data)
                }
            }else{
                /// удалить 
            }
        }

    }
})

export const {changeBpm,changeTrackMemory} = sequencerSlice.actions
export default sequencerSlice.reducer
