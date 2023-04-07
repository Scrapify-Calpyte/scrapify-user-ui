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
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import ListIcon from '@mui/icons-material/List';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Card, CardContent, Grid } from '@mui/material';
import { Stack } from '../../../../node_modules/@mui/material/index';
import Paper from '@mui/material/Paper';
import img from '../../../assets/images/product.png';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import Divider from '@mui/material/Divider';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import './menu.css';

const drawerWidth = 300;

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: '0 2px 2px 30px',
    marginTop: '65px',
    height: '70px',
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'space-between'
}));

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

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#f7f7f7',
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    boxShadow: 'none',
    '&:hover': {
        // transform: 'skew(15deg,10deg)'
        // border: 'solid 1px #1bd7a0',
        // borderRadius: '5px'
    }
}));

export default function MenuProvider({ handleDrawer }) {
    const [open, setOpen] = useState(true);
    const [menus, setMenus] = useState([]);
    const [toggle, setToggle] = React.useState('web');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [selectedProduct, setSelectedProduct] = useState([]);

    const products = ['Bottles', 'Cartons', 'Metals', 'Magazines', 'Books', 'e-waste', 'Glasses'];

    const handleDrawerToggle = () => {
        setOpen(!open);
        handleDrawer();
    };

    useEffect(() => {
        setToggle('buyer');
    }, []);

    const handleSelectedProduct = (index) => {
        setSelectedProduct((oldArray) => {
            if (oldArray.includes(index)) {
                return [...oldArray.filter((e) => e != index)];
            } else {
                return [...oldArray, index];
            }
        });
    };

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
                                <ListIcon fontSize="large" />
                            </IconButton>
                            <Typography variant="h5" noWrap component="div">
                                Scrapify
                            </Typography>
                        </Stack>
                        <MyToggleButtonGroup
                            value={toggle}
                            onChange={(event, value) => {
                                value ? setToggle(value) : setToggle(toggle);
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
                        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                        // paddingTop: '65px'
                        top: '65px',
                        height: window.innerHeight - 65
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
                variant="persistent"
                anchor="left"
                open={true}
            >
                <Box sx={{ flexGrow: 0 }}>
                    <List dense={true}>
                        <ListItem
                            secondaryAction={
                                <Tooltip title="Locate me">
                                    <IconButton edge="end" onClick={() => alert('Locate me hitted')}>
                                        <GpsFixedIcon style={{ color: '#1bd7a0' }} />
                                    </IconButton>
                                </Tooltip>
                            }
                        >
                            <ListItemAvatar>
                                <Avatar>
                                    <LocationOnIcon style={{ color: '#013f56' }} />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={<Typography style={{ color: '#013f56', fontWeight: 'bold' }}>Location Name</Typography>}
                                secondary={<Typography style={{ color: '#1bd7a0', fontSize: '12px' }}>Change Location</Typography>}
                            />
                        </ListItem>
                    </List>
                </Box>
                <Box sx={{ flexGrow: 0, backgroundColor: '#f7f7f7', padding: '1%' }}>
                    <Grid container spacing={1}>
                        {products.map((e, index) => {
                            return (
                                <Grid item xs={4} key={index}>
                                    <Item key={index}>
                                        <IconButton
                                            onClick={() => handleSelectedProduct(index)}
                                            aria-haspopup="true"
                                            sx={
                                                selectedProduct.includes(index)
                                                    ? { backgroundColor: '#A3E4D7' }
                                                    : { backgroundColor: 'none' }
                                            }
                                        >
                                            <Avatar alt="img" src={img} sx={{ width: '60px', height: '60px' }} />
                                        </IconButton>
                                        {e}
                                    </Item>
                                </Grid>
                            );
                        })}
                    </Grid>
                </Box>
                <Box sx={{ flexGrow: 0, bgcolor: 'background.paper' }}>
                    <Stack flexDirection="row" justifyContent="space-between" padding="5%">
                        <Typography style={{ color: '#013f56', fontWeight: 'bold' }}>Buyers Near By</Typography>
                        <Typography style={{ color: '#013f56', fontWeight: 'bold' }}>View All</Typography>
                    </Stack>
                    <List component="nav" aria-label="main mailbox folders">
                        {['list one', 'List two', 'list one'].map((e, index) => {
                            return (
                                <>
                                    <ListItemButton key={index} selected={selectedIndex === index} onClick={() => setSelectedIndex(index)}>
                                        <ListItemIcon>
                                            <Avatar variant="square">
                                                <PersonAdd />
                                            </Avatar>
                                        </ListItemIcon>

                                        <ListItemText
                                            primary={
                                                <>
                                                    <Stack direction="row" spacing={1}>
                                                        <Stack spacing={1}>
                                                            <Typography style={{ color: '#013f56', fontWeight: 'bold', fontSize: 'small' }}>
                                                                {e}
                                                            </Typography>
                                                            <Stack direction="row" spacing={1}>
                                                                <Tooltip title={e}>
                                                                    <div className="chip"> {e}</div>
                                                                </Tooltip>
                                                                <Tooltip title={e}>
                                                                    <div className="chip"> {e}</div>
                                                                </Tooltip>
                                                            </Stack>
                                                        </Stack>
                                                    </Stack>
                                                </>
                                            }
                                            // secondary={e}
                                        />
                                        <ListItemText
                                            sx={{ textAlign: 'right', alignItems: 'center' }}
                                            primary="3 km"
                                            secondary="300 kg processed"
                                        />
                                    </ListItemButton>
                                </>
                            );
                        })}
                    </List>
                </Box>
                {/* <SwipeableDrawer anchor={true} open={true}></SwipeableDrawer> */}
            </Drawer>
        </>
    );
}
