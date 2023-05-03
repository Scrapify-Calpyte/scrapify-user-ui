import './index.css';
import { Grid, Stack, Box, Typography, useMediaQuery, Button } from '@mui/material/index';
import { useContext, useState } from 'react';
import { ThemeContext } from '~/util/ThemeProvider';
import InventoryProduct from './InventoryProduct';
import { useEffect } from 'react';
import ControlPointOutlinedIcon from '@mui/icons-material/ControlPointOutlined';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { styled } from '@mui/material/styles';
import { ThemeButton, ThemeButton2 } from '~/util/MyComponents';
import { useAxios } from '~/components/useAxios';
import { ApiConfig } from '~/components/ApiConfig';
import { toast } from 'react-toastify';
import { animations } from 'react-animation';
import InventoryHome from './InventoryHome';

function SellerInventory() {
    const { colors, fonts } = useContext(ThemeContext);
    const matches = useMediaQuery('(max-width:768px)');
    const [formData, setFormData] = useState({});
    const axios = useAxios();
    const [inventoryData, setInventoryData] = useState([]);

    function handleFormDataChange(childIndex, childFormData) {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [childIndex]: childFormData
        }));
    }

    const inventoryList = [
        {
            id: '324234',
            product: 'Aluminium',
            category: 'Metals',
            availableQty: 23,
            expectedPrice: 345,
            marketPrice: 400
        },
        {
            id: '3452',
            product: 'Bottles',
            category: 'Metals',
            availableQty: 23,
            expectedPrice: 345,
            marketPrice: 400
        },
        {
            id: '3425',
            product: 'Plastic',
            category: 'Metals',
            availableQty: 23,
            expectedPrice: 345,
            marketPrice: 400
        },
        {
            id: '3426',
            product: 'Household',
            category: 'Metals',
            availableQty: 23,
            expectedPrice: 345,
            marketPrice: 400
        }
    ];

    useEffect(() => {
        axios
            .get(ApiConfig.findMe)
            .then((res) => {
                setInventoryData(res?.data?.products);
                console.log(res);
            })
            .catch((err) => toast.error(err.message));
    }, []);

    function handleSubmit() {
        console.log(formData);
    }

    return (
        <Box
            sx={{
                width: '100%',
                height: 'auto',
                display: 'flex',
                justifyContent: 'center',
                backgroundColor: colors.theme,
                animation: animations.popIn
            }}
        >
            <Box sx={{ width: matches ? '100%' : '75%', padding: '2%' }}>
                <Grid container spacing={1}>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <Typography fontWeight="bold" fontSize="large" color={colors.primary}>
                            Scrap Inventory
                        </Typography>
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12} sx={{ display: 'flex', flexDirection: matches ? 'row' : 'row-reverse' }}>
                        <Typography fontWeight="bold" color={colors.primary} fontSize="small">
                            Estimated Scrap Amt. #200.00
                        </Typography>
                    </Grid>
                </Grid>
                {/* <InventoryHome /> */}
                <div>
                    <Stack
                        gap={2}
                        alignItems="center"
                        sx={{ boxShadow: '0px 20px 30px rgba(0, 0, 0, 0.25)', backgroundColor: 'white', padding: '2%', width: '100%' }}
                    >
                        {inventoryList.map((inventory, index) => {
                            return (
                                <InventoryProduct
                                    key={index}
                                    inventoryData={inventory}
                                    onFormDataChange={handleFormDataChange}
                                    formData={formData}
                                    index={inventory?.id}
                                />
                            );
                        })}
                        <Button sx={{ color: colors.primary, fontWeight: 'bold', textTransform: 'none' }} size="small">
                            <ControlPointOutlinedIcon /> &nbsp; Add More Products
                        </Button>
                    </Stack>
                    <div
                        className="inventory-bottom"
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: 2,
                            padding: '20px 20px',
                            justifyContent: 'space-between',
                            backgroundColor: '#f2f6f8',
                            width: '100%',
                            boxShadow: '0px 20px 30px rgba(0, 0, 0, 0.25)'
                        }}
                    >
                        <Button size="small" sx={{ dimensions: 'fit-content', textTransform: 'none' }}>
                            Go to Dashboard &nbsp; <NavigateNextIcon />
                        </Button>
                        <Stack flexDirection="row-reverse" gap={2}>
                            <ThemeButton size="small" onClick={handleSubmit}>
                                Update Inventory
                            </ThemeButton>
                            <ThemeButton2 size="small">Reset Changes</ThemeButton2>
                        </Stack>
                    </div>
                </div>
            </Box>
        </Box>
    );
}
export default SellerInventory;
