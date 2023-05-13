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
import { useTheme } from '@mui/material/styles';
import { Stack, Typography } from '@mui/material/index';

function SellersList({ consumersData = [], selectedIndex, setSelectedIndex, setOpen }) {
    const { palette } = useTheme();
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
                                        borderRight: selectedIndex === index ? 'solid 3px ' + palette.secondary.main : 'inherit'
                                    }}
                                >
                                    <ListItemIcon>
                                        <Avatar src={data?.seller?.image} variant="square" alt="P" sx={{ height: 50, width: 50 }}></Avatar>
                                    </ListItemIcon>
                                    <Stack alignItems="space-between" width="100%" padding="5px">
                                        <Stack flexDirection="row" justifyContent="space-between">
                                            <Typography color="secondary" fontWeight="bold" variant="subtitle2">
                                                {data?.seller?.firstName + data?.seller?.lastName}
                                            </Typography>
                                            <Stack flexDirection="row">
                                                <LocationOnIcon color="grey" style={{ fontSize: '15px' }} />
                                            </Stack>
                                        </Stack>
                                        {/* <div style={{ display: 'flex', flexWrap: 'wrap' }}>
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
                                        </div> */}
                                        <Stack flexDirection="row" justifyContent="space-between" alignItems="center">
                                            <Typography color="secondary" fontWeight="bold" fontSize="11px">
                                                <StarRateRoundedIcon sx={{ color: 'orange', fontSize: '13px' }} />
                                                &nbsp; 4.0
                                            </Typography>
                                            <Typography color="primary" fontSize="11px">
                                                54k reviews
                                            </Typography>
                                        </Stack>
                                        <Stack flexDirection="row" alignItems="center">
                                            <Typography color="grey" fontWeight="bold" fontSize="11px">
                                               Updated 24 hrs ago
                                            </Typography>
                                        </Stack>
                                    </Stack>
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
