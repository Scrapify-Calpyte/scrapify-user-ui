import './index.css';
import { Grid, Stack, Box, Typography, useMediaQuery, Button } from '@mui/material/index';
import { useState } from 'react';
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
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ProductSelection from '~/pages/ReusableComponents/Register/ProductSelection';
import SelectedProducts from '~/pages/ReusableComponents/Register/SelectedProducts';
import bg from '~/assets/images/bg.png';

function SellerInventory() {
    const matches = useMediaQuery('(max-width:768px)');
    const [formData, setFormData] = useState({});
    const axios = useAxios();
    const [inventoryData, setInventoryData] = useState({});
    const [page, setPage] = useState(null);
    const [checkedValues, setCheckedValues] = useState([]);
    const [categories, setCategories] = useState([]);
    const [open, setOpen] = useState(false);
    const [step, setStep] = useState(0);
    const [selectedProducts, setSelectedProducts] = useState([]);

    function handleFormDataChange(childIndex, childFormData) {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [childIndex]: childFormData
        }));
    }

    function getProducts() {
        axios
            .get(ApiConfig.getAllCategories)
            .then((res) => {
                setCategories(res?.data);
            })
            .catch((err) => toast.error(err.message));
    }

    useEffect(() => {
        getProducts();
        getInventories();
    }, []);

    function getInventories() {
        axios
            .get(ApiConfig.getInventoriesByToken)
            .then((res) => {
                if (res?.data && res?.data?.stock?.length > 0) {
                    setInventoryData(res?.data);
                    let stockIds = res?.data?.stock.map((s) => s?.id);
                    if (stockIds.length > 0) {
                        setCategories((oldArr) =>
                            oldArr.map((old) => {
                                old['products'] = old?.products.filter((p) => !stockIds.includes(p?.id));
                                return old;
                            })
                        );
                    }
                    setStep(0);
                    setOpen(false);
                    setPage(1);
                } else {
                    setPage(0);
                }
            })
            .catch((err) => {
                console.log(err.message);
                setPage(0);
            });
    }

    function handleSubmit() {
        let stockArr = [];
        inventoryData?.stock?.forEach((stock) => {
            let temp = { ...stock };
            temp['quantity'] = formData[temp?.id]?.quantity;
            temp['price'] = formData[temp?.id]?.price;
            stockArr.push(temp);
        });
        console.log(stockArr);
        // updateStocks({ id: inventoryData?.id, stock: stockArr });
    }

    function handleDialog(status) {
        setOpen(status);
    }

    function getSelectedProducts() {
        let arr = [];
        categories.forEach((category) => {
            let products = [...category?.products];
            let obj = {
                id: category?.id,
                name: category?.name,
                icon: category?.icon,
                products: products.filter((product) => checkedValues.includes(product?.id))
            };
            arr.push(obj);
        });
        setSelectedProducts(arr.filter((e) => e?.products?.length > 0));
    }

    function handleSelectedProducts() {
        if (step === 0) {
            getSelectedProducts();
            setStep(1);
        } else if (step === 1) {
            let stock = [];
            selectedProducts.forEach((category) => {
                stock = [...stock, ...category?.products];
            });
            let obj = {};
            if (Object.keys(inventoryData)?.length > 0) {
                (obj.id = inventoryData?.id), (obj.stock = [...inventoryData?.stock, ...stock]);
            } else {
                obj.stock = stock;
            }
            updateStocks(obj);
        }
    }

    function updateStocks(obj) {
        axios
            .post(ApiConfig.saveInventory, obj)
            .then((res) => {
                toast.success('Inventory Updated');
                getInventories();
            })
            .catch((err) => toast.error(err.message));
    }

    function resetChanges() {
        setFormData({});
        // let data = { ...inventoryData };
        // setInventoryData(data);
        getInventories();
    }

    return (
        <>
            <div style={{ position: 'fixed', width: '100%', height: '100%' }}>
                <img src={bg} className="img-fluid" style={{ width: '100%', height: '100%' }} alt="ico"></img>
            </div>
            <Box
                sx={{
                    width: '100%',
                    height: '92vh',
                    display: 'flex',
                    justifyContent: 'center',
                    overflow: 'hidden'
                }}
            >
                <Box
                    sx={{
                        width: matches ? '100%' : '70%',
                        padding: '2%',
                        height: '92vh',
                        animation: animations.fadeInUp
                    }}
                >
                    <Grid container spacing={1} sx={{ height: '8vh' }}>
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                            <Typography fontWeight="bold" fontSize="large" color="secondary">
                                Scrap Inventory
                            </Typography>
                        </Grid>
                        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ display: 'flex', flexDirection: matches ? 'row' : 'row-reverse' }}>
                            <Typography fontWeight="bold" color="secondary" fontSize="small">
                                {step === 0 ? '' : ' Estimated Scrap Amt. #200.00'}
                            </Typography>
                        </Grid>
                    </Grid>
                    {
                        {
                            0: <InventoryHome handleDialog={handleDialog} />,
                            1: (
                                <div>
                                    <Stack
                                        gap={2}
                                        alignItems="center"
                                        sx={{
                                            boxShadow: '0px 20px 30px rgba(0, 0, 0, 0.25)',
                                            backgroundColor: 'white',
                                            padding: '2%',
                                            width: '100%',
                                            maxHeight: '60vh',
                                            overflow: 'auto'
                                        }}
                                    >
                                        {inventoryData &&
                                            inventoryData?.stock?.map((inventory, index) => {
                                                return (
                                                    <InventoryProduct
                                                        key={index}
                                                        inventoryData={inventory}
                                                        onFormDataChange={handleFormDataChange}
                                                        formData={formData}
                                                        index={inventory?.name}
                                                    />
                                                );
                                            })}
                                        <Button
                                            onClick={() => setOpen(true)}
                                            color="secondary"
                                            sx={{ fontWeight: 'bold', textTransform: 'none' }}
                                            size="small"
                                        >
                                            <ControlPointOutlinedIcon /> &nbsp; Add More Products
                                        </Button>
                                    </Stack>
                                    <div
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
                                        <Button color="secondary" size="small" sx={{ dimensions: 'fit-content', textTransform: 'none' }}>
                                            Go to Dashboard &nbsp; <NavigateNextIcon />
                                        </Button>
                                        <Stack flexDirection="row-reverse" gap={2}>
                                            <ThemeButton size="small" onClick={handleSubmit}>
                                                Update Inventory
                                            </ThemeButton>
                                            <ThemeButton2 size="small" onClick={resetChanges}>
                                                Reset Changes
                                            </ThemeButton2>
                                        </Stack>
                                    </div>
                                </div>
                            )
                        }[page]
                    }
                </Box>
            </Box>
            <Dialog
                BackdropProps={{
                    invisible: false
                }}
                fullWidth
                maxWidth="xs"
                open={open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    <Stack flexDirection="row" justifyContent="space-between">
                        <Typography fontWeight="bold" color="secondary" component="div" variant="subtitle1">
                            {step === 0 ? ' Select Scrap Product' : 'Selected Scrap Products'}
                        </Typography>
                        <IconButton size="small" onClick={() => handleDialog(false)}>
                            <Tooltip title="close">
                                <CloseIcon sx={{ fontSize: '1rem' }} />
                            </Tooltip>
                        </IconButton>
                    </Stack>
                </DialogTitle>
                <DialogContent>
                    {
                        {
                            0: (
                                <>
                                    <ProductSelection
                                        checkedValues={checkedValues}
                                        setCheckedValues={setCheckedValues}
                                        categories={categories}
                                    />
                                    <ThemeButton sx={{ width: '100%' }} onClick={handleSelectedProducts}>
                                        Review
                                    </ThemeButton>
                                </>
                            ),
                            1: (
                                <>
                                    <SelectedProducts categories={selectedProducts} />
                                    <Stack flexDirection="row" justifyContent="space-between" gap={2}>
                                        <ThemeButton2 sx={{ width: '100%' }} onClick={() => setStep(0)}>
                                            Previous
                                        </ThemeButton2>
                                        <ThemeButton sx={{ width: '100%' }} onClick={handleSelectedProducts}>
                                            Done
                                        </ThemeButton>
                                    </Stack>
                                </>
                            )
                        }[step]
                    }
                </DialogContent>
            </Dialog>
        </>
    );
}
export default SellerInventory;
