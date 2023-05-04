import Header from './Header';
import Box from '@mui/material/Box';
import { useMediaQuery } from '@mui/material/index';
import bg from '~/assets/images/bg.png';
import { animations } from 'react-animation';

function MyBids() {
    const matches = useMediaQuery('(max-width:768px)');

    return (
        <>
            <Box
                sx={{
                    backgroundImage: 'url(' + bg + ')',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    objectFit: 'cover',
                    width: '100%',
                    height: '92vh',
                    textAlign: 'center'
                }}
            >
                <Box sx={{ animation: animations.popIn }}>
                    <Header />
                </Box>
                <Box sx={{ width: matches ? '100%' : '75%', padding: '2%', animation: animations.popIn }}>
                    <p>sjdfg</p>
                </Box>
            </Box>
        </>
    );
}

export default MyBids;
