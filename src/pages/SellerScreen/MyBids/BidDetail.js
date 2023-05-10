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
import { useContext, useState } from 'react';
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

function BidDetail({ setIsDetail, bid, handleAction }) {
    const { colors, fonts } = useContext(ThemeContext);
    const matches = useMediaQuery('(max-width:768px)');
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        setTimeout(setIsComplete(true), 300);
    }, []);

    return (
        <>
            {isComplete ? (
                <Box
                    sx={{
                        backgroundColor: '#FDFEFE',
                        width: matches ? '100%' : '70%',
                        boxShadow: '0px 4px 30px rgba(0, 0, 0, 0.2)',
                        animation: animations.fadeInUp
                    }}
                >
                    <div style={{ padding: '10px', animation: animations.fadeIn }}>
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
                                            {bid?.buyer?.firstName + ' ' + bid?.buyer?.lastName}
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
                                            {bid?.consumer?.pickupDate}
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
                                            {bid?.consumer?.pickupTime}
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
                            {bid?.consumer?.proposals?.length > 0 &&
                                bid?.consumer?.proposals.map((proposal, index) => {
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
                                                            {proposal?.product?.name}
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
                                                    <FormHelperText sx={{ margin: 0, color: '#818694' }}>
                                                        {' '}
                                                        Requested Quantity
                                                    </FormHelperText>
                                                    <Typography component="div" variant="p" color="#3B4357" fontWeight="bold">
                                                        {proposal?.qty} kg
                                                    </Typography>
                                                </Stack>
                                            </Grid>
                                            <Grid item lg={1.8} md={4} sm={6} xs={6}>
                                                <Stack alignItems="start">
                                                    <FormHelperText sx={{ margin: 0, color: '#818694' }}> Market Price / kg</FormHelperText>
                                                    <Typography component="div" variant="p" color="#3B4357" fontWeight="bold">
                                                        ₹ 200
                                                    </Typography>
                                                </Stack>
                                            </Grid>
                                            <Grid item lg={1.5} md={4} sm={6} xs={6}>
                                                <Stack alignItems="start">
                                                    <FormHelperText sx={{ margin: 0, color: '#818694' }}>
                                                        {' '}
                                                        Expected Price / kg
                                                    </FormHelperText>
                                                    <Typography component="div" variant="p" color="#3B4357" fontWeight="bold">
                                                        ₹ 200
                                                    </Typography>
                                                </Stack>
                                            </Grid>
                                            <Grid item lg={1.8} md={4} sm={6} xs={6}>
                                                <Stack alignItems="start">
                                                    <FormHelperText sx={{ margin: 0, color: '#818694' }}> Bid Price / kg</FormHelperText>
                                                    <Typography component="div" variant="p" color="#3B4357" fontWeight="bold">
                                                        ₹ {proposal?.amount}
                                                    </Typography>
                                                </Stack>
                                            </Grid>
                                            <Grid item lg={1.8} md={4} sm={6} xs={6}>
                                                <Stack alignItems="start">
                                                    <FormHelperText sx={{ margin: 0, color: '#818694' }}> Expected Bid Amt</FormHelperText>
                                                    <Typography component="div" variant="p" color="#3B4357" fontWeight="bold">
                                                        ₹ {parseFloat(proposal?.qty) * parseFloat(proposal?.amount)}
                                                    </Typography>
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
                            padding: '10px',
                            justifyContent: 'space-between',
                            backgroundColor: '#f2f6f8',
                            width: '100%'
                            // boxShadow: '0px 20px 30px rgba(0, 0, 0, 0.25)'
                        }}
                    >
                        <Button size="small" sx={{ dimensions: 'fit-content', textTransform: 'none' }} onClick={() => setIsDetail(false)}>
                            Go to Open Bids &nbsp; <NavigateNextIcon />
                        </Button>
                        <Stack flexDirection="row" gap={2} justifyContent="end">
                            <ThemeButton2
                                onClick={() => handleAction(null, 'modify')}
                                startIcon={<EditRoundedIcon />}
                                sx={{ padding: '2px 20px 2px 10px', fontWeight: 'bold' }}
                            >
                                Modify
                            </ThemeButton2>
                            <ThemeButton2
                                onClick={() => handleAction(null, 'reject')}
                                startIcon={<ClearRoundedIcon />}
                                sx={{ padding: '2px 20px 2px 10px', fontWeight: 'bold' }}
                            >
                                Reject
                            </ThemeButton2>
                            <ThemeButton startIcon={<CheckRoundedIcon />} sx={{ padding: '2px 20px 2px 10px', fontWeight: 'bold' }}>
                                Accept
                            </ThemeButton>
                        </Stack>
                    </div>
                </Box>
            ) : (
                <></>
            )}
        </>
    );
}

BidDetail.propTypes = {
    setIsDetail: PropTypes.func.isRequired,
    bid: PropTypes.any,
    handleAction: PropTypes.func
};

export default BidDetail;
