import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

export default function SellerScreen() {
    return (
        <Stack direction="row" spacing={2}>
            <Box
                sx={{
                    width: '100%',
                    height: 720,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'primary.main',
                    '&:hover': {
                        backgroundColor: 'primary.main',
                        opacity: [0.9, 0.8, 0.7]
                    }
                }}
            >
                Seller Screen
            </Box>
        </Stack>
    );
}
