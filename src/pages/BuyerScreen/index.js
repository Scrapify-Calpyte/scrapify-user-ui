import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

export default function BuyerScreen() {
    return (
        <Box sx={{ display: 'flex', width: '100%', padding: '1%' }}>
            <Box
                sx={{
                    width: '18%',
                    height: 600,
                    backgroundColor: 'red'
                }}
            />
            <Box
                sx={{
                    width: '82%',
                    height: 600,
                    backgroundColor: 'primary.dark'
                }}
            />
        </Box>
    );
}
