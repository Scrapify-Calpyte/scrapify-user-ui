import { useKeycloak } from '@react-keycloak/web';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { AuthContext } from '~/context/AuthProvider/index';
import { useContext } from 'react';
import { useEffect } from 'react';
// eslint-disable-next-line react/prop-types
export default function PrivateRoute(props) {
    const { keycloak, initialized } = useKeycloak();
    const { setAuthData } = useContext(AuthContext);

    useEffect(() => {
        if (initialized && keycloak.authenticated) {
            setAuthData({ userName: keycloak.tokenParsed.preferred_username, email: keycloak.tokenParsed.email });
        }
    }, [keycloak, initialized]);

    if (!initialized) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: window.innerHeight - 400,
                    width: '100%'
                }}
            >
                <Stack alignItems="center">
                    <CircularProgress
                        sx={{
                            color: '#1bd7a0',
                            zIndex: 1
                        }}
                    />
                    <br></br>
                    <b style={{ color: '#1bd7a0' }}>Authenticating...</b>
                </Stack>
            </Box>
        );
    }

    if (!keycloak.authenticated && props.isAuth) {
        return keycloak.login();
    } else {
        return <>{props.children}</>;
    }
}
