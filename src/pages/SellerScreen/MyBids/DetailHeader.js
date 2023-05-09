import Box from '@mui/material/Box';
import { Button, Stack, Typography, useMediaQuery } from '@mui/material/index';
import { useContext } from 'react';
import { ThemeContext } from '~/util/ThemeProvider';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import PropTypes from 'prop-types';
import { animations } from 'react-animation';

function DetailHeader({ setIsDetail }) {
    const { colors } = useContext(ThemeContext);
    const matches = useMediaQuery('(max-width:768px)');

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
                    <Typography color={colors.primary} component={Button} variant="h6" fontWeight="bold" onClick={() => setIsDetail(false)}>
                        <ArrowBackIosNewRoundedIcon />
                        &nbsp; BID 0010
                    </Typography>
                    <Button
                        variant="contained"
                        sx={{ color: 'white', backgroundColor: '#3cc179', '&:hover': { color: 'white', backgroundColor: '#3cc179' } }}
                        size="small"
                    >
                        open
                    </Button>
                </Stack>
                <Stack flexDirection="row" alignItems="center" gap={2}>
                    <Typography>Stock</Typography>
                </Stack>
            </Stack>
        </>
    );
}

DetailHeader.propTypes = {
    setIsDetail: PropTypes.func.isRequired
};

export default DetailHeader;
