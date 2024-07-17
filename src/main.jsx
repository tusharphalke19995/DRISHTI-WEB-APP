import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.scss'
import {  ThemeProvider } from '@mui/material/styles'
import { createTheme } from '@mui/material/styles'
import { QueryClient, QueryClientProvider } from 'react-query'

import { Provider } from 'react-redux'
import { store } from './redux/store'

// Create a client
const queryClient = new QueryClient();

// Create a theme instance.
const theme = createTheme({
  palette: {
    default: {
      main: '#b3b3b3'
    },
    success: {
      main: '#00A725'
    },
    warning: {
      main: '#FFB800'
    },
    error: {
      main: '#D91A1A'
    },
  },
  typography: {
    fontFamily: [
      'DM Sans',
      'sans-serif'
    ].join(','),
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </QueryClientProvider>
    </Provider>
  </React.StrictMode>,
)
