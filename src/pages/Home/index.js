import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useState, useEffect, useContext } from 'react';
import Popup from './Popup';
import ProductList from './ProductList';
import MapComponent from './MapComponent';
import useMediaQuery from '@mui/material/useMediaQuery';
import FilterListIcon from '@mui/icons-material/FilterList';
import Button from '@mui/material/Button';
import './home.css';
import { animations } from 'react-animation';
import { useParams } from 'react-router-dom';
import { AuthContext } from '~/context/AuthProvider/index';
import { useAxios } from '~/components/useAxios';
import { ApiConfig } from '~/components/ApiConfig';
import { toast } from 'react-toastify';
import BuyerBids from '../BuyerScreen/BuyerBids';
import { ThemeButton } from '~/util/MyComponents';
import BidByCategory from './BidByCategory';
import SellersList from './SellersList';
import LocateMe from './LocateMe';
import { useTheme } from '@mui/material/styles';

function Home() {
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [open, setOpen] = useState(false);
    const matches = useMediaQuery('(max-width:768px)');
    const [sideNav, setSideNav] = useState(false);
    const [viewAll, setViewAll] = useState(false);
    const { type } = useParams();
    const { authData, setAuthData } = useContext(AuthContext);
    //for product list component
    const [categories, setCategories] = useState([]);
    //server calls
    const axios = useAxios();
    //for location component
    const [location, setLocation] = useState(null);
    const [consumersData, setConsumersData] = useState([]);
    const [isBid, setIsBid] = useState(false);
    const [selectedConsumerData, setSelectedConsumerData] = useState(null);
    const [isByCategory, setIsByCategory] = useState(false);
    const { palette } = useTheme();

    function loadMapData(coordinatesArr) {
        axios
            .get(ApiConfig.getInventoriesByCoordinates(coordinatesArr[0], coordinatesArr[1]))
            .then((res) => {
                let result = res?.data;
                setConsumersData(result);
            })
            .catch((err) => console.error(err));
    }

    function getCurrentLocation() {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
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
    }

    useEffect(() => {
        getCurrentLocation();
        getProducts();
    }, [type, authData]);

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

    function setProduct(product) {
        // alert(product);
    }

    function placeBid(isBid, data) {
        setSelectedConsumerData(data);
        setIsBid(isBid);
    }

    const sideBarStyle = {
        width: matches && sideNav ? '100%' : '250px',
        height: '92vh',
        position: 'absolute',
        boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
        backgroundColor: palette.light.main,
        overflow: 'auto',
        justifyContent: 'start',
        opacity: matches && !sideNav ? 0 : 1,
        zIndex: matches && !sideNav ? -1 : 2,
        transition: 'width 300ms ease-in-out'
    };

    const mapStyle = {
        height: 'auto',
        width: '100%',
        zIndex: 1,
        marginLeft: matches && !sideNav ? 0 : '250px',
        animation: animations.popIn
    };

    return (
        <>
            <Stack flexDirection="row">
                {matches && (
                    <ThemeButton
                        sx={{ position: 'absolute', zIndex: 2, top: '17vh', left: 10, padding: '5px 20px', animation: animations.popIn }}
                        size="large"
                        onClick={() => setSideNav(true)}
                    >
                        Filter
                        <FilterListIcon />
                    </ThemeButton>
                )}

                <Stack sx={sideBarStyle}>
                    {!isByCategory && (
                        <div style={{ display: !viewAll ? 'block' : 'none' }}>
                            <Box>
                                <LocateMe setSideNav={setSideNav} />
                            </Box>
                            <Box sx={{ textAlign: 'center' }}>
                                <ProductList products={categories} setProduct={setProduct} />
                                <br></br>
                                <ThemeButton sx={{ width: '90%' }} onClick={() => setIsByCategory(true)}>
                                    Bid by Category
                                </ThemeButton>
                            </Box>
                        </div>
                    )}
                    {isByCategory && !viewAll && <BidByCategory setIsByCategory={setIsByCategory} categories={categories} />}
                    <Stack flexDirection="row" justifyContent="space-between" alignItems="center" padding="10px">
                        <Typography component="div" variant="heading6" color="secondary" fontWeight="bold">
                            Sellers Near By
                        </Typography>
                    </Stack>
                    <SellersList
                        consumersData={consumersData}
                        selectedIndex={selectedIndex}
                        setSelectedIndex={setSelectedIndex}
                        setOpen={setOpen}
                    ></SellersList>
                </Stack>
                <Box sx={mapStyle}>
                    <MapComponent location={location} consumersData={consumersData} placeBid={placeBid} />
                </Box>
            </Stack>
            <Popup
                open={open}
                setOpen={setOpen}
                consumerData={consumersData?.length > 0 ? consumersData[selectedIndex] : null}
                placeBid={placeBid}
            />
            {isBid && <BuyerBids open={isBid} setOpen={setIsBid} consumerData={selectedConsumerData ? selectedConsumerData : null} />}
        </>
    );
}

export default Home;
