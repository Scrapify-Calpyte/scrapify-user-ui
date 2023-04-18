import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import MenuProvider from './MenuProvider';
import { styled } from '@mui/material/styles';

const MainLayout = () => {
    const DrawerHeader = styled('div')(({ theme }) => ({ ...theme.mixins.toolbar }));

    return (
        <Box sx={{ display: 'flex', width: '100%' }}>
            <CssBaseline />
            <MenuProvider />
            <div style={{ flexGrow: 1 }}>
                <DrawerHeader />
                <Outlet />
            </div>
        </Box>
    );
};

export default MainLayout;
