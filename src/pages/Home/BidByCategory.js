import { ThemeButton, ThemeButton2 } from '~/util/MyComponents';
import PropTypes from 'prop-types';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { Button, FormControl, FormHelperText, InputAdornment, Stack, Typography } from '@mui/material/index';
import { useContext } from 'react';
import { ThemeContext } from '~/util/ThemeProvider';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Slider from '@mui/material/Slider';

function BidByCategory({ setIsByCategory }) {
    const { colors, fonts } = useContext(ThemeContext);

    return (
        <>
            <Stack padding={2} spacing={1}>
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
                        id="combo-box-demo"
                        options={[]}
                        size="small"
                        renderInput={(params) => <TextField {...params} />}
                    />
                </FormControl>
                <FormControl>
                    <FormHelperText sx={{ margin: 0 }}>Select Sub Category</FormHelperText>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={[]}
                        size="small"
                        renderInput={(params) => <TextField {...params} />}
                    />
                </FormControl>
                <FormControl>
                    <FormHelperText sx={{ margin: 0 }}>Enter Required Quantity</FormHelperText>
                    <TextField
                        id="quantity"
                        name="quantity"
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
                    <FormHelperText sx={{ margin: 0 }}>Distance Range (km)</FormHelperText>
                    <Slider defaultValue={30} valueLabelDisplay="auto" step={10} marks min={10} max={100} />
                </FormControl>
                <ThemeButton sx={{ width: '100%' }}>Search Sellers</ThemeButton>
            </Stack>
        </>
    );
}

BidByCategory.propTypes = {
    setIsByCategory: PropTypes.func.isRequired
};
export default BidByCategory;
