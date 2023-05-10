import { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {
    Avatar,
    IconButton,
    Stack,
    Tooltip,
    Typography,
    Box,
    Grid,
    FormHelperText,
    TextField,
    InputAdornment,
    useMediaQuery,
    DialogActions
} from '@mui/material/index';
import StarIcon from '@mui/icons-material/Star';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CloseIcon from '@mui/icons-material/Close';
import { ThemeButton } from '~/util/MyComponents';
import { toast } from 'react-toastify';

export default function BuyerBids({ open, setOpen, consumerData }) {
    const matches = useMediaQuery('(max-width:768px)');
    const [formData, setFormData] = useState({});

    useEffect(() => {
        console.log(consumerData);
    }, []);

    function handleClose() {
        setOpen(false);
    }
    function handleChange(id, data) {
        const { name, value } = data;
        let selectedProduct = consumerData?.stock.find((e) => e?.id === id);
        if (name === 'reqQty') {
            if (parseFloat(value) <= parseFloat(selectedProduct?.quantity) || !value) {
                setFormData((prevState) => ({ ...prevState, [id]: { ...prevState[id], [name]: value } }));
            } else toast.warning('Requested Quantity should not exceed Available Quantity');
        } else if (name === 'bidPrice') {
            // if (parseFloat(value) >= parseFloat(selectedProduct?.price) || !value) {
            setFormData((prevState) => ({ ...prevState, [id]: { ...prevState[id], [name]: value } }));
            // }
            // } else toast.warning('Bid Price should be more than Expected Price');
        }
    }

    function getTotalAmount() {
        let count = 0;
        const keys = Object.keys(formData);
        keys.forEach((key) => {
            if (formData[key]?.bidPrice && formData[key]?.reqQty)
                count = parseFloat(formData[key]?.bidPrice) * parseFloat(formData[key]?.reqQty) + count;
        });
        return count;
    }

    return (
        <>
            <Dialog
                BackdropProps={{
                    invisible: matches && true
                }}
                fullWidth
                fullScreen={matches && true}
                maxWidth="lg"
                open={open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                PaperProps={{
                    style: {
                        maxHeight: matches && '92vh',
                        position: 'absolute',
                        top: matches && '8vh'
                    }
                }}
            >
                <DialogTitle id="alert-dialog-title" sx={{ padding: '10px 10px 0 10px', margin: 0, backgroundColor: '#f2f6f8' }}>
                    <Stack flexDirection="row" justifyContent="space-between">
                        <Stack flexDirection="row" gap={1}>
                            <Stack alignItems="center">
                                <Avatar
                                    src="https://preview.keenthemes.com/metronic-v4/theme/assets/pages/img/avatars/team1.jpg"
                                    sx={{ width: '60px', height: '60px' }}
                                    variant="rounded"
                                >
                                    C
                                </Avatar>
                            </Stack>
                            <Stack alignItems="start">
                                <Typography color="secondary" fontWeight="bold" component="div" variant="subtitle2">
                                    {consumerData?.seller?.firstName + ' ' + consumerData?.seller?.lastName}
                                </Typography>
                                <Typography color="#818694" sx={{ fontSize: '12px' }} fontWeight="bold" component="div" variant="p">
                                    <LocationOnIcon sx={{ fontSize: '12px' }} />
                                    Location
                                </Typography>
                                <Typography
                                    color="secondary"
                                    sx={{ fontSize: '12px', display: 'flex' }}
                                    fontWeight="bold"
                                    component="div"
                                    variant="p"
                                >
                                    <StarIcon sx={{ color: 'orange', fontSize: '12px' }} />
                                    4.5
                                </Typography>
                            </Stack>
                        </Stack>
                        <Box>
                            <IconButton size="small" onClick={handleClose}>
                                <Tooltip title="close">
                                    <CloseIcon sx={{ fontSize: '1rem' }} />
                                </Tooltip>
                            </IconButton>
                        </Box>
                    </Stack>
                </DialogTitle>
                <DialogContent sx={{ minWidth: '30vw', padding: '20px 10px', margin: 0 }}>
                    <Stack gap={2}>
                        {consumerData?.stock?.length > 0 &&
                            consumerData?.stock.map((product, index) => {
                                return (
                                    <Grid key={index} container spacing={1} justifyContent="start" alignItems="center">
                                        <Grid item lg={3} md={12} sm={12} xs={12}>
                                            <Stack flexDirection="row" gap={1}>
                                                <Stack alignItems="center">
                                                    <Avatar sx={{ width: '45px', height: '45px' }} variant="rounded">
                                                        p
                                                    </Avatar>
                                                </Stack>
                                                <Stack alignItems="start">
                                                    <Typography color="secondary" component="div" variant="p">
                                                        {product?.name}
                                                    </Typography>
                                                    <Typography
                                                        color="#818694"
                                                        sx={{ fontSize: '12px' }}
                                                        fontWeight="bold"
                                                        component="div"
                                                        variant="p"
                                                    >
                                                        {product?.name}
                                                    </Typography>
                                                </Stack>
                                            </Stack>
                                        </Grid>
                                        <Grid item lg={1.5} md={4} sm={6} xs={6}>
                                            <Stack alignItems="start">
                                                <FormHelperText>Available Quantity</FormHelperText>
                                                <TextField
                                                    InputProps={{
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                <Typography component="p">kg</Typography>
                                                            </InputAdornment>
                                                        )
                                                    }}
                                                    fullWidth
                                                    disabled
                                                    defaultValue={product?.quantity}
                                                    size="small"
                                                />
                                            </Stack>
                                        </Grid>
                                        <Grid item lg={1.5} md={4} sm={6} xs={6}>
                                            <Stack alignItems="start">
                                                <FormHelperText>Req. Quantity</FormHelperText>
                                                <TextField
                                                    value={formData[product?.id]?.reqQty}
                                                    type="number"
                                                    name="reqQty"
                                                    onChange={(e) => handleChange(product?.id, e?.target)}
                                                    InputProps={{
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                <Typography component="p">kg</Typography>
                                                            </InputAdornment>
                                                        )
                                                    }}
                                                    fullWidth
                                                    size="small"
                                                />
                                            </Stack>
                                        </Grid>
                                        <Grid item lg={1.5} md={4} sm={6} xs={6}>
                                            <Stack alignItems="start">
                                                <FormHelperText> Market Price / kg</FormHelperText>
                                                <TextField
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <Typography component="p">₹</Typography>
                                                            </InputAdornment>
                                                        )
                                                    }}
                                                    fullWidth
                                                    disabled
                                                    defaultValue="200"
                                                    size="small"
                                                />
                                            </Stack>
                                        </Grid>
                                        <Grid item lg={1.5} md={4} sm={6} xs={6}>
                                            <Stack alignItems="start">
                                                <FormHelperText> Expected Price / kg</FormHelperText>
                                                <TextField
                                                    fullWidth
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <Typography component="p">₹</Typography>
                                                            </InputAdornment>
                                                        )
                                                    }}
                                                    disabled
                                                    defaultValue={product?.price}
                                                    size="small"
                                                />
                                            </Stack>
                                        </Grid>
                                        <Grid item lg={1.5} md={4} sm={6} xs={6}>
                                            <Stack alignItems="start">
                                                <FormHelperText> Bid Price / kg</FormHelperText>
                                                <TextField
                                                    name="bidPrice"
                                                    type="number"
                                                    onChange={(e) => handleChange(product?.id, e.target)}
                                                    value={formData[product?.id]?.bidPrice}
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <Typography component="p">₹</Typography>
                                                            </InputAdornment>
                                                        )
                                                    }}
                                                    fullWidth
                                                    size="small"
                                                />
                                            </Stack>
                                        </Grid>
                                        <Grid item lg={1.5} md={4} sm={6} xs={6}>
                                            <Stack alignItems="start">
                                                <FormHelperText>Total Amount</FormHelperText>
                                                <Typography fontWeight="bold" color="secondary">
                                                    ₹{' '}
                                                    {formData[product?.id]?.reqQty && formData[product?.id]?.bidPrice
                                                        ? parseFloat(formData[product?.id]?.reqQty) *
                                                          parseFloat(formData[product?.id]?.bidPrice)
                                                        : 0}
                                                </Typography>
                                            </Stack>
                                        </Grid>
                                    </Grid>
                                );
                            })}
                    </Stack>
                    <br></br>
                    <Stack flexDirection="row" justifyContent="center">
                        <Typography color="secondary">Estimated Bid Amt</Typography>&nbsp;&nbsp;
                        <Typography color="secondary" fontWeight="bold">
                            ₹ {getTotalAmount()}
                        </Typography>
                    </Stack>
                </DialogContent>
                <DialogActions sx={{ backgroundColor: '#f2f6f8', padding: '15px' }}>
                    <Stack flexDirection="row-reverse">
                        <ThemeButton sx={{ padding: '5px 20px' }} onClick={() => alert(JSON.stringify(formData))}>
                            Review Bid
                        </ThemeButton>
                    </Stack>
                </DialogActions>
            </Dialog>
        </>
    );
}
