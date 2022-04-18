import {createSlice} from '@reduxjs/toolkit'

const sequencerSlice = createSlice({
    name: 'sequencer',
    initialState:{
        bpm:120,
        trackMemory:{},
        currentInstrument:{},
        currentSubTrack:{nameSubTrack:null,selectedInstrument:null, currentNoteSize:0.5,countCells:16,
            cellsWidthRatio:5,cellsWidthDefault:null,currentChord:null,isChordsUsed:false
        },
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
                    objectToMemory.countCells = state.currentSubTrack.countCells
                   state.trackMemory[nameSubtrack] = objectToMemory

                   state.currentSubTrack.nameSubTrack=null
                   state.currentSubTrack.currentNoteSize=0.5
                   state.currentSubTrack.isChordsUsed=false
                   state.currentSubTrack.countCells=16
            
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
        },
        changeCountCells(state,action){
            state.currentSubTrack.countCells = action.payload
        },
        changeCellsWidthRatio(state,action){
            state.currentSubTrack.cellsWidthRatio=action.payload
        },
        changeCellsWidthDefault(state,action){
            state.currentSubTrack.cellsWidthDefault=action.payload
        },
        changeCurrentChord(state,action){
            state.currentSubTrack.currentChord=action.payload
        },
        changeChordUsing(state,action){
            state.currentSubTrack.isChordsUsed=action.payload
        },
        selectedInstrument(state,action){
            
            state.currentSubTrack.selectedInstrument=action.payload

        }

    }
})

export const {changeBpm,changeTrackMemory,setInstrument,setNotesSize,setCurrentSubTrack,
              changeCountCells,changeCellsWidthRatio,changeCellsWidthDefault,changeCurrentChord,
              changeChordUsing,selectedInstrument
             } = sequencerSlice.actions
export default sequencerSlice.reducer
