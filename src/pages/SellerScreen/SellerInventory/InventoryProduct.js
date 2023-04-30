import {
    Grid,
    Stack,
    Box,
    Typography,
    Avatar,
    FormControl,
    TextField,
    IconButton,
    InputAdornment,
    FormHelperText,
    Divider,
    Tooltip,
    useMediaQuery
} from '@mui/material/index';
import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '~/util/ThemeProvider';
import img from '~/assets/images/product.png';
import ImageUploading from 'react-images-uploading';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Badge from '@mui/material/Badge';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { styled } from '@mui/material/styles';

function InventoryProduct({ inventoryData, onFormDataChange, index, formData }) {
    const { colors, fonts } = useContext(ThemeContext);
    const matches = useMediaQuery('(max-width:768px)');

    const maxNumber = 1;

    const onChangeImage1 = (imageList, addUpdateIndex) => {
        // const selectedImageBlob = imageList[addUpdateIndex].file;
        const tformData = { ...formData[index] };
        tformData['image1'] = imageList;
        onFormDataChange(index, tformData);
    };

    const onChangeImage2 = (imageList, addUpdateIndex) => {
        // const selectedImageBlob = imageList[addUpdateIndex].file;
        const tformData = { ...formData[index] };
        tformData['image2'] = imageList;
        onFormDataChange(index, tformData);
    };

    useEffect(() => {
        let tformData = {
            availableQty: inventoryData?.availableQty,
            expectedPrice: inventoryData?.expectedPrice,
            marketPrice: inventoryData?.marketPrice,
            image1: [],
            image2: []
        };
        onFormDataChange(index, tformData);
    }, []);

    function handleChange1(event) {
        const tformData = { ...formData[index] };
        const { name, value } = event;
        tformData[name] = value;
        onFormDataChange(index, tformData);
    }

    return (
        <>
            <Grid container spacing={2} alignItems="center">
                <Grid item md={12} lg={3} xs={12} sm={12}>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Avatar varient="square" src={img} sx={{ height: 65, width: 65 }}></Avatar>
                        <Stack>
                            <Typography fontSize="medium">{inventoryData?.product}</Typography>
                            <Typography fontSize="small">Metals</Typography>
                            <Typography fontSize="small">ExpAmt : $200</Typography>
                        </Stack>
                    </Box>
                </Grid>
                <Grid item md={12} lg={6} xs={12} sm={12}>
                    <Grid container spacing={1}>
                        <Grid item sm={12} md={4} lg={4} xs={12}>
                            <FormControl fullWidth>
                                <FormHelperText sx={{ margin: 0 }}>Available Quantity</FormHelperText>
                                <TextField
                                    id="availableQty"
                                    name="availableQty"
                                    onChange={(e) => handleChange1(e.target)}
                                    size="small"
                                    value={formData[index]?.availableQty ? formData[index]?.availableQty : ''}
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
                        </Grid>
                        <Grid item sm={6} md={4} lg={4} xs={6}>
                            <FormControl fullWidth>
                                <FormHelperText sx={{ margin: 0 }}>Market Price/kg</FormHelperText>
                                <TextField
                                    id="marketPrice"
                                    name="marketPrice"
                                    disabled
                                    value={formData[index]?.marketPrice ? formData[index]?.marketPrice : ''}
                                    size="small"
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">₹</InputAdornment>
                                    }}
                                    fullWidth={true}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item sm={6} md={4} lg={4} xs={6}>
                            <FormControl fullWidth>
                                <FormHelperText sx={{ margin: 0 }}>Expected Price/kg</FormHelperText>
                                <TextField
                                    id="expectedPrice"
                                    name="expectedPrice"
                                    value={formData[index]?.expectedPrice ? formData[index]?.expectedPrice : ''}
                                    size="small"
                                    onChange={(e) => handleChange1(e.target)}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">₹</InputAdornment>
                                    }}
                                    fullWidth={true}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item md={9} lg={2} xs={10} sm={10}>
                    <ImageUploading
                        value={formData[index]?.image1 ? formData[index]?.image1 : []}
                        onChange={onChangeImage1}
                        maxNumber={maxNumber}
                        dataURLKey="data_url"
                    >
                        {({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
                            <>
                                {imageList.length > 0 ? (
                                    imageList.map((image, index) => (
                                        <Badge
                                            key={index}
                                            badgeContent={
                                                <IconButton onClick={() => onImageRemoveAll()}>
                                                    <CloseOutlinedIcon sx={{ width: '15px', height: '15px' }} />
                                                </IconButton>
                                            }
                                        >
                                            <Avatar
                                                sx={{ height: matches ? '10vh' : '5vh', width: matches ? '10vh' : '5vh' }}
                                                variant="square"
                                                src={image['data_url']}
                                            ></Avatar>
                                        </Badge>
                                    ))
                                ) : (
                                    <Tooltip arrow title="Upload Image">
                                        <IconButton
                                            style={isDragging ? { color: 'red' } : undefined}
                                            onClick={onImageUpload}
                                            {...dragProps}
                                        >
                                            <PhotoCameraIcon sx={{ height: matches ? '10vh' : '3vh', width: matches ? '10vh' : '3vh' }} />
                                        </IconButton>
                                    </Tooltip>
                                )}
                            </>
                        )}
                    </ImageUploading>
                    &nbsp; &nbsp;
                    <ImageUploading
                        value={formData[index]?.image2 ? formData[index]?.image2 : []}
                        onChange={onChangeImage2}
                        maxNumber={maxNumber}
                        dataURLKey="data_url"
                    >
                        {({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
                            <>
                                {imageList.length > 0 ? (
                                    imageList.map((image, index) => (
                                        <Badge
                                            key={index}
                                            badgeContent={
                                                <IconButton onClick={() => onImageRemoveAll()}>
                                                    <CloseOutlinedIcon sx={{ width: '15px', height: '15px' }} />
                                                </IconButton>
                                            }
                                        >
                                            <Avatar
                                                sx={{ height: matches ? '10vh' : '5vh', width: matches ? '10vh' : '5vh' }}
                                                variant="square"
                                                src={image['data_url']}
                                            ></Avatar>
                                        </Badge>
                                    ))
                                ) : (
                                    <Tooltip arrow title="Upload Image">
                                        <IconButton
                                            style={isDragging ? { color: 'red' } : undefined}
                                            onClick={onImageUpload}
                                            {...dragProps}
                                        >
                                            <PhotoCameraIcon sx={{ height: matches ? '10vh' : '3vh', width: matches ? '10vh' : '3vh' }} />
                                        </IconButton>
                                    </Tooltip>
                                )}
                            </>
                        )}
                    </ImageUploading>
                </Grid>
                <Grid item md={3} lg={1} xs={2} sm={2} sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
                    <Tooltip arrow title="Delete">
                        <IconButton>
                            <DeleteOutlinedIcon sx={{ color: '#D98880' }} />
                        </IconButton>
                    </Tooltip>
                </Grid>
            </Grid>
            <Divider />
        </>
    );
}

export default InventoryProduct;
