import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import keycloak from './keycloak';
import { ThemeProvider } from './util/ThemeProvider';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { AxiosProvider } from './components/useAxios';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './context/AuthProvider/index';
import { createTheme, ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
const jwt_decode = require('jwt-decode');
import 'typeface-inter';

const theme = createTheme({
    typography: {
        fontFamily: 'Inter Tight, Cursive , Arial, sans-serif',
        fontWeight: '600',
        fontSize: '16px'
    },
    palette: {
        primary: {
            main: '#1cd8a2' // Set the desired primary color
        },
        secondary: {
            main: '#013F56' // Set the desired secondary color
        },
        light: {
            main: '#FBFCFC'
        },
        dark: {
            main: '#343a40'
        },
        grey: {
            main: '#818694'
        }
    }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <MUIThemeProvider theme={theme}>
        <AuthProvider>
            <AxiosProvider>
                <BrowserRouter>
                    <App />
                    <ToastContainer position="top-center" autoClose={2000} />
                </BrowserRouter>
            </AxiosProvider>
        </AuthProvider>
    </MUIThemeProvider>
    //    <ReactKeycloakProvider authClient={keycloak}>
    //     </ReactKeycloakProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
