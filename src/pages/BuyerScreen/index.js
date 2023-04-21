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
import { useState, useEffect } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Slide from '@mui/material/Slide';
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';
import Divider from '@mui/material/Divider';
import Popup from './Popup';
import ProductList from './ProductList';
import MapComponent from './MapComponent';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function BuyerScreen() {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [open, setOpen] = React.useState(false);
    const [screenSize, setScreenSize] = useState(getCurrentDimension());
    const sampleData = {
        availableProducts: [
            {
                id: 'asd',
                name: 'Bottles',
                icon: ''
            },
            {
                id: 'asd',
                name: 'Glasses',
                icon: ''
            }
        ],
        allProducts: [
            {
                id: 'asd',
                name: 'Plastic',
                icon: ''
            },
            {
                id: 'asd',
                name: 'E-waste',
                icon: ''
            }
        ],
        inventories: [
            {
                id: '001',
                latitude: 13.0403,
                longitude: 80.1723,
                seller: {
                    id: '001',
                    name: 'Dinesh',
                    rating: 5,
                    distance: '5 KM',
                    image: '',
                    products: [
                        {
                            id: '001',
                            name: 'Bottles',
                            weight: '',
                            price: ''
                        }
                    ]
                }
            },
            {
                id: '002',
                latitude: 13.0827,
                longitude: 80.2707,
                seller: {
                    id: '001',
                    name: 'Kumar',
                    rating: 2,
                    distance: '3 KM',
                    image: '',
                    products: [
                        {
                            id: '002',
                            name: 'Glasses',
                            weight: '',
                            price: ''
                        },
                        {
                            id: '002',
                            name: 'Bottles',
                            weight: '',
                            price: ''
                        }
                    ]
                }
            }
        ]
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

    useEffect(() => {
        const updateDimension = () => {
            setScreenSize(getCurrentDimension());
        };
        window.addEventListener('resize', updateDimension);

        return () => {
            window.removeEventListener('resize', updateDimension);
        };
    }, [screenSize]);

    const handlePopOver = (id) => {
        setOpen(!open);
    };

    function getCurrentDimension() {
        return {
            width: window.innerWidth,
            height: window.innerHeight
        };
    }

    function setProduct(product) {
        alert(product);
    }

    return (
        <>
            <Stack flexDirection="row">
                <Box
                    sx={{
                        width: '300px !important',
                        height: screenSize.height - 65,
                        position: 'fixed',
                        boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
                        backgroundColor: 'white',
                        overflow: 'auto',
                        zIndex: 1
                        // display: 'block'
                    }}
                >
                    <Box sx={{ flexGrow: 1, backgroundColor: 'white' }}>
                        <List dense={true}>
                            <ListItem
                                secondaryAction={
                                    <Tooltip title="Locate me" arrow>
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
                    <ProductList products={[...sampleData?.availableProducts, ...sampleData?.allProducts]} setProduct={setProduct} />
                    <Box sx={{ flexGrow: 0, bgcolor: 'background.paper' }}>
                        <Stack flexDirection="row" justifyContent="space-between" padding="2px">
                            <Typography component="div" variant="p" color="#013f56" fontWeight="bold">
                                Sellers Near By
                            </Typography>
                            <Typography component="div" variant="p" color="#013f56" fontWeight="bold">
                                View All
                            </Typography>
                        </Stack>
                        <List>
                            {sampleData?.inventories.map((data, index) => {
                                return (
                                    <div key={index}>
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
                                                    src={data?.seller?.image}
                                                    variant="square"
                                                    alt="P"
                                                    sx={{ height: 50, width: 50 }}
                                                ></Avatar>
                                            </ListItemIcon>
                                            <div
                                                className="container"
                                                style={{ lineHeight: 1.5, fontSize: '12px', padding: '5px', alignItems: 'space-between' }}
                                            >
                                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <div style={{ color: '#013f56', fontWeight: 'bold' }}>{data?.seller?.name}</div>
                                                    <div style={{ color: 'grey', fontWeight: 'bold' }}>
                                                        <LocationOnIcon style={{ fontSize: '15px' }} />
                                                        {data?.seller?.distance}
                                                    </div>
                                                </div>
                                                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                                    {data?.seller?.products.slice(0, 3).map((product, index) => {
                                                        return (
                                                            <Tooltip key={index} title={product?.name} arrow>
                                                                <div style={{ marginRight: '2px' }} className="chip">
                                                                    {product?.name}
                                                                </div>
                                                            </Tooltip>
                                                        );
                                                    })}
                                                    {data?.seller?.products.length > 3 ? (
                                                        <Tooltip title={products.length - 3 + 'more'} arrow>
                                                            <div className="chip">{'+ ' + (products.length - 3) + 'more'}</div>
                                                        </Tooltip>
                                                    ) : (
                                                        <></>
                                                    )}
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
                                                        &nbsp; {data?.seller?.rating}
                                                    </div>
                                                    {/* <div style={{ color: 'grey' }}>20K Reviews</div> */}
                                                    <div style={{ color: '#1bd7a0' }}>View Details</div>
                                                </div>
                                            </div>
                                        </ListItemButton>
                                        <Divider />
                                    </div>
                                );
                            })}
                        </List>
                    </Box>
                </Box>
                <Box sx={{ height: 'auto', width: '100%' }}>
                    <MapComponent data={sampleData?.inventories} handlePopOver={handlePopOver} />
                </Box>
            </Stack>
            <Popup open={open} setOpen={setOpen} data={products} />
        </>
    );
}

export default BuyerScreen;
