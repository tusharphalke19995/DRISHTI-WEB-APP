import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { BASE_URL } from '../../constants'

const initialState = {
    notes: [],
    isLoading: false,
    error: null,
}

export const fetchNotes = createAsyncThunk(
    'note/fetchNotes',
    async () => {
      const res = await axios.get(`${BASE_URL}/notes`)
      return res.data
    }
  )

  export const addNote = createAsyncThunk(
    'note/addNote',
    async(note) => {
      const res = await axios.post(`${BASE_URL}/notes`, note)
      return res.data
    }
  )

  export const noteSlice = createSlice({
    name: 'note',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(fetchNotes.pending, (state) => {
        state.isLoading = true
      })
      builder.addCase(fetchNotes.fulfilled, (state, action) => {
        state.isLoading = false
        state.notes = action.payload
      })
      builder.addCase(fetchNotes.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message
      })
      builder.addCase(addNote.pending, (state) => {
        state.isLoading = true
      })
      builder.addCase(addNote.fulfilled, (state, action) => {
        state.isLoading = false
        state.notes.push(action.payload)
      })
      builder.addCase(addNote.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message
      })
    },
  })
  
  export default noteSlice.reducer