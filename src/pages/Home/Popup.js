import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';
import Popover from '@mui/material/Popover';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import * as React from 'react';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import CloseIcon from '@mui/icons-material/Close';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useEffect } from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { ThemeButton } from '~/util/MyComponents';
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material/index';
import { useTheme } from '@mui/material/styles';
export default function Popup({ consumerData, open, setOpen, placeBid }) {
    const matches = useMediaQuery('(max-width:768px)');
    const [data, setData] = useState(null);
    const { palette } = useTheme();

    useEffect(() => {
        setData(consumerData);
    }, [consumerData]);

    const tableHeaderStyle = {
        fontWeight: '500',
        fontSize: '12px',
        color: palette.grey.main
    };

    const tableBodyStyle = {
        fontWeight: 'bold',
        fontSize: '15px',
        color: palette.dark.main
    };

    return (
        <Dialog
            BackdropProps={{
                invisible: false
            }}
            fullWidth
            maxWidth="sm"
            fullScreen={matches && true}
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            PaperProps={{
                elevation: 0,
                style: {
                    maxHeight: matches ? '92vh' : '82vh',
                    boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                    borderRadius: '5px',
                    overflow: 'hidden',
                    position: 'absolute',
                    zIndex: 4,
                    top: matches && '8vh'
                    // left: matches ? 0 : '280px'
                }
            }}
        >
            <DialogTitle sx={{ padding: '0 5px', margin: 0, backgroundColor: 'white', opacity: 1 }}>
                <ListItemButton
                    key={1}
                    selected={false}
                    style={{
                        padding: '5px',
                        width: '100%'
                    }}
                >
                    <ListItemIcon>
                        <Avatar
                            src="https://preview.keenthemes.com/metronic-v4/theme/assets/pages/img/avatars/team1.jpg"
                            variant="square"
                            alt="P"
                            sx={{ height: 50, width: 50 }}
                        ></Avatar>
                    </ListItemIcon>
                    <div className="container" style={{ padding: '5px' }}>
                        <Stack flexDirection="row" justifyContent="space-between">
                            <Typography color="secondary" fontWeight="bold">
                                {data?.seller?.firstName + ' ' + data?.seller?.lastName}
                            </Typography>

                            <Tooltip title="close" arrow>
                                <IconButton onClick={() => setOpen(false)}>
                                    <CloseIcon color="secondary" />
                                </IconButton>
                            </Tooltip>
                        </Stack>
                        <Stack flexDirection="row" justifyContent="space-between" alignItems="center" fontSize="11px">
                            <Typography color="grey" fontSize="11px">
                                <StarRateRoundedIcon sx={{ color: 'orange' }} style={{ fontSize: '20px' }} />
                                &nbsp; 4.0
                            </Typography>
                            <Typography color="grey" fontSize="11px">
                                58K Reviews
                            </Typography>
                        </Stack>
                    </div>
                </ListItemButton>
            </DialogTitle>
            <DialogContent sx={{ padding: '0 5px', margin: 0 }}>
                <Box
                    style={{
                        padding: '5px',
                        width: '100%'
                    }}
                >
                    <Stack>
                        <Box sx={{ width: '100%', overflow: 'auto' }}>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <td style={tableHeaderStyle}>SCRAP TYPE</td>
                                        <td style={tableHeaderStyle}>QUANTITY</td>
                                        <td style={tableHeaderStyle}>MARKET PRICE</td>
                                        <td style={tableHeaderStyle}>EXPECTED PRICE</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data?.stock?.length > 0 &&
                                        data?.stock.map((item, index) => {
                                            return (
                                                <tr key={index} style={{ alignItems: 'center' }}>
                                                    <td style={tableBodyStyle}>
                                                        <div style={{ display: 'flex', gap: 5 }}>
                                                            <Avatar size="small" variant="rounded" alt="P"></Avatar>
                                                            <Typography component="div" variant="p">
                                                                {item?.name}
                                                            </Typography>
                                                        </div>
                                                    </td>
                                                    <td style={tableBodyStyle}>
                                                        <Typography component="div" variant="p">
                                                            {item?.quantity + item?.unit?.name}
                                                        </Typography>
                                                    </td>
                                                    <td style={tableBodyStyle}>
                                                        <Typography component="div" variant="p">
                                                            {item?.price}
                                                        </Typography>
                                                    </td>
                                                    <td style={tableBodyStyle}>
                                                        <Typography component="div" variant="p">
                                                            {item?.price}
                                                        </Typography>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    <tr></tr>
                                </tbody>
                            </table>
                        </Box>
                        <br></br>
                        <Divider />
                        <Typography variant="subtitle1" fontWeight="bold" color="secondary" component="div">
                            Images
                        </Typography>
                        <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%', gap: 2 }}>
                            {data?.stock?.length > 0 &&
                                data?.stock.map((p, index) => {
                                    return (
                                        <Avatar
                                            key={index}
                                            alt="waste"
                                            src="https://images.unsplash.com/photo-1562077981-4d7eafd44932?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d2FzdGV8ZW58MHx8MHx8&w=1000&q=80"
                                            variant="square"
                                            sx={{ height: 75, width: 75 }}
                                        />
                                    );
                                })}
                        </div>
                        <br></br>
                        <Typography variant="subtitle1" fontWeight="bold" color="secondary" component="div">
                            Seller Location
                        </Typography>
                        <Typography variant="subtitle2" color="secondary" component="div">
                            {data?.displayLocation?.address}
                        </Typography>
                    </Stack>
                </Box>
            </DialogContent>
            <DialogActions>
                <ThemeButton
                    sx={{ width: '100%', borderRadius: '5px' }}
                    onClick={() => {
                        setOpen(false);
                        placeBid(true, consumerData);
                    }}
                >
                    Bid Now
                </ThemeButton>
            </DialogActions>
        </Dialog>
    );
}

Popup.propTypes = {
    consumerData: PropTypes.any,
    open: PropTypes.bool,
    setOpen: PropTypes.func,
    placeBid: PropTypes.func
};
