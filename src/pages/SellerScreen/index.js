import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

export default function SellerScreen() {
    return (
        <Stack direction="row" spacing={2}>
            <Box
                sx={{
                    width: 300,
                    height: 300,
                    backgroundColor: 'primary.dark',
                    '&:hover': {
                        backgroundColor: 'primary.main',
                        opacity: [0.9, 0.8, 0.7]
                    }
                }}
            />
            <Box
                sx={{
                    width: 300,
                    height: 300,
                    backgroundColor: 'primary.dark',
                    '&:hover': {
                        backgroundColor: 'primary.main',
                        opacity: [0.9, 0.8, 0.7]
                    }
                }}
            />
        </Stack>
    );
}
