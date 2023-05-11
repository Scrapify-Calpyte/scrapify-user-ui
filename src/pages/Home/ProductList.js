import Avatar from '@mui/material/Avatar';
import img from '/src/assets/images/product.png';
import { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { Box, Grid } from '@mui/material/index';
import { animations } from 'react-animation';
import { ApiConfig } from '~/components/ApiConfig';
import ImageIcon from '@mui/icons-material/Image';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
export default function ProductList({ products, setProduct }) {
    const [selectedProduct, setSelectedProduct] = useState([]);
    const [viewMore, setViewMore] = useState(8);

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
        <Grid container rowSpacing={1} sx={{ animation: animations.fadeInUp }}>
            {products?.length > 0 &&
                products.slice(0, viewMore).map((product, index) => {
                    return (
                        <Grid key={index} item lg={4} md={4} sm={4} xs={4} sx={{ justifyContent: 'center' }}>
                            <Stack alignItems="center" spacing={1}>
                                <Box
                                    onClick={() => handleSelectedProduct(index)}
                                    sx={{
                                        border: '1px solid #E5E5E5',
                                        borderRadius: '17px',
                                        padding: '5%',
                                        '&:hover': {
                                            // boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
                                            // border: '2px solid #013f56'
                                        },
                                        boxShadow: selectedProduct.includes(index) ? '0px 4px 4px rgba(0, 0, 0, 0.25)' : 'none'
                                    }}
                                >
                                    <Avatar src={ApiConfig.imageUrl + product?.icon} alt="ico" sx={{ height: '70px', width: '70px' }}>
                                        <ImageIcon />
                                    </Avatar>
                                </Box>
                                <Typography component="div" variant="subtitle2" color="secondary" fontWeight="bold">
                                    {product?.name}
                                </Typography>
                            </Stack>
                        </Grid>
                    );
                })}

            <Grid item lg={4} md={4} sm={4} xs={4} sx={{ justifyContent: 'center' }}>
                <Stack alignItems="center" spacing={1}>
                    <Box
                        onClick={() => setViewMore((prev) => (prev === 8 ? products?.length : 8))}
                        sx={{
                            border: '1px solid #E5E5E5',
                            borderRadius: '17px',
                            padding: '5%'
                        }}
                    >
                        <Avatar alt="ico" sx={{ height: '70px', width: '70px' }}>
                            <MoreHorizIcon sx={{ height: '50px', width: '50px' }} />
                        </Avatar>
                    </Box>
                    <Typography component="div" variant="subtitle2" color="secondary" fontWeight="bold">
                        {viewMore === 8 ? 'View More' : 'View Less'}
                    </Typography>
                </Stack>
            </Grid>
        </Grid>
    );
}

ProductList.propTypes = {
    products: PropTypes.array,
    setProduct: PropTypes.func
};
