import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { ELEMENT_API } from '../../constants'

const initialState = {
    elements: [],
    isLoading: false,
    error: null,
}

export const fetchElement = createAsyncThunk(
    'element/fetchElement',
    async (caseId) => {
      const res = await axios(`${ELEMENT_API}/v1/getAll/${caseId}`)
      return res.data
    }
  )

  export const elementSlice = createSlice({
    name: 'element',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(fetchElement.pending, (state) => {
        state.isLoading = true
      })
      builder.addCase(fetchElement.fulfilled, (state, action) => {
        state.isLoading = false
        state.elements = action.payload
      })
      builder.addCase(fetchElement.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message
      })
    },
  })
  
  export default elementSlice.reducer