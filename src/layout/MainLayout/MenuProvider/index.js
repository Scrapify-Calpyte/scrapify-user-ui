import * as React from 'react';
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { useEffect } from 'react';
import ListIcon from '@mui/icons-material/List';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Stack } from '../../../../node_modules/@mui/material/index';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import './menu.css';
import CloseIcon from '@mui/icons-material/Close';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 300;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
    background: '#1bd7a0',
    boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
    width: `100%`
}));

const MyToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#f7f7f7',
    border: '1px solid #ccc',
    borderRadius: '30px',
    overflow: 'hidden',
    padding: '1px',
    '.MuiToggleButton-root': {
        color: '#333',
        border: 'none',
        backgroundColor: 'transparent',
        borderRadius: '30px !important',
        padding: '8px 20px',
        '&.Mui-selected': {
            backgroundColor: '#013f56',
            transition: 'background-color 500ms',
            color: '#fff'
        },
        '&.Mui-selected:hover': {
            backgroundColor: '#013f56'
        }
    }
}));

export default function MenuProvider({ handleDrawer }) {
    const [open, setOpen] = useState(false);
    const [toggle, setToggle] = React.useState('buyer');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const navigate = useNavigate();

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
        setOpen(!open);
    };

    const handleDrawerToggle = () => {
        setOpen(!open);
        handleDrawer();
    };

    const menus = [
        {
            icon: <HomeOutlinedIcon />,
            label: 'Home',
            link: '/home'
        },
        {
            icon: <CallOutlinedIcon />,
            label: 'Scrap Rates',
            link: '/scrap-rates'
        },
        {
            icon: <PersonAddAltOutlinedIcon />,
            label: 'Become A Buyer',
            link: '/become-buyer'
        },
        {
            icon: <CurrencyExchangeOutlinedIcon />,
            label: 'Refer & Earn',
            link: '/refer-earn'
        },
        {
            icon: <CallOutlinedIcon />,
            label: 'Contact',
            link: '/contatc'
        }
    ];
    useEffect(() => {
        setToggle('buyer');
    }, []);

    return (
        <>
            <Box sx={{ flexGrow: 0, zIndex: 1 }}>
                <AppBar position="fixed" open={open}>
                    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Stack flexDirection="row" alignItems="center">
                            <IconButton
                                size="small"
                                color="inherit"
                                aria-label="open drawer"
                                onClick={handleDrawerToggle}
                                edge="start"
                                sx={{ mr: 2 }}
                            >
                                {open ? (
                                    <CloseIcon fontSize="large" sx={{ transform: 'rotate(90deg) 2s' }} />
                                ) : (
                                    <ListIcon fontSize="large" sx={{ transform: 'rotate(90deg) 2s' }} />
                                )}
                            </IconButton>
                            <Typography variant="h5" noWrap component="div">
                                Scrapify
                            </Typography>
                        </Stack>
                        <MyToggleButtonGroup
                            value={toggle}
                            onChange={(event, value) => {
                                value ? setToggle(value) : setToggle(toggle);
                                navigate(value == 'seller' ? '/seller' : '/buyer');
                            }}
                            exclusive
                            aria-label="Platform"
                        >
                            <ToggleButton value="buyer">Buyer</ToggleButton>
                            <ToggleButton value="seller">Seller</ToggleButton>
                        </MyToggleButtonGroup>
                        <Button sx={{ backgroundColor: '#013f56', color: 'white', borderRadius: '30px', padding: '5px 15px' }}>
                            Login
                        </Button>
                        {/* <Tooltip title="Account settings">
                            <IconButton size="large" sx={{ ml: 2 }} aria-haspopup="true">
                                <Avatar
                                    alt="Remy Sharp"
                                    src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8&w=1000&q=80"
                                />
                            </IconButton>
                        </Tooltip> */}
                    </Toolbar>
                </AppBar>
            </Box>
            <Drawer
                className="drawer"
                PaperProps={{
                    sx: {
                        paddingTop: '65px',
                        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'
                    }
                }}
                sx={{
                    zIndex: 0,
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
                        {menus.map((menu, index) => {
                            return (
                                <ListItemButton
                                    key={index}
                                    selected={selectedIndex === index}
                                    onClick={(event) => handleListItemClick(event, index)}
                                >
                                    <ListItemIcon>{menu?.icon}</ListItemIcon>
                                    <ListItemText primary={menu?.label} />
                                </ListItemButton>
                            );
                        })}
                    </List>
                    <Divider />
                </Box>
            </Drawer>
        </>
    );
}
