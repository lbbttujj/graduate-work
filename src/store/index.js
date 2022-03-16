import {configureStore} from '@reduxjs/toolkit'
import sequencerSlice from './sequencerSlice'
export default configureStore(
    {
        reducer:{
            sequencer:sequencerSlice
        }
    }
)