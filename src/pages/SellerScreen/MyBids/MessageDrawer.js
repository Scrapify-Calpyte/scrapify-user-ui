import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Stack from '@mui/material/Stack';
import { useContext } from 'react';
import { ThemeContext } from '~/util/ThemeProvider';
import { Chip, IconButton, Typography } from '@mui/material/index';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import MessageRoundedIcon from '@mui/icons-material/MessageRounded';

function MessageDrawer({ open, setOpen, data }) {
    const { colors, fonts } = useContext(ThemeContext);

    return (
        <Drawer
            open={open}
            anchor="right"
            sx={{
                minWidth: '40vw',
                '& .MuiDrawer-paper': {
                    width: '350px',
                    boxSizing: 'border-box'
                }
            }}
            onClose={() => setOpen(false)}
        >
            <Stack sx={{ alignItem: 'space-between', justifyContent: 'space-between' }}>
                <Box sx={{ padding: '20px', minHeight: '85vh' }}>
                    <Stack flexDirection="row" justifyContent="space-between" alignItems="center">
                        <Typography color={colors.primary} component="div" variant="p" fontWeight="bold">
                            <MessageRoundedIcon />
                            &nbsp;&nbsp; Messages
                        </Typography>
                        <IconButton onClick={() => setOpen(false)}>
                            <CloseRoundedIcon />
                        </IconButton>
                    </Stack>
                    <Stack flexDirection="row" justifyContent="center">
                        <Chip label={JSON.stringify(new Date())} variant="outlined" />
                    </Stack>
                </Box>
                <Box sx={{ backgroundColor: '#f2f6f8', width: '100%', minHeight: '15vh' }}>
                    <p>jhasdt</p>
                </Box>
            </Stack>
        </Drawer>
    );
}

export default MessageDrawer;
