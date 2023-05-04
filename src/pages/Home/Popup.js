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

const CustomBackdrop = styled('div')({
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    zIndex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
});

export default function Popup({ consumerData, open, setOpen }) {
    const matches = useMediaQuery('(max-width:768px)');
    const [data, setData] = useState(null);

    useEffect(() => {
        setData(consumerData);
    }, [consumerData]);

    return (
        <Popover
            anchorReference="anchorPosition"
            anchorPosition={{ top: 120, left: 310 }}
            id="account-menu"
            open={open}
            onClose={() => setOpen(false)}
            PaperProps={{
                elevation: 0,
                style: {
                    width: matches ? '100vw' : '30vw', // set maximum width
                    maxHeight: '92vh', // set maximum height
                    height: 'fit-content',
                    boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    position: 'absolute',
                    zIndex: 4
                }
            }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
            <div
                style={{
                    overflow: 'auto',
                    height: '100%',
                    width: '100%',
                    padding: '1% 5px'
                }}
            >
                <ListItemButton
                    key={1}
                    selected={false}
                    style={{
                        padding: '5px',
                        width: '100%',
                        borderRadius: '0px 20px 0 0'
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
                            <div style={{ color: '#013f56', fontWeight: 'bold' }}>
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
                        <table className="table">
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
                        </table>
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
                                            sx={{ height: 75, width: '24%' }}
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
                        <br></br>
                        <button onClick={() => alert('navigate to Bid')} className="btn1">
                            Bid Now
                        </button>
                        <br></br>
                    </Stack>
                </Box>
            </div>
        </Popover>
    );
}

Popup.propTypes = {
    consumerData: PropTypes.any,
    open: PropTypes.bool,
    setOpen: PropTypes.func
};
