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
import Slide from '@mui/material/Slide';
import Popover from '@mui/material/Popover';
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';
import Divider from '@mui/material/Divider';
import CloseIcon from '@mui/icons-material/Close';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function BuyerScreen() {
    const [selectedProduct, setSelectedProduct] = useState([]);
    const [productLength, setProductLength] = useState(5);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [open, setOpen] = React.useState(false);

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

    const handlePopOver = (open) => {
        setOpen(open);
    };

    return (
        <>
            <Stack flexDirection="row">
                <Box
                    sx={{
                        width: '300px !important',
                        height: '92%',
                        position: 'fixed',
                        boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
                        backgroundColor: 'white',
                        overflow: 'auto'
                        // paddingBottom: '65px'
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
                        <List>
                            {['Dinesh', 'Kishore', 'Arun', 'Ranjith'].map((e, index) => {
                                return (
                                    <>
                                        <ListItemButton
                                            key={index}
                                            selected={selectedIndex === index}
                                            onClick={(event) => {
                                                setSelectedIndex(index);
                                                setOpen(true);
                                            }}
                                            sx={{
                                                padding: 0,
                                                width: '100%',
                                                borderRight: selectedIndex === index ? 'solid 3px #013f56' : 'default'
                                            }}
                                        >
                                            <ListItemIcon>
                                                <Avatar
                                                    src="https://preview.keenthemes.com/metronic-v4/theme/assets/pages/img/avatars/team1.jpg"
                                                    variant="square"
                                                    alt="P"
                                                    sx={{ height: 50, width: 50 }}
                                                ></Avatar>
                                            </ListItemIcon>
                                            <div className="container" style={{ lineHeight: 1.5, fontSize: '12px', padding: '5px' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <div style={{ color: '#013f56', fontWeight: 'bold' }}>{e}</div>
                                                    <div style={{ color: 'grey', fontWeight: 'bold' }}>
                                                        <LocationOnIcon style={{ fontSize: '15px' }} />
                                                        20km
                                                    </div>
                                                </div>
                                                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                                    {products.slice(0, 3).map((product, index) => {
                                                        return (
                                                            <>
                                                                <Tooltip title={product?.name}>
                                                                    <div className="chip">{product?.name}</div>
                                                                </Tooltip>
                                                                &nbsp;
                                                            </>
                                                        );
                                                    })}
                                                </div>
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'center',
                                                        fontSize: '11px'
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            color: '#013f56',
                                                            fontWeight: 'bold',
                                                            display: 'flex',
                                                            alignItems: 'end'
                                                        }}
                                                    >
                                                        <StarRateRoundedIcon sx={{ color: 'orange' }} style={{ fontSize: '20px' }} />
                                                        &nbsp; 4.0
                                                    </div>
                                                    <div style={{ color: 'grey' }}>58K Reviews</div>
                                                    <div style={{ color: '#1bd7a0' }}>View Details</div>
                                                </div>
                                            </div>
                                        </ListItemButton>
                                        <Divider />
                                    </>
                                );
                            })}
                        </List>
                    </Box>
                </Box>
                <Box sx={{ height: 'auto', width: '100%', marginLeft: '300px' }}>
                    <MapComponent handlePopOver={handlePopOver} />
                </Box>
            </Stack>
            <Popover
                anchorReference="anchorPosition"
                anchorPosition={{ top: 120, left: 310 }}
                id="account-menu"
                open={open}
                onClose={() => setOpen(false)}
                // onClick={() => setOpen(false)}
                PaperProps={{
                    elevation: 0,
                    style: {
                        width: '20%', // set maximum width
                        height: '80%', // set maximum height
                        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                        borderRadius: '20px',
                        overflow: 'hidden',
                        position: 'absolute'
                    }
                }}
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <div
                    style={{
                        overflow: 'auto',
                        height: '100%',
                        width: '100%',
                        padding: '1% 5px'
                    }}
                >
                    <ListItemButton
                        key={1}
                        selected={false}
                        style={{
                            padding: '5px',
                            width: '100%',
                            borderRadius: '20px 20px 0 0'
                        }}
                    >
                        <ListItemIcon>
                            <Avatar
                                src="https://preview.keenthemes.com/metronic-v4/theme/assets/pages/img/avatars/team1.jpg"
                                variant="square"
                                alt="P"
                                sx={{ height: 50, width: 50 }}
                            ></Avatar>
                        </ListItemIcon>
                        <div className="container" style={{ padding: '5px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div style={{ color: '#013f56', fontWeight: 'bold' }}>Dinesh</div>
                                <div style={{ color: 'grey', fontWeight: 'bold' }}>
                                    <Tooltip title="close">
                                        <CloseIcon style={{ fontSize: '25px', color: '#013f56' }} onClick={() => setOpen(false)} />
                                    </Tooltip>
                                </div>
                            </div>
                            {/* <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                {products.slice(0, 3).map((product, index) => {
                                    return (
                                        <>
                                            <Tooltip title={product?.name}>
                                                <div className="chip">{product?.name}</div>
                                            </Tooltip>
                                            &nbsp;
                                        </>
                                    );
                                })}
                            </div> */}
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    fontSize: '11px'
                                }}
                            >
                                <div
                                    style={{
                                        color: '#013f56',
                                        fontWeight: 'bold',
                                        display: 'flex',
                                        alignItems: 'end'
                                    }}
                                >
                                    <StarRateRoundedIcon sx={{ color: 'orange' }} style={{ fontSize: '20px' }} />
                                    &nbsp; 4.0
                                </div>
                                <div style={{ color: 'grey' }}>58K Reviews</div>
                            </div>
                        </div>
                    </ListItemButton>
                    <Box
                        style={{
                            padding: '5px',
                            width: '100%'
                        }}
                    >
                        <Stack>
                            <Typography variant="p" fontWeight="bold" color="#013f56" component="div">
                                Scrap To Bid
                            </Typography>
                            {[...products].map((product, index) => {
                                return (
                                    <Typography key={index} variant="p" color="#013f56" component="div">
                                        {product?.name + ': 10kg'}
                                    </Typography>
                                );
                            })}
                            <br></br>
                            <button
                                onClick={() => alert('navigate to Bid')}
                                style={{
                                    width: '100%',
                                    height: 'fit-content',
                                    padding: '10px',
                                    backgroundColor: '#013f56',
                                    color: 'white',
                                    textAlign: 'center',
                                    border: 'none'
                                }}
                            >
                                Bid Now
                            </button>
                            <br></br>
                            <Divider />
                            <Typography variant="p" fontWeight="bold" color="#013f56" component="div">
                                Images
                            </Typography>
                            <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%', gap: 2 }}>
                                {products.map((p, index) => {
                                    return (
                                        <Avatar
                                            key={index}
                                            alt="waste"
                                            src="https://images.unsplash.com/photo-1562077981-4d7eafd44932?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d2FzdGV8ZW58MHx8MHx8&w=1000&q=80"
                                            variant="square"
                                            sx={{ height: 75, width: '24%' }}
                                        />
                                    );
                                })}
                            </div>
                        </Stack>
                    </Box>
                </div>
            </Popover>
        </>
    );
}

export default BuyerScreen;
// GoogleApiWrapper({
//     apiKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY'
//   })(BuyerScreen);
