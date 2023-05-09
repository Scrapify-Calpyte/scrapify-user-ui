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
import { styled } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useEffect } from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { ThemeButton } from '~/util/MyComponents';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material/index';

const CustomBackdrop = styled('div')({
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    zIndex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
});

export default function Popup({ consumerData, open, setOpen, placeBid }) {
    const matches = useMediaQuery('(max-width:768px)');
    const [data, setData] = useState(null);

    useEffect(() => {
        setData(consumerData);
    }, [consumerData]);

    const tableHeaderStyle = {
        fontWeight: '500',
        color: '#818694',
        fontSize: '12px'
    };

    const tableBodyStyle = {
        fontWeight: 600,
        fontSize: '15px',
        lineHeight: ' 24px',
        leadingTrim: 'both',
        textEdge: 'cap',
        color: '#3B4357'
    };

    return (
        <Dialog
            BackdropProps={{
                invisible: true
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
                    top: matches ? '8vh' : '12vh',
                    left: matches ? 0 : '280px'
                }
            }}
        >
            <DialogTitle sx={{ padding: '0 5px', margin: 0 }}>
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
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{ color: '#013f56', fontWeight: 'bold', fontSize: '18px' }}>
                                {data?.seller?.firstName + ' ' + data?.seller?.lastName}
                            </div>
                            <div style={{ color: 'grey', fontWeight: 'bold' }}>
                                <Tooltip title="close" arrow>
                                    <CloseIcon style={{ fontSize: '20px', color: '#013f56' }} onClick={() => setOpen(false)} />
                                </Tooltip>
                            </div>
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                fontSize: '11px'
                            }}
                        >
                            <div
                                style={{
                                    color: '#013f56',
                                    fontWeight: 'bold',
                                    display: 'flex',
                                    alignItems: 'end'
                                }}
                            >
                                <StarRateRoundedIcon sx={{ color: 'orange' }} style={{ fontSize: '20px' }} />
                                &nbsp; 4.0
                            </div>
                            <div style={{ color: 'grey' }}>58K Reviews</div>
                        </div>
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
                        {/* <Typography variant="p" fontWeight="bold" color="#013f56" component="div">
                            Scrap To Bid
                        </Typography> */}
                        {/* <table className="table">
                            <thead>
                                <tr style={{ color: '#013f56' }}>
                                    <th>ScrapType</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.stock?.length > 0 &&
                                    data?.stock.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                        <Avatar size="small" variant="square" alt="P"></Avatar>
                                                        <Typography component="div" variant="p">
                                                            {item?.name}
                                                        </Typography>
                                                    </div>
                                                </td>
                                                <td>
                                                    <Typography component="div" variant="p">
                                                        {item?.quantity + item?.unit?.name}
                                                    </Typography>
                                                </td>
                                                <td>
                                                    <Typography component="div" variant="p">
                                                        {item?.price}
                                                    </Typography>
                                                </td>
                                                <td></td>
                                            </tr>
                                        );
                                    })}
                                <tr></tr>
                            </tbody>
                        </table> */}
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
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
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
                        <Typography variant="p" fontWeight="bold" color="#013f56" component="div">
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
                        <Typography variant="p" fontWeight="bold" color="#013f56" component="div">
                            Seller Location
                        </Typography>
                        <Typography variant="p" color="#013f56" component="div">
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
