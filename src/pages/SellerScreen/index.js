import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

export default function SellerScreen() {
    return (
        <Stack direction="row" spacing={2}>
            <Box
                sx={{
                    width: '100%',
                    height: '725px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'primary.main',
                    color: 'white',
                    fontWeight: 'bold',
                    '&:hover': {
                        backgroundColor: 'primary.main',
                        opacity: [0.9, 0.8, 0.7],
                        color: 'white',
                        fontWeight: 'bold'
                    }
                }}
            >
                <p>Seller Screen</p>
            </Box>
        </Stack>
    );
}
