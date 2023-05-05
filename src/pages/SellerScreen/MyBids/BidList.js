import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarIcon from '@mui/icons-material/Star';
import { ThemeButton, ThemeButton2 } from '~/util/MyComponents';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import Box from '@mui/material/Box';
import { Avatar, Button, Divider, Grid, Stack, Typography, useMediaQuery } from '@mui/material/index';
import { useContext } from 'react';
import { ThemeContext } from '~/util/ThemeProvider';
import PropTypes from 'prop-types';
import { animations } from 'react-animation';

function BidList({ bids = [], handleActions }) {
    const { colors, fonts } = useContext(ThemeContext);
    const matches = useMediaQuery('(max-width:768px)');

    const products = [
        {
            id: 0,
            name: 'Bootle',
            weight: '300kg'
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

    function handleAction(bidId, action) {
        handleActions(bidId, action);
    }

    return (
        <Box
            sx={{
                backgroundColor: 'white',
                width: matches ? '100%' : '70%',
                boxShadow: '0px 4px 30px rgba(0, 0, 0, 0.2)',
                animation: animations.fadeInUp
            }}
        >
            {bids?.length > 0 &&
                bids.map((data, index) => {
                    return (
                        <Stack key={index} spacing={2} padding="10px">
                            <Grid container spacing={1} justifyContent="start" alignItems="center">
                                <Grid item lg={3} md={12} sm={12} xs={12}>
                                    <Stack alignItems="start">
                                        <Button size="small">Bid001</Button>
                                    </Stack>
                                    <Stack flexDirection="row" gap={1}>
                                        <Stack alignItems="center">
                                            <Avatar sx={{ width: '60px', height: '60px' }} variant="rounded">
                                                sd
                                            </Avatar>
                                        </Stack>
                                        <Stack alignItems="start">
                                            <Typography color={colors.primary} fontWeight="bold" component="div" variant="p">
                                                Company Name
                                            </Typography>
                                            <Typography
                                                color="#bfc2c9"
                                                sx={{ fontSize: '12px' }}
                                                fontWeight="bold"
                                                component="div"
                                                variant="p"
                                            >
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
                                {products?.length > 0 &&
                                    products.map((product, index) => {
                                        return (
                                            <Grid key={index} item lg={2} md={4} sm={6} xs={6}>
                                                <Box
                                                    sx={{
                                                        border: 'solid 1px #bfc2c9',
                                                        borderRadius: '10px',
                                                        textAlign: 'start',
                                                        padding: '3%'
                                                    }}
                                                >
                                                    <Stack flexDirection="row" gap={1}>
                                                        <Avatar sx={{ width: '45px', height: '45px' }} variant="rounded">
                                                            sdf
                                                        </Avatar>
                                                        <Stack spacing={0}>
                                                            <Typography component="div" variant="p">
                                                                {product?.name}
                                                            </Typography>
                                                            <Typography component="div" variant="subtitle2">
                                                                {product?.weight}
                                                            </Typography>
                                                        </Stack>
                                                    </Stack>
                                                </Box>
                                            </Grid>
                                        );
                                    })}
                                <Grid item lg={3} md={12} sm={12} xs={12}>
                                    <Box
                                        sx={{
                                            border: 'solid 1px #bfc2c9',
                                            borderRadius: '10px',
                                            textAlign: 'start',
                                            padding: '2%'
                                        }}
                                    >
                                        <Stack spacing={0}>
                                            <Typography color="#bfc2c9" fontWeight="bold" component="div" variant="subtitle2">
                                                Expected BID Amt.
                                            </Typography>
                                            <Typography fontWeight="bold" component="div" variant="p">
                                                $200
                                            </Typography>
                                        </Stack>
                                    </Box>
                                </Grid>
                            </Grid>
                            <Box style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-end', gap: 4 }}>
                                <ThemeButton2
                                    startIcon={<MoreHorizOutlinedIcon />}
                                    sx={{ padding: '2px 20px 2px 10px', fontWeight: 'bold' }}
                                    onClick={(e) => handleAction(data?.id, 'more')}
                                >
                                    More details
                                </ThemeButton2>
                                <ThemeButton2
                                    startIcon={<EditRoundedIcon />}
                                    sx={{ padding: '2px 20px 2px 10px', fontWeight: 'bold' }}
                                    onClick={(e) => handleAction(data?.id, 'modify')}
                                >
                                    Modify
                                </ThemeButton2>
                                <ThemeButton2
                                    startIcon={<ClearRoundedIcon />}
                                    sx={{ padding: '2px 20px 2px 10px', fontWeight: 'bold' }}
                                    onClick={(e) => handleAction(data?.id, 'reject')}
                                >
                                    Reject
                                </ThemeButton2>
                                <ThemeButton
                                    startIcon={<CheckRoundedIcon />}
                                    sx={{ padding: '2px 20px 2px 10px', fontWeight: 'bold' }}
                                    onClick={(e) => handleAction(data?.id, 'accept')}
                                >
                                    Accept
                                </ThemeButton>
                            </Box>
                            <Divider />
                        </Stack>
                    );
                })}
        </Box>
    );
}

BidList.propTypes = {
    bids: PropTypes.array,
    handleActions: PropTypes.func
};

export default BidList;