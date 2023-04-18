import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
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
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import MapComponent from './MapComponent';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import PersonAdd from '@mui/icons-material/PersonAdd';

function BuyerScreen() {
    const [selectedProduct, setSelectedProduct] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const drawerWidth = 300;

    const products = ['Bottles', 'Cartons', 'Metals', 'Magazines', 'Books', 'e-waste', 'Glasses'];

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
                                    primary={<Typography style={{ color: '#013f56', fontWeight: 'bold' }}>Location Name</Typography>}
                                    secondary={<Typography style={{ color: '#1bd7a0', fontSize: '12px' }}>Change Location</Typography>}
                                />
                            </ListItem>
                        </List>
                    </Box>
                    <Box sx={{ flexGrow: 1, backgroundColor: '#f7f7f7', padding: '0' }}>
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
                            {['list one', 'List two', 'list one', 'list four'].map((e, index) => {
                                return (
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
                                        />
                                        <ListItemText
                                            sx={{ textAlign: 'right', alignItems: 'center' }}
                                            primary="3 km"
                                            secondary="300 kg processed"
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
        </>
    );
}

export default BuyerScreen;
// GoogleApiWrapper({
//     apiKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY'
//   })(BuyerScreen);
