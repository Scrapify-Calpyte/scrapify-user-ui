import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import MenuProvider from './MenuProvider';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Map, GoogleApiWrapper } from 'google-maps-react';

const MainLayout = ({ google }) => {
    const drawerWidth = 300;

    // drawer toggler
    const [open, setOpen] = useState(true);

    const handleDrawerToggle = () => {
        setOpen(!open);
    };

    const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
        flexGrow: 1,
        padding: '1%',
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        // marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen
            })
            // marginLeft: 0
        })
    }));

    const mapStyles = {
        width: '100%',
        height: '100%'
    };

    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end'
    }));

    return (
        <Box sx={{ display: 'flex', width: '100%' }}>
            <CssBaseline />
            <MenuProvider handleDrawer={handleDrawerToggle} />
            <Main open={open}>
                <DrawerHeader />
                <p>Page Content</p>
                <Outlet />
            </Main>
        </Box>
    );
};

export default GoogleApiWrapper({
    apiKey: 'AIzaSyA4F9JYoct7v7oGvirzAx7_oK6XkNyL1oM'
})(MainLayout);
