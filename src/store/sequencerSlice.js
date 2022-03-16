import {createSlice} from '@reduxjs/toolkit'

const sequencerSlice = createSlice({
    name: 'sequencer',
    initialState:{
        currentNote:'',
        play:false,
        stop:false,
        bpm:120,
        cellsCount:24
    },
    reducers:{
        changeBpm(state,action){
            state.bpm = document.getElementById('bpm').value
        }
    }
})

export const {changeBpm} = sequencerSlice.actions
export default sequencerSlice.reducer
