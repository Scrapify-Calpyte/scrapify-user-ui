import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import './home.css';
import { useMediaQuery } from '@mui/material/index';
import PropTypes from 'prop-types';
import EditIcon from '@mui/icons-material/Edit';

function LocateMe({ setSideNav }) {
    const matches = useMediaQuery('(max-width:768px)');

    return (
        <>
            <List dense={true}>
                <ListItem
                    secondaryAction={
                        <Stack flexDirection="row" gap={2}>
                            <Tooltip title="Locate me" arrow>
                                <IconButton edge="end">
                                    <EditIcon color="secondary" />
                                </IconButton>
                            </Tooltip>
                            <div
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'flex-end',
                                    display: !matches ? 'none' : 'flex',
                                    alignItems: 'center'
                                }}
                            >
                                <Tooltip title="Close" arrow>
                                    <IconButton onClick={() => setSideNav(false)}>
                                        <CloseIcon />
                                    </IconButton>
                                </Tooltip>
                            </div>
                        </Stack>
                    }
                >
                    <LocationOnIcon sx={{ height: '45px', width: '45px' }} color="secondary" />
                    <ListItemText
                        primary={
                            <Typography color="secondary" fontWeight="600" fontSize="18px">
                                Chennai
                            </Typography>
                        }
                        secondary={
                            <Typography color="primary" fontWeight="500" fontSize="14px">
                                Change Location
                            </Typography>
                        }
                    />
                </ListItem>
            </List>
        </>
    );
}

LocateMe.propTypes = {
    setSideNav: PropTypes.func.isRequired
};
export default LocateMe;
