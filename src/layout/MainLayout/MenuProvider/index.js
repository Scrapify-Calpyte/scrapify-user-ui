import * as React from 'react';
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { useEffect } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import './menu.css';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined';
import { useNavigate } from 'react-router-dom';
import { Divide as Hamburger } from 'hamburger-react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ThemeContext } from '/src/util/ThemeProvider';
import { useContext } from 'react';
import VerifyUser from '~/pages/ReusableComponents/VerifyUser/index';
import { AuthContext } from '~/context/AuthProvider/index';
const drawerWidth = 300;
// import { useKeycloak } from '@react-keycloak/web';
import Profile from './Profile';
import InventoryIcon from '@mui/icons-material/Inventory';
import Cookies from 'js-cookie';
import { MyToggleButtonGroup } from '~/util/MyComponents';

export default function MenuProvider() {
    const [open, setOpen] = useState(false);
    const [toggle, setToggle] = React.useState('buyer');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();
    const { colors, fonts } = useContext(ThemeContext);
    const [isVerify, setIsVerify] = useState(false);
    const { authData, setAuthData } = useContext(AuthContext);
    // const { keycloak } = useKeycloak();

    const AppBar = styled(MuiAppBar, {
        shouldForwardProp: (prop) => prop !== 'open'
    })(({ theme, open }) => ({
        background: colors.secondary,
        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
        alignItems: 'space-between',
        justifyContent: 'center',
        width: `100%`,
        height: '8vh'
    }));

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
        setOpen(!open);
    };

    const menus = [
        {
            icon: <HomeOutlinedIcon />,
            label: 'Home',
            link: '/home'
        },
        {
            icon: <InventoryIcon />,
            label: 'Inventory',
            link: '/seller/inventory'
        },
        {
            icon: <PersonAddAltOutlinedIcon />,
            label: 'My Bids',
            link: '/become-buyer'
        },
        {
            icon: <CurrencyExchangeOutlinedIcon />,
            label: 'Retail Buying',
            link: '/refer-earn'
        },
        {
            icon: <CurrencyExchangeOutlinedIcon />,
            label: 'Rewards',
            link: '/refer-earn'
        },
        {
            icon: <CurrencyExchangeOutlinedIcon />,
            label: 'Scrap Rates',
            link: '/refer-earn'
        },
        {
            icon: <CurrencyExchangeOutlinedIcon />,
            label: 'FAQ',
            link: '/refer-earn'
        },
        {
            icon: <CallOutlinedIcon />,
            label: 'Contact',
            link: '/contatc'
        }
    ];
    useEffect(() => {
        if (location.pathname.includes('home/seller')) setToggle('seller');
        if (location.pathname.includes('home/buyer')) setToggle('buyer');
    }, [location.pathname]);

    function logout() {
        setAuthData(null);
        Cookies.remove('token');
        Cookies.remove('refreshToken');
        window.location.reload();
    }

    return (
        <>
            <Box sx={{ flexGrow: 0, zIndex: 3 }}>
                <AppBar position="fixed" open={open}>
                    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Stack flexDirection="row" alignItems="center" gap={1}>
                            <Hamburger duration={3} onToggle={() => setOpen(!open)} rounded toggled={open} size={25} />
                            <Typography variant="h5" noWrap component="div">
                                Scrapify
                            </Typography>
                        </Stack>
                        <MyToggleButtonGroup
                            value={toggle}
                            onChange={(event, value) => {
                                value ? setToggle(value) : setToggle(toggle);
                                navigate(value == 'seller' ? '/home/seller' : '/home/buyer');
                            }}
                            exclusive
                            aria-label="Platform"
                        >
                            <ToggleButton value="seller">Seller</ToggleButton>
                            <ToggleButton value="buyer">Buyer</ToggleButton>
                        </MyToggleButtonGroup>
                        {authData !== null ? (
                            <Profile userData={authData} logout={logout} />
                        ) : (
                            <Button
                                onClick={() => setIsVerify(true)}
                                // onClick={() => setIsLogin(true)}
                                sx={{ backgroundColor: colors.primary, color: 'white', borderRadius: '30px', padding: '5px 15px' }}
                            >
                                Login
                            </Button>
                        )}
                    </Toolbar>
                </AppBar>
            </Box>
            <Drawer
                className="drawer"
                PaperProps={{
                    sx: {
                        paddingTop: '8vh',
                        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'
                    }
                }}
                sx={{
                    zIndex: 2,
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box'
                    },
                    '& .MuiDrawer-paper::-webkit-scrollbar': {
                        width: '8px',
                        scrollPaddingRight: '10px'
                    },
                    '& .MuiDrawer-paper::-webkit-scrollbar-thumb': {
                        backgroundColor: '#999',
                        borderRadius: '4px',
                        borderRight: 'solid 3px white',
                        filter: 'blur'
                    }
                }}
                variant="temporary"
                anchor="left"
                open={open}
            >
                <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    <List component="nav" aria-label="main mailbox folders">
                        {menus?.length > 0 &&
                            menus.map((menu, index) => {
                                return (
                                    <ListItemButton
                                        component={Link}
                                        to={menu.link}
                                        key={index}
                                        selected={selectedIndex === index}
                                        onClick={(event) => handleListItemClick(event, index)}
                                    >
                                        <ListItemIcon sx={selectedIndex === index ? { color: '#1bd7a0' } : { color: '#013f56' }}>
                                            {menu?.icon}
                                        </ListItemIcon>
                                        <ListItemText
                                            sx={selectedIndex === index ? { color: '#1bd7a0' } : { color: '#013f56' }}
                                            primary={menu?.label}
                                        />
                                    </ListItemButton>
                                );
                            })}
                    </List>
                    <Divider />
                </Box>
            </Drawer>
            {isVerify ? <VerifyUser onClose={setIsVerify} /> : <></>}
        </>
    );
}
