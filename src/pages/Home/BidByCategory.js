import { ThemeButton } from '~/util/MyComponents';
import PropTypes from 'prop-types';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { Button, FormControl, FormHelperText, InputAdornment, Stack, Typography } from '@mui/material/index';
import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '~/util/ThemeProvider';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Slider from '@mui/material/Slider';
import { animations } from 'react-animation';

function BidByCategory({ setIsByCategory, categories = [] }) {
    const { colors, fonts } = useContext(ThemeContext);
    const [products, setProducts] = useState([]);
    const [formValues, setFormValues] = useState({
        category: '',
        product: '',
        reqQuantity: '',
        distance: 30
    });

    useEffect(() => {
        // alert(JSON.stringify(categories));
    }, []);

    function handleChange(data) {
        const { name, value } = data;
        setFormValues((prev) => ({ ...prev, [name]: value }));
        if (name === 'category') {
            setFormValues((prev) => ({ ...prev, product: null }));
            setProducts(value?.products);
        }
    }

    return (
        <>
            <Stack padding={2} spacing={1} sx={{ animation: animations.fadeIn, zIndex: 1 }}>
                <Typography
                    color={colors.primary}
                    sx={{ textTransform: 'none' }}
                    component={Button}
                    variant="h6"
                    justifyContent="start"
                    fontWeight="bold"
                    onClick={() => setIsByCategory(false)}
                >
                    <ArrowBackIosNewRoundedIcon />
                    &nbsp; Bid By Category
                </Typography>
                <FormControl>
                    <FormHelperText sx={{ margin: 0 }}>Select Category</FormHelperText>
                    <Autocomplete
                        disablePortal
                        name="category"
                        value={formValues?.category ? formValues?.category : null}
                        options={categories}
                        getOptionLabel={(option) => option.name}
                        onChange={(e, obj) => handleChange({ name: 'category', value: obj })}
                        size="small"
                        renderInput={(params) => <TextField {...params} />}
                    />
                </FormControl>
                <FormControl>
                    <FormHelperText sx={{ margin: 0 }}>Select Sub Category</FormHelperText>
                    <Autocomplete
                        name="product"
                        value={formValues?.product ? formValues?.product : null}
                        disablePortal
                        getOptionLabel={(option) => option.name}
                        onChange={(e, obj) => handleChange({ name: 'product', value: obj })}
                        options={products}
                        size="small"
                        renderInput={(params) => <TextField {...params} />}
                    />
                </FormControl>
                <FormControl>
                    <FormHelperText sx={{ margin: 0 }}>Enter Required Quantity</FormHelperText>
                    <TextField
                        name="reqQuantity"
                        value={formValues?.reqQuantity}
                        onChange={(e) => handleChange(e.target)}
                        size="small"
                        type="number"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Typography component="p">kg</Typography>
                                </InputAdornment>
                            )
                        }}
                        fullWidth={true}
                    />
                </FormControl>
                <FormControl>
                    <FormHelperText sx={{ margin: 0 }}>Distance Range ({formValues?.distance} km)</FormHelperText>
                    <Slider
                        name="distance"
                        value={formValues?.distance}
                        onChange={(e) => handleChange(e?.target)}
                        sx={{ color: colors.primary }}
                        min={10}
                        max={100}
                    />
                </FormControl>
                <ThemeButton sx={{ width: '100%' }} onClick={() => alert(JSON.stringify(formValues))}>
                    Search Sellers
                </ThemeButton>
            </Stack>
        </>
    );
}

BidByCategory.propTypes = {
    setIsByCategory: PropTypes.func.isRequired,
    categories: PropTypes.array
};
export default BidByCategory;
