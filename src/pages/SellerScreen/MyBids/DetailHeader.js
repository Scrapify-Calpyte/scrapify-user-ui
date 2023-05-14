import { Button, Stack, Typography, useMediaQuery } from '@mui/material/index';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import PropTypes from 'prop-types';
import { animations } from 'react-animation';
import { useNavigate } from 'react-router-dom';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';

function DetailHeader({ setIsDetail, selectedTab }) {
    const matches = useMediaQuery('(max-width:768px)');
    const navigate = useNavigate();

    function goToInventory() {
        navigate('/seller/inventory');
    }

    return (
        <>
            <Stack
                flexDirection="row"
                justifyContent="space-between"
                sx={{
                    padding: '10px 0',
                    width: matches ? '100%' : '70%',
                    animation: animations.fadeIn
                }}
            >
                <Stack flexDirection="row" alignItems="center" gap={2}>
                    <Typography color="secondary" component={Button} variant="h6" fontWeight="bold" onClick={() => setIsDetail(false)}>
                        <ArrowBackIosNewRoundedIcon />
                        &nbsp; BID 0010
                    </Typography>
                    <Button variant="contained" color="primary" sx={{ color: 'white' }} size="small">
                        {selectedTab.toUpperCase()}
                    </Button>
                </Stack>
                <Stack flexDirection="row" alignItems="center" gap={2}>
                    <Typography color="secondary" sx={{ textTransform: 'none' }} component={Button} onClick={goToInventory}>
                        <DashboardCustomizeIcon />
                        &nbsp; Stock
                    </Typography>
                </Stack>
            </Stack>
        </>
    );
}

DetailHeader.propTypes = {
    setIsDetail: PropTypes.func.isRequired
};

export default DetailHeader;
