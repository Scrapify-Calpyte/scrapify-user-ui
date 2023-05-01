// import { useKeycloak } from '@react-keycloak/web';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { AuthContext } from '~/context/AuthProvider/index';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import VerifyUser from '~/pages/ReusableComponents/VerifyUser/index';
import { useState } from 'react';
// eslint-disable-next-line react/prop-types
export default function PrivateRoute(props) {
    // const { keycloak, initialized } = useKeycloak();
    const { authData, setAuthData } = useContext(AuthContext);
    const navigate = useNavigate();

    // useEffect(() => {
    //     if (initialized && keycloak.authenticated) {
    //         setAuthData({ userName: keycloak.tokenParsed.preferred_username, email: keycloak.tokenParsed.email });
    //     }
    // }, [keycloak, initialized]);

    if (!authData?.token && props.isAuth) {
        return <VerifyUser onClose={(e) => {}} />;
    } else {
        return <>{props.children}</>;
    }

    // if (!initialized) {
    //     return (
    //         <Box
    //             sx={{
    //                 display: 'flex',
    //                 alignItems: 'center',
    //                 justifyContent: 'center',
    //                 height: window.innerHeight - 400,
    //                 width: '100%'
    //             }}
    //         >
    //             <Stack alignItems="center">
    //                 <CircularProgress
    //                     sx={{
    //                         color: '#1bd7a0',
    //                         zIndex: 1
    //                     }}
    //                 />
    //                 <br></br>
    //                 <b style={{ color: '#1bd7a0' }}>Authenticating...</b>
    //             </Stack>
    //         </Box>
    //     );
    // }

    // if (!keycloak.authenticated && props.isAuth) {
    //     return keycloak.login();
    // } else {
    //     return <>{props.children}</>;
    // }
}
