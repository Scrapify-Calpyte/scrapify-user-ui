import Tooltip from '@mui/material/Tooltip';
import List from '@mui/material/List';
import Avatar from '@mui/material/Avatar';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';
import Divider from '@mui/material/Divider';
import PropTypes from 'prop-types';
import './home.css';

function SellersList({ consumersData = [], selectedIndex, setSelectedIndex, setOpen }) {
    return (
        <>
            <List>
                {consumersData?.length > 0 &&
                    consumersData.map((data, index) => {
                        return (
                            <div key={index}>
                                <ListItemButton
                                    key={index}
                                    selected={selectedIndex === index}
                                    onClick={(event) => {
                                        setSelectedIndex(index);
                                        setOpen(true);
                                    }}
                                    sx={{
                                        padding: 0,
                                        width: '100%',
                                        borderRight: selectedIndex === index ? 'solid 3px #013f56' : 'default'
                                    }}
                                >
                                    <ListItemIcon>
                                        <Avatar src={data?.seller?.image} variant="square" alt="P" sx={{ height: 50, width: 50 }}></Avatar>
                                    </ListItemIcon>
                                    <div
                                        className="container"
                                        style={{
                                            lineHeight: 1.5,
                                            fontSize: '12px',
                                            padding: '5px',
                                            alignItems: 'space-between'
                                        }}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <div style={{ color: '#013f56', fontWeight: 'bold' }}>
                                                {data?.seller?.firstName + data?.seller?.lastName}
                                            </div>
                                            <div style={{ color: 'grey', fontWeight: 'bold' }}>
                                                <LocationOnIcon style={{ fontSize: '15px' }} />{' '}
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                            {data?.stock?.length > 0 &&
                                                data?.stock?.slice(0, 3).map((product, index) => {
                                                    return (
                                                        <Tooltip key={index} title={product?.name} arrow>
                                                            <div style={{ marginRight: '2px' }} className="chip">
                                                                {product?.name}
                                                            </div>
                                                        </Tooltip>
                                                    );
                                                })}
                                            {data?.stock.length > 3 ? (
                                                <Tooltip title={data?.stock.length - 3 + 'more'} arrow>
                                                    <div className="chip">{'+ ' + (data?.stock.length - 3) + 'more'}</div>
                                                </Tooltip>
                                            ) : (
                                                <></>
                                            )}
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
                                                &nbsp; {data?.seller?.rating}
                                            </div>
                                            <div style={{ color: '#1bd7a0' }}>View Details</div>
                                        </div>
                                    </div>
                                </ListItemButton>
                                <Divider />
                            </div>
                        );
                    })}
            </List>
        </>
    );
}

SellersList.propTypes = {
    consumersData: PropTypes.array.isRequired,
    selectedIndex: PropTypes.any.isRequired,
    setSelectedIndex: PropTypes.func.isRequired,
    setOpen: PropTypes.func.isRequired
};
export default SellersList;
