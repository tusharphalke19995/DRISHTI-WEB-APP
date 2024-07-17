import { configureStore } from '@reduxjs/toolkit'
import noteSlice from './slice/noteSlice'
import elementSlice from './slice/elementSlice'

export const store = configureStore({
    reducer: {
        note: noteSlice,
        element: elementSlice,
    }
})