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
        fontFamily: 'Cursive'
    }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <MUIThemeProvider theme={theme}>
        <AuthProvider>
            <AxiosProvider>
                <BrowserRouter>
                    <ThemeProvider>
                        <App />
                        <ToastContainer position="top-center" autoClose={2000} />
                    </ThemeProvider>
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
