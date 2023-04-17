/* eslint-disable prettier/prettier */
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
import { Map ,GoogleApiWrapper } from 'google-maps-react';
import MapContainer from './MapContainer';
import { styled, useTheme } from '@mui/material/styles';


function BuyerScreen() {
    const [selectedProduct, setSelectedProduct] = useState([]);
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
             <Box sx={{width : '300px !important' ,height : window.innerHeight - 65 ,position : 'relative' , boxShadow :'rgba(149, 157, 165, 0.2) 0px 8px 24px' ,  backgroundColor: 'white'}}>
                <Box sx={{ flexGrow: 1 , backgroundColor: 'white'}}>
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
                <Box sx={{ flexGrow: 1, backgroundColor: '#f7f7f7', padding: '1%' }}>
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
             </Box>
          <MapContainer/>
         </Stack>
    </>
        
        
    );
}


export default BuyerScreen;
// GoogleApiWrapper({
//     apiKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY'
//   })(BuyerScreen);