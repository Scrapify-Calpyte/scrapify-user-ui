import Avatar from '@mui/material/Avatar';
import img from '/src/assets/images/product.png';
import { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { Box, Grid } from '@mui/material/index';
import { ThemeContext } from '~/util/ThemeProvider';
import { useContext } from 'react';
export default function ProductList({ products, setProduct }) {
    const [selectedProduct, setSelectedProduct] = useState([]);
    const { colors, fonts } = useContext(ThemeContext);

    useEffect(() => {}, []);

    const handleSelectedProduct = (index) => {
        setSelectedProduct((oldArray) => {
            if (oldArray.includes(index)) {
                let data = [...oldArray.filter((e) => e != index)];
                setProduct(data);
                return data;
            } else {
                let data = [...oldArray, index];
                setProduct(data);
                return data;
            }
        });
    };

    return (
        <Grid container rowSpacing={1}>
            {products?.length > 0 &&
                products.map((product, index) => {
                    return (
                        <Grid key={index} item lg={4} md={4} sm={4} xs={4} sx={{ justifyContent: 'center' }}>
                            <Stack alignItems="center" spacing={2}>
                                <Box
                                    onClick={() => handleSelectedProduct(index)}
                                    sx={{
                                        border: '1px solid #E5E5E5',
                                        borderRadius: '17px',
                                        padding: '4%',
                                        boxShadow: selectedProduct.includes(index) ? '0px 4px 4px rgba(0, 0, 0, 0.25)' : 'none'
                                    }}
                                >
                                    <Avatar src={img} sx={{ height: '70px', width: '70px' }}></Avatar>
                                </Box>
                                <Typography component="div" variant="subtitle2" color={colors?.primary} fontWeight="bold">
                                    {product?.name}
                                </Typography>
                            </Stack>
                        </Grid>
                    );
                })}
        </Grid>
    );
}

ProductList.propTypes = {
    products: PropTypes.array,
    setProduct: PropTypes.func
};
