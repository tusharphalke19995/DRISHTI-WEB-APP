import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { BASE_URL, NOTES } from '../../constants'

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
      const res = await axios.post(`${BASE_URL}${NOTES}`, note)
      return res.data
    }
  )

  export const updateNote = createAsyncThunk(
    'note/updateNote',
    async(request) => {
      const { noteId, edditedNote} = request
      const res = await axios.put(`${BASE_URL}${NOTES}/${noteId}`, edditedNote)
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
      builder.addCase(updateNote.pending, (state) => {
        state.isLoading = true
      })
      builder.addCase(updateNote.fulfilled, (state, action) => {
        state.isLoading = false
        // update existing note
        const payloadId = action.payload.id
        let objectIndex = state.notes.findIndex(obj => obj.id === payloadId)
        state.notes[objectIndex] = action.payload
        console.log("After update: ", state.notes[objectIndex])
      })
      builder.addCase(updateNote.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message
      })
    },
  })
  
  export default noteSlice.reducer