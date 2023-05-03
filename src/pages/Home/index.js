import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
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
import { useState, useEffect, useContext } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';
import Divider from '@mui/material/Divider';
import Popup from './Popup';
import ProductList from './ProductList';
import MapComponent from './MapComponent';
import useMediaQuery from '@mui/material/useMediaQuery';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import './home.css';
import { animations } from 'react-animation';
import { useParams } from 'react-router-dom';
import { AuthContext } from '~/context/AuthProvider/index';
import { useAxios } from '~/components/useAxios';
import { ApiConfig } from '~/components/ApiConfig';
import { toast } from 'react-toastify';

function Home() {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [open, setOpen] = useState(false);
    const matches = useMediaQuery('(max-width:768px)');
    const [sideNav, setSideNav] = useState(true);
    const [viewAll, setViewAll] = useState(false);
    const { type } = useParams();
    const { authData, setAuthData } = useContext(AuthContext);
    const [categories, setCategories] = useState([]);
    const axios = useAxios();
    const [location, setLocation] = useState(null);
    const [consumersData, setConsumersData] = useState([]);

    function loadMapData(coordinatesArr) {
        axios
            .get(ApiConfig.getInventoriesByCoordinates(coordinatesArr[0], coordinatesArr[1]))
            .then((res) => {
                let result = res?.data;
                setConsumersData(result);
            })
            .catch((err) => console.error(err));
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
                loadMapData([position.coords.latitude, position.coords.longitude]);
            },
            (error) => {
                toast.error(error.message);
                setLocation({
                    lat: 13.0827,
                    lng: 80.2707
                });
                loadMapData([13.0827, 80.2707]);
            }
        );
        getProducts();
        if (matches) setSideNav(false);
    }, [matches, type, authData]);

    function getProducts() {
        axios
            .get(ApiConfig.getAllCategories)
            .then((res) => {
                if (res?.data && res?.data?.length > 0) {
                    setCategories(res?.data.filter((obj) => obj?.id != null));
                }
            })
            .catch((err) => console.error(err));
    }

    const handlePopOver = (open) => {
        setOpen(open);
    };

    function setProduct(product) {
        // alert(product);
    }

    return (
        <>
            <Stack flexDirection="row">
                <div style={{ display: matches ? 'block' : 'none', position: 'absolute', zIndex: 2, top: '16vh', left: 10 }}>
                    <button className="btn1" size="large" onClick={() => setSideNav(true)}>
                        <span>Filter</span>
                        <FilterListIcon />
                    </button>
                </div>
                <Box
                    // style={matches ? { animation: animations.fadeInUp } : {}}
                    sx={{
                        width: matches && sideNav ? '100%' : '300px',
                        height: '92vh',
                        position: 'absolute',
                        boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
                        backgroundColor: 'white',
                        overflow: 'auto',
                        opacity: matches && !sideNav ? 0 : 1,
                        zIndex: matches && !sideNav ? -1 : 2,
                        transition: 'width 300ms ease-in-out'
                    }}
                >
                    <Box
                        sx={{
                            flexGrow: 1,
                            backgroundColor: 'white',
                            display: !viewAll ? 'block' : 'none'
                        }}
                    >
                        <List dense={true}>
                            <ListItem
                                secondaryAction={
                                    <Stack flexDirection="row" gap={2}>
                                        <Tooltip title="Locate me" arrow>
                                            <IconButton edge="end" onClick={() => alert('Locate me hitted')}>
                                                <GpsFixedIcon style={{ color: '#1bd7a0' }} />
                                            </IconButton>
                                        </Tooltip>
                                        <div
                                            style={{
                                                flexDirection: 'row',
                                                justifyContent: 'flex-end',
                                                display: !matches ? 'none' : 'flex',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <Tooltip title="Close" arrow>
                                                <IconButton onClick={() => setSideNav(false)}>
                                                    <CloseIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </div>
                                    </Stack>
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
                    <Box sx={{ display: !viewAll ? 'block' : 'none' }}>
                        <ProductList products={categories} setProduct={setProduct} />
                    </Box>
                    {/* <AnimateOnChange animationIn="fadeInUp" animationOut="fadeOut" durationOut={300}> */}
                    <Stack flexDirection="row" justifyContent="space-between" alignItems="center" padding="10px">
                        <Typography component="div" variant="p" color="#013f56" fontWeight="bold">
                            Sellers Near By
                        </Typography>
                        <Button onClick={() => setViewAll(!viewAll)}> {!viewAll ? 'View All' : 'Show Less'} </Button>
                    </Stack>
                    <Box sx={{ flexGrow: 0 }}>
                        <List>
                            {consumersData.map((data, index) => {
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
                                                style={{
                                                    lineHeight: 1.5,
                                                    fontSize: '12px',
                                                    padding: '5px',
                                                    alignItems: 'space-between'
                                                }}
                                            >
                                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <div style={{ color: '#013f56', fontWeight: 'bold' }}>
                                                        {data?.seller?.firstName + data?.seller?.lastName}
                                                    </div>
                                                    <div style={{ color: 'grey', fontWeight: 'bold' }}>
                                                        <LocationOnIcon style={{ fontSize: '15px' }} />{' '}
                                                    </div>
                                                </div>
                                                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                                    {data?.stock?.slice(0, 3).map((product, index) => {
                                                        return (
                                                            <Tooltip key={index} title={product?.name} arrow>
                                                                <div style={{ marginRight: '2px' }} className="chip">
                                                                    {product?.name}
                                                                </div>
                                                            </Tooltip>
                                                        );
                                                    })}
                                                    {data?.stock.length > 3 ? (
                                                        <Tooltip title={data?.stock.length - 3 + 'more'} arrow>
                                                            <div className="chip">{'+ ' + (data?.stock.length - 3) + 'more'}</div>
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
                <Box
                    sx={{
                        height: 'auto',
                        width: '100%',
                        zIndex: 1,
                        marginLeft: matches && !sideNav ? 0 : '300px',
                        animation: animations.popIn
                    }}
                >
                    <MapComponent location={location} consumersData={consumersData} handlePopOver={handlePopOver} />
                </Box>
            </Stack>
            <Popup open={open} setOpen={setOpen} consumerData={consumersData[selectedIndex]} />
        </>
    );
}

export default Home;
