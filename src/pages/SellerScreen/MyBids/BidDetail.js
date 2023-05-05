import {
    Avatar,
    Divider,
    FormHelperText,
    Grid,
    InputAdornment,
    Stack,
    TextField,
    Typography,
    Button,
    Box,
    useMediaQuery
} from '@mui/material/index';
import { useContext } from 'react';
import { ThemeContext } from '~/util/ThemeProvider';
import StarIcon from '@mui/icons-material/Star';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import CurrencyRupeeOutlinedIcon from '@mui/icons-material/CurrencyRupeeOutlined';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { ThemeButton, ThemeButton2 } from '~/util/MyComponents';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import PropTypes from 'prop-types';
import { animations } from 'react-animation';
import { useEffect } from 'react';
import { animateScroll as scroll } from 'react-scroll';

function BidDetail({ setIsDetail }) {
    const { colors, fonts } = useContext(ThemeContext);
    const matches = useMediaQuery('(max-width:768px)');

    useEffect(() => {
        // scroll.scrollToTop({ duration: 500, smooth: true });
    }, []);

    const products = [
        {
            id: 0,
            name: 'Bootle',
            reqQty: '200kg',
            expAmt: '200',
            marketPrice: '309',
            bidPrice: '23',
            totalAmt: '348'
        },
        {
            id: 1,
            name: 'plastic',
            weight: '300kg'
        },
        {
            id: 2,
            name: 'wood',
            weight: '300kg'
        },
        {
            id: 0,
            name: 'Bootle',
            reqQty: '200kg',
            expAmt: '200',
            marketPrice: '309',
            bidPrice: '23',
            totalAmt: '348'
        },
        {
            id: 1,
            name: 'plastic',
            weight: '300kg'
        },
        {
            id: 2,
            name: 'wood',
            weight: '300kg'
        },
        {
            id: 0,
            name: 'Bootle',
            reqQty: '200kg',
            expAmt: '200',
            marketPrice: '309',
            bidPrice: '23',
            totalAmt: '348'
        },
        {
            id: 1,
            name: 'plastic',
            weight: '300kg'
        },
        {
            id: 2,
            name: 'wood',
            weight: '300kg'
        },
        {
            id: 0,
            name: 'Bootle',
            reqQty: '200kg',
            expAmt: '200',
            marketPrice: '309',
            bidPrice: '23',
            totalAmt: '348'
        },
        {
            id: 1,
            name: 'plastic',
            weight: '300kg'
        },
        {
            id: 2,
            name: 'wood',
            weight: '300kg'
        }
    ];

    return (
        <Box
            sx={{
                backgroundColor: 'white',
                width: matches ? '100%' : '70%',
                boxShadow: '0px 4px 30px rgba(0, 0, 0, 0.2)',
                animation: animations.fadeInUp
            }}
        >
            <div style={{ padding: '10px' }}>
                <Grid container spacing={1} justifyContent="start" alignItems="center">
                    <Grid item lg={3} md={12} sm={12} xs={12}>
                        <Stack flexDirection="row" gap={1}>
                            <Stack alignItems="center">
                                <Avatar sx={{ width: '60px', height: '60px' }} variant="rounded">
                                    C
                                </Avatar>
                            </Stack>
                            <Stack alignItems="start">
                                <Typography color={colors.primary} fontWeight="bold" component="div" variant="p">
                                    Company Name
                                </Typography>
                                <Typography color="#818694" sx={{ fontSize: '12px' }} fontWeight="bold" component="div" variant="p">
                                    <LocationOnIcon sx={{ fontSize: '12px' }} />
                                    Location
                                </Typography>
                                <Typography
                                    color="orange"
                                    sx={{ fontSize: '12px', display: 'flex' }}
                                    fontWeight="bold"
                                    component="div"
                                    variant="p"
                                >
                                    <StarIcon sx={{ fontSize: '12px' }} />
                                    <p style={{ color: colors.primary }}>4.5</p>
                                </Typography>
                            </Stack>
                        </Stack>
                    </Grid>
                    <Grid item lg={3} md={6} sm={6} xs={6}>
                        <Stack flexDirection="row" gap={1} alignItems="center">
                            <CalendarMonthRoundedIcon sx={{ fontSize: '1.5rem', color: '#6c7281' }} />
                            <Stack alignItems="start">
                                <Typography color="#818694" sx={{ fontSize: '12px' }} fontWeight="bold" component="div" variant="p">
                                    Pickup Date
                                </Typography>
                                <Typography component="div" variant="p">
                                    Sunday April 30,2023
                                </Typography>
                            </Stack>
                        </Stack>
                    </Grid>
                    <Grid item lg={3} md={6} sm={6} xs={6}>
                        <Stack flexDirection="row" gap={1} alignItems="center">
                            <AccessTimeRoundedIcon sx={{ fontSize: '1.5rem', color: '#6c7281' }} />
                            <Stack alignItems="start">
                                <Typography color="#818694" sx={{ fontSize: '12px' }} fontWeight="bold" component="div" variant="p">
                                    Time
                                </Typography>
                                <Typography component="div" variant="p">
                                    Sunday April 30,2023
                                </Typography>
                            </Stack>
                        </Stack>
                    </Grid>
                    <Grid item lg={3} md={6} sm={6} xs={6}>
                        <Stack flexDirection="row" gap={1} alignItems="center">
                            <CurrencyRupeeOutlinedIcon sx={{ fontSize: '1.5rem', color: '#6c7281' }} />
                            <Stack alignItems="start">
                                <Typography color="#818694" sx={{ fontSize: '12px' }} fontWeight="bold" component="div" variant="p">
                                    Total Bid Amount
                                </Typography>
                                <Typography component="div" variant="p">
                                    Sunday April 30,2023
                                </Typography>
                            </Stack>
                        </Stack>
                    </Grid>
                </Grid>
                <Divider />
                <br></br>
                <Stack gap={2}>
                    {products?.length > 0 &&
                        products.map((product, index) => {
                            return (
                                <Grid key={index} container spacing={1} justifyContent="start" alignItems="center">
                                    <Grid item lg={3} md={12} sm={12} xs={12}>
                                        <Stack flexDirection="row" gap={1}>
                                            <Stack alignItems="center">
                                                <Avatar sx={{ width: '45px', height: '45px' }} variant="rounded">
                                                    p
                                                </Avatar>
                                            </Stack>
                                            <Stack alignItems="start">
                                                <Typography color={colors.primary} component="div" variant="p">
                                                    Aluminium
                                                </Typography>
                                                <Typography
                                                    color="#818694"
                                                    sx={{ fontSize: '12px' }}
                                                    fontWeight="bold"
                                                    component="div"
                                                    variant="p"
                                                >
                                                    Metals
                                                </Typography>
                                            </Stack>
                                        </Stack>
                                    </Grid>
                                    <Grid item lg={1.8} md={4} sm={6} xs={6}>
                                        <Stack alignItems="start">
                                            <FormHelperText sx={{ margin: 0, color: '#818694' }}> Requested Quantity</FormHelperText>
                                            <TextField
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <Typography component="p">kg</Typography>
                                                        </InputAdornment>
                                                    )
                                                }}
                                                fullWidth
                                                disabled
                                                defaultValue="200"
                                                size="small"
                                            />
                                        </Stack>
                                    </Grid>
                                    <Grid item lg={1.8} md={4} sm={6} xs={6}>
                                        <Stack alignItems="start">
                                            <FormHelperText sx={{ margin: 0, color: '#818694' }}> Market Price / kg</FormHelperText>
                                            <TextField
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <Typography component="p">₹</Typography>
                                                        </InputAdornment>
                                                    )
                                                }}
                                                fullWidth
                                                disabled
                                                defaultValue="200"
                                                size="small"
                                            />
                                        </Stack>
                                    </Grid>
                                    <Grid item lg={1.5} md={4} sm={6} xs={6}>
                                        <Stack alignItems="start">
                                            <FormHelperText sx={{ margin: 0, color: '#818694' }}> Expected Price / kg</FormHelperText>
                                            <TextField
                                                fullWidth
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <Typography component="p">₹</Typography>
                                                        </InputAdornment>
                                                    )
                                                }}
                                                disabled
                                                defaultValue="200"
                                                size="small"
                                            />
                                        </Stack>
                                    </Grid>
                                    <Grid item lg={1.8} md={4} sm={6} xs={6}>
                                        <Stack alignItems="start">
                                            <FormHelperText sx={{ margin: 0, color: '#818694' }}> Bid Price / kg</FormHelperText>
                                            <TextField
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <Typography component="p">₹</Typography>
                                                        </InputAdornment>
                                                    )
                                                }}
                                                fullWidth
                                                disabled
                                                defaultValue="200"
                                                size="small"
                                            />
                                        </Stack>
                                    </Grid>
                                    <Grid item lg={1.8} md={4} sm={6} xs={6}>
                                        <Stack alignItems="start">
                                            <FormHelperText sx={{ margin: 0, color: '#818694' }}> Expected Bid Amt</FormHelperText>
                                            <TextField
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <Typography component="p">₹</Typography>
                                                        </InputAdornment>
                                                    )
                                                }}
                                                fullWidth
                                                disabled
                                                defaultValue="200"
                                                size="small"
                                            />
                                        </Stack>
                                    </Grid>
                                </Grid>
                            );
                        })}
                </Stack>
            </div>
            <br></br>
            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 2,
                    padding: '20px 20px',
                    justifyContent: 'space-between',
                    backgroundColor: '#f2f6f8',
                    width: '100%'
                    // boxShadow: '0px 20px 30px rgba(0, 0, 0, 0.25)'
                }}
            >
                <Button size="small" sx={{ dimensions: 'fit-content', textTransform: 'none' }} onClick={() => setIsDetail(false)}>
                    Go to Open Bids &nbsp; <NavigateNextIcon />
                </Button>
                <Stack flexDirection="row-reverse" gap={2}>
                    <ThemeButton startIcon={<CheckRoundedIcon />} sx={{ padding: '2px 20px 2px 10px', fontWeight: 'bold' }}>
                        Accept
                    </ThemeButton>
                    <ThemeButton2 startIcon={<ClearRoundedIcon />} sx={{ padding: '2px 20px 2px 10px', fontWeight: 'bold' }}>
                        Reject
                    </ThemeButton2>

                    <ThemeButton2 startIcon={<EditRoundedIcon />} sx={{ padding: '2px 20px 2px 10px', fontWeight: 'bold' }}>
                        Modify
                    </ThemeButton2>
                </Stack>
            </div>
        </Box>
    );
}

BidDetail.propTypes = {
    setIsDetail: PropTypes.func.isRequired
};

export default BidDetail;
