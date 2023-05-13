import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ControlPointOutlinedIcon from '@mui/icons-material/ControlPointOutlined';
import img from '~assets/images/seller_img1.PNG';
import PropTypes from 'prop-types';

export default function InventoryHome({ handleDialog }) {
    return (
        <>
            <Stack
                alignItems="center"
                gap={2}
                sx={{
                    boxShadow: '0px 20px 30px rgba(0, 0, 0, 0.25)',
                    backgroundColor: 'white',
                    padding: '2%',
                    width: '100%',
                    height: '70vh',
                    overflow: 'auto'
                }}
            >
                <div style={{ width: '100%', textAlign: 'center' }}>
                    <img className="img-fluid" style={{ objectFit: 'contain' }} src={img} loading="lazy" alt="ico"></img>
                </div>
                <Typography color="secondary" fontWeight="bold">
                    Sell Scrap to contribute for a circular economy
                </Typography>
                <Button
                    color="secondary"
                    sx={{
                        fontWeight: 'bold',
                        textTransform: 'none',
                        borderRadius: '31px',
                        paddingRight: '1%'
                    }}
                    size="small"
                    onClick={() => handleDialog(true)}
                >
                    <ControlPointOutlinedIcon /> &nbsp; Add Scrap Products
                </Button>
            </Stack>
        </>
    );
}

InventoryHome.propTypes = {
    handleDialog: PropTypes.func.isRequired
};
