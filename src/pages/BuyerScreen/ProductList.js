import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import img from '/src/assets/images/product.png';
import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

export default function ProductList({ products }) {
    const [selectedProduct, setSelectedProduct] = useState([]);
    const [productLength, setProductLength] = useState(5);

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: '#f7f7f7',
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        boxShadow: 'none'
    }));

    const handleSelectedProduct = (index) => {
        setSelectedProduct((oldArray) => {
            if (oldArray.includes(index)) {
                return [...oldArray.filter((e) => e != index)];
            } else {
                return [...oldArray, index];
            }
        });
    };

    return (
        <Box sx={{ flexGrow: 1, backgroundColor: '#f7f7f7', padding: 0 }}>
            <Grid container spacing={0}>
                {products.slice(0, productLength).map((e, index) => {
                    return (
                        <Grid item xs={4} key={index}>
                            <Item key={index}>
                                <IconButton
                                    onClick={() => handleSelectedProduct(index)}
                                    aria-haspopup="true"
                                    sx={selectedProduct.includes(index) ? { backgroundColor: '#A3E4D7' } : { backgroundColor: 'none' }}
                                >
                                    <Avatar alt="img" src={img} sx={{ width: '60px', height: '60px' }} />
                                </IconButton>
                                {e?.name}
                            </Item>
                        </Grid>
                    );
                })}
                {products?.length > 5 ? (
                    <Grid item xs={4}>
                        <Item>
                            <IconButton
                                onClick={() => {
                                    setProductLength(productLength == 5 ? products?.length : 5);
                                }}
                                aria-haspopup="true"
                            >
                                <Avatar
                                    sx={{
                                        width: '60px',
                                        height: '60px',
                                        bgcolor: 'white'
                                    }}
                                >
                                    {productLength == 5 ? (
                                        <div style={{ color: '#013f56' }}>{'+ ' + (products.length >= 5 ? products.length - 5 : 0)}</div>
                                    ) : (
                                        <div style={{ fontSize: '10px', fontWeight: 'bold', color: '#013f56' }}>o o o</div>
                                    )}
                                </Avatar>
                            </IconButton>
                            {productLength == 5 ? 'More' : 'Less'}
                        </Item>
                    </Grid>
                ) : (
                    <></>
                )}
            </Grid>
        </Box>
    );
}
