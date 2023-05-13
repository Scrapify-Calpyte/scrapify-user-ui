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
                            <div key={index} sx={{ padding: '4%' }}>
                                <ListItemButton
                                    key={index}
                                    selected={selectedIndex === index}
                                    onClick={(event) => {
                                        setSelectedIndex(index);
                                        setOpen(true);
                                    }}
                                    sx={{
                                        padding: 0,
                                        width: '90%',
                                        borderRight: selectedIndex === index ? 'solid 3px ' + palette.secondary.main : 'inherit',
                                        margin: '3%',
                                        borderRadius: '5px'
                                    }}
                                >
                                    <ListItemIcon color="black">
                                        <Avatar
                                            src={data?.seller?.image}
                                            variant="square"
                                            alt="P"
                                            sx={{ height: 50, width: 50, background: '#EFF3F7' }}
                                        ></Avatar>
                                    </ListItemIcon>
                                    <Stack alignItems="space-between" width="100%" padding="5px">
                                        <Stack flexDirection="row" justifyContent="space-between">
                                            <Typography color="secondary" fontWeight="bold" variant="subtitle2">
                                                {data?.seller?.firstName + data?.seller?.lastName}
                                            </Typography>
                                        </Stack>
                                        <Stack flexDirection="row" justifyContent="space-between" alignItems="center">
                                            <Typography color="secondary" fontWeight="bold" fontSize="11px">
                                                <StarRateRoundedIcon sx={{ color: 'orange', fontSize: '13px' }} />
                                                &nbsp; 4.0
                                            </Typography>
                                        </Stack>
                                        <Stack flexDirection="row" justifyContent="space-between">
                                            <Typography
                                                variant="subtitle2"
                                                fontSize="10px"
                                                fontWeight="400"
                                                color="#818694
"
                                            >
                                                Last posted {data?.lastUpdated}
                                            </Typography>
                                        </Stack>
                                    </Stack>
                                </ListItemButton>
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
