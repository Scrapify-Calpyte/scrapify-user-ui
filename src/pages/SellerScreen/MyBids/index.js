import Header from './Header';
import Box from '@mui/material/Box';
import bg from '~/assets/images/bg.png';

function MyBids() {
    return (
        <>
            <Box
                style={{ backgroundImage: 'url(' + bg + ')', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', objectFit: 'cover' }}
                sx={{
                    width: '100%',
                    height: '92vh'
                }}
            >
                <Header />
            </Box>
        </>
    );
}

export default MyBids;
