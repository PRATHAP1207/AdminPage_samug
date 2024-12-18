import './wdyr' // <--- first import
import React from 'react'
import App from './app/App'
import ReactDOM from 'react-dom'
import {
    BrowserRouter,
  
} from 'react-router-dom'
import 'perfect-scrollbar/css/perfect-scrollbar.css'
import * as serviceWorker from './serviceWorker'
import { StyledEngineProvider } from '@mui/styled-engine'
import { CssBaseline } from '@mui/material'

import 'dotenv/config' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
ReactDOM.render(
    <React.StrictMode>
        <StyledEngineProvider injectFirst>
            <BrowserRouter forceRefresh={true}>
                <CssBaseline />
                <App />
            </BrowserRouter>
        </StyledEngineProvider>
    </React.StrictMode>,
    document.getElementById('root')
)

// for IE-11 support un-comment cssVars() and it's import in this file
// and in MatxTheme file

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
