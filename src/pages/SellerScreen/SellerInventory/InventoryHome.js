import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useContext } from 'react';
import { ThemeContext } from '~/util/ThemeProvider';
import ControlPointOutlinedIcon from '@mui/icons-material/ControlPointOutlined';
import img from '~assets/images/seller_img1.PNG';
import ProductSelection from '~/pages/ReusableComponents/Register/ProductSelection';
import SelectedProducts from '~/pages/ReusableComponents/Register/SelectedProducts';

export default function InventoryHome({ handleDialog }) {
    const { colors, fonts } = useContext(ThemeContext);
    return (
        <>
            <Stack
                alignItems="center"
                gap={2}
                sx={{ boxShadow: '0px 20px 30px rgba(0, 0, 0, 0.25)', backgroundColor: 'white', padding: '2%', width: '100%' }}
            >
                <div style={{ width: '100%', textAlign: 'center' }}>
                    <img className="img-fluid" style={{ objectFit: 'contain' }} src={img} loading="lazy" alt="ico"></img>
                </div>
                <Typography sx={{ color: colors.primary, fontWeight: 'bold' }}>Sell Scrap to contribute for a circular economy</Typography>
                <Button
                    sx={{
                        color: 'white',
                        backgroundColor: colors.primary,
                        fontWeight: 'bold',
                        textTransform: 'none',
                        borderRadius: '31px',
                        '&:hover': {
                            backgroundColor: colors.primary,
                            color: 'white'
                        }
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
