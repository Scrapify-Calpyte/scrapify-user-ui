import { Avatar, Box, Divider, FormHelperText, Stack, Typography } from '@mui/material/index';
import InfoIcon from '@mui/icons-material/Info';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from 'react';

function ReviewBid() {
    const [formValues, setFormValues] = useState({});
    return (
        <>
            <Stack sx={{ width: '100%' }}>
                <Typography component="div" variant="head" color="secondary" fontWeight="bold">
                    Review Bid Information
                </Typography>
                <Stack flexDirection="row" sx={{ backgroundColor: '#fdf7eb', width: '100%' }}>
                    <InfoIcon sx={{ color: '#ffa300' }} />
                    <Typography>Exact pickup location & correct details will be shared once the BID gets accepted</Typography>
                </Stack>
                <Typography>User Info</Typography>
                <Stack flexDirection="row">
                    <Avatar sx={{ width: '45px', height: '45px' }} variant="rounded">
                        <ImageIcon />
                    </Avatar>
                    <Stack>
                        <Typography component="div" variant="head">
                            Name
                        </Typography>
                        <Typography component="div" variant="subtitle">
                            4.0
                        </Typography>
                    </Stack>
                </Stack>
                <Typography>Pickup Location</Typography>
                <Stack flexDirection="row">
                    <Typography component="div" variant="head" color="grey" sx={{ width: '60%' }}>
                        <LocationOnRoundedIcon /> &nbsp; Chennai
                    </Typography>
                    <Box sx={{ width: '40%', display: 'flex', justifyContent: 'end' }}>
                        <Avatar sx={{ width: '100%', height: '100%' }} variant="rounded">
                            <ImageIcon />
                        </Avatar>
                    </Box>
                </Stack>
                <Box>
                    <Typography>Pickup Date</Typography>
                    <LocalizationProvider dateAdapter={AdapterDayjs} fullWidth>
                        <FormHelperText>Pickup Date</FormHelperText>
                        <DatePicker size="small" name="pickupDate" id="pickupDate" fullWidth />
                    </LocalizationProvider>
                    <Divider />
                </Box>
            </Stack>
        </>
    );
}
export default ReviewBid;
