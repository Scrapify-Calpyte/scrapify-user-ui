import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import { Chip, IconButton, TextField, Typography } from '@mui/material/index';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import MessageRoundedIcon from '@mui/icons-material/MessageRounded';
import { ThemeButton } from '~/util/MyComponents';
import SendIcon from '@mui/icons-material/Send';
import { toast } from 'react-toastify';

function MessageDrawer({ open, setOpen, bid, modifyBid }) {
    function handleModifyBid() {
        let message = document.getElementById('message').value;
        if (bid?.id && message.trim()?.length > 1) {
            modifyBid(bid?.id, message.trim());
        } else {
            toast.warning('Enter a valid  Message');
        }
    }
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
            <Stack sx={{ alignItems: 'space-between', justifyContent: 'space-between', height: '100vh' }}>
                <Box sx={{ padding: '20px' }}>
                    <Stack flexDirection="row" justifyContent="space-between" alignItems="center">
                        <Typography color="secondary" component="div" variant="p" fontWeight="bold">
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
                <Stack sx={{ backgroundColor: '#f2f6f8', width: '100%', minHeight: '15vh', padding: '3%' }}>
                    <TextField color="secondary" id="message" placeholder="Type your message here" multiline rows={4} variant="filled" />
                    <div style={{ textAlign: 'end' }}>
                        <ThemeButton sx={{ width: '100%', borderRadius: '0' }} onClick={handleModifyBid}>
                            <SendIcon /> &nbsp;Send
                        </ThemeButton>
                    </div>
                </Stack>
            </Stack>
        </Drawer>
    );
}

export default MessageDrawer;
