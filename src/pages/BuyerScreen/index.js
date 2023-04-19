import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import * as React from 'react';
import Tooltip from '@mui/material/Tooltip';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import img from '/src/assets/images/product.png';
import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import MapComponent from './MapComponent';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Slide from '@mui/material/Slide';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function BuyerScreen() {
    const [selectedProduct, setSelectedProduct] = useState([]);
    const [productLength, setProductLength] = useState(5);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [dialog, setDialog] = useState(false);
    const drawerWidth = 300;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const products = [
        {
            id: 0,
            name: 'Bottles'
        },
        {
            id: 1,
            name: 'Cartons'
        },
        {
            id: 2,
            name: 'Metals'
        },
        {
            id: 3,
            name: 'Magazines'
        },
        {
            id: 4,
            name: 'e-waste'
        },
        {
            id: 5,
            name: 'Glasses'
        },
        {
            id: 6,
            name: 'Books'
        }
    ];

    useEffect(() => {}, []);

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: '#f7f7f7',
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        boxShadow: 'none'
    }));

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
            <Stack flexDirection="row">
                <Box
                    sx={{
                        width: '300px !important',
                        height: '100%',
                        position: 'fixed',
                        boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
                        backgroundColor: 'white',
                        overflow: 'auto',
                        paddingBottom: '65px'
                    }}
                >
                    <Box sx={{ flexGrow: 1, backgroundColor: 'white' }}>
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
                                    primary={<Typography style={{ color: '#013f56', fontWeight: 'bold' }}>Chennai</Typography>}
                                    secondary={<Typography style={{ color: '#1bd7a0', fontSize: '12px' }}>Change Location</Typography>}
                                />
                            </ListItem>
                        </List>
                    </Box>
                    <Box sx={{ flexGrow: 1, backgroundColor: '#f7f7f7', padding: '0' }}>
                        <Grid container spacing={1}>
                            {products.slice(0, productLength).map((e, index) => {
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
                                            {e?.name}
                                        </Item>
                                    </Grid>
                                );
                            })}
                            {products.length > 5 ? (
                                <Grid item xs={4}>
                                    <Item>
                                        <IconButton
                                            onClick={() => {
                                                setProductLength(productLength == 5 ? products?.length : 5);
                                            }}
                                            aria-haspopup="true"
                                        >
                                            <Avatar
                                                sx={{
                                                    width: '60px',
                                                    height: '60px',
                                                    bgcolor: 'white'
                                                }}
                                            >
                                                {productLength == 5 ? (
                                                    <p style={{ color: '#013f56' }}>
                                                        {'+ ' + (products.length >= 5 ? products.length - 5 : 0)}
                                                    </p>
                                                ) : (
                                                    <p style={{ fontSize: '10px', fontWeight: 'bold', color: '#013f56' }}>o o o</p>
                                                )}
                                            </Avatar>
                                        </IconButton>
                                        {productLength == 5 ? 'More' : 'Less'}
                                    </Item>
                                </Grid>
                            ) : (
                                <></>
                            )}
                        </Grid>
                    </Box>
                    <Box sx={{ flexGrow: 0, bgcolor: 'background.paper' }}>
                        <Stack flexDirection="row" justifyContent="space-between" padding="5%">
                            <Typography style={{ color: '#013f56', fontWeight: 'bold' }}>Sellers Near By</Typography>
                            <Typography style={{ color: '#013f56', fontWeight: 'bold' }}>View All</Typography>
                        </Stack>
                        <List component="nav" aria-label="main mailbox folders">
                            {['Dinesh', 'Kishore', 'Arun', 'Ranjith'].map((e, index) => {
                                return (
                                    <ListItemButton
                                        key={index}
                                        selected={selectedIndex === index}
                                        onClick={(event) => {
                                            setSelectedIndex(index);
                                            handleClick(event);
                                            // setDialog(true);
                                        }}
                                    >
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
                                                                    <div className="chip">Bottles</div>
                                                                </Tooltip>
                                                            </Stack>
                                                        </Stack>
                                                    </Stack>
                                                </>
                                            }
                                        />
                                        <ListItemText
                                            sx={{ textAlign: 'right', alignItems: 'center' }}
                                            primary="10 km"
                                            secondary={(Math.random() * 100).toFixed(2) + ' kg processed'}
                                        />
                                    </ListItemButton>
                                );
                            })}
                        </List>
                    </Box>
                </Box>
                <Box sx={{ height: 'auto', width: '100%', marginLeft: '300px' }}>
                    <MapComponent />
                </Box>
            </Stack>
            <Menu
                // anchorEl={anchorEl}
                anchorReference="anchorPosition"
                anchorPosition={{ top: 120, left: 310 }}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 1,
                    style: {
                        width: '20%', // set maximum width
                        height: '80%', // set maximum height
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))'
                    }
                    // sx: {
                    //     overflow: 'visible',
                    //     filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    //     mt: 1.5,
                    //     '& .MuiAvatar-root': {
                    //         // maxWidth: 250,
                    //         // minHeight: 320,
                    //         ml: -0.5,
                    //         mr: 1
                    //     },
                    //     '&:before': {
                    //         content: '""',
                    //         display: 'block',
                    //         position: 'absolute',
                    //         top: 30,
                    //         left: 0,
                    //         width: 15,
                    //         height: 15,
                    //         bgcolor: 'background.paper',
                    //         transform: 'translateY(-50%) rotate(45deg)',
                    //         zIndex: 0
                    //     }
                    // }
                }}
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                {/* <MenuItem onClick={handleClose}> */}
                PRofile
                <p>sdfsdffdgs</p>
                <br></br>
                <p>sdfsdffdgs</p>
                <br></br>
                <p>sdfsdffdgs</p>
                <br></br>
                <p>sdfsdffdgs</p>
                <br></br>
                <p>sdfsdffdgs</p>
                <br></br>
                <p>sdfsdffdgs</p>
                <br></br>
                <p>sdfsdffdgs</p>
                <p>sdfsdffdgs</p>
                <br></br>
                <p>sdfsdffdgs</p>
                <br></br>
                <p>sdfsdffdgs</p>
                <p>sdfsdffdgs</p>
                PRofile
                <p>sdfsdffdgs</p>
                <p>sdfsdffdgs</p>
                <p>sdfsdffdgs</p>
                <p>sdfsdffdgs</p>
                <p>sdfsdffdgs</p>
                <p>sdfsdffdgs</p>
                <br></br>
                <p>sdfsdffdgs</p>
                <p>sdfsdffdgs</p>
                <p>sdfsdffdgs</p>
                <p>sdfsdffdgs</p>
                <br></br>
                <p>sdfsdffdgs</p>
                <br></br>
                <p>sdfsdffdgs</p>
                <p>sdfsdffdgs</p>
                {/* </MenuItem> */}
            </Menu>
            {/* <Dialog
                PaperProps={
                    {
                        // sx: {
                        // }
                    }
                }
                fullWidth
                maxWidth="xs"
                scroll="paper"
                TransitionComponent={Transition}
                open={dialog}
                onClose={() => setDialog(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    <Stack flexDirection="row" justifyContent="space-between" alignItems="center">
                        <p>Seller Details</p>
                    </Stack>
                </DialogTitle>
                <DialogContent className="row col-12">
                    <p>Content</p>
                </DialogContent>
                <DialogActions>
                    <Button type="submit">Ok</Button>
                    <Button onClick={() => setDialog(false)}>Cancel</Button>
                </DialogActions>
            </Dialog> */}
        </>
    );
}

export default BuyerScreen;
// GoogleApiWrapper({
//     apiKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY'
//   })(BuyerScreen);
