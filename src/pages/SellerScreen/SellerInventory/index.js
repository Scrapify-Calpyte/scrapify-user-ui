import { Grid, Stack, Box, Typography, useMediaQuery, Button } from '@mui/material/index';
import { useContext, useState } from 'react';
import { ThemeContext } from '~/util/ThemeProvider';
import InventoryProduct from './InventoryProduct';
import { useEffect } from 'react';
import ControlPointOutlinedIcon from '@mui/icons-material/ControlPointOutlined';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { styled } from '@mui/material/styles';
import { ThemeButton, ThemeButton2 } from '~/util/MyComponents';

function SellerInventory() {
    const { colors, fonts } = useContext(ThemeContext);
    const matches = useMediaQuery('(max-width:768px)');
    const [formData, setFormData] = useState({});

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

    useEffect(() => {}, []);

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
                backgroundColor: colors.theme
            }}
        >
            <Box sx={{ width: matches ? '100%' : '60%', padding: '2%' }}>
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
                <Grid
                    container
                    sx={{ backgroundColor: '#f2f6f8', width: '100%', padding: '3% 2%', boxShadow: '0px 20px 30px rgba(0, 0, 0, 0.25)' }}
                >
                    <Grid item xs={12} sm={12} md={6} order={{ sm: 2, xs: 2, lg: 1, lg: 1 }}>
                        <Button size="small" sx={{ dimensions: 'fit-content', textTransform: 'none' }}>
                            Go to Dashboard &nbsp; <NavigateNextIcon />
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} order={{ sm: 1, xs: 1, lg: 2, lg: 2 }}>
                        <Stack flexDirection="row-reverse" gap={2}>
                            <ThemeButton size="small" onClick={handleSubmit}>
                                Update Inventory
                            </ThemeButton>
                            <ThemeButton2 size="small">Reset Changes</ThemeButton2>
                        </Stack>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}
export default SellerInventory;
