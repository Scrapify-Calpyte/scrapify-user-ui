import * as yup from 'yup';
import { useFormik } from 'formik';
import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '~/util/ThemeProvider';
import { useMediaQuery } from '@mui/material/index';
import { animations, easings } from 'react-animation';

import {
    TextField,
    FormControl,
    FormHelperText,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormLabel,
    Stack,
    Box,
    Avatar,
    Grid,
    Typography
} from '@mui/material/index';
import useScreenSize from '~/components/useScreenSize';
import LocationPicker from './LocationPicker';
import { useNavigate } from 'react-router-dom';

const validationSchema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    mobile: yup
        .string()
        .matches(/^[1-9]{1}[0-9]{9}$/, 'Invalid mobile number')
        .required('Mobile number is required'),
    email: yup.string().email().required(),
    gender: yup.string().required(),
    otp: yup.number().required(),
    type: yup.string().required()
});

function SignUp() {
    const { colors } = useContext(ThemeContext);
    const [page, setPage] = useState(0);
    const [selectedProducts, setSelectedProducts] = useState(0);
    const [width, height] = useScreenSize();
    const [location, setLocation] = useState(null);
    const navigate = useNavigate();
    const matches = useMediaQuery('(max-width:768px)');

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            mobile: '',
            email: '',
            gender: '',
            otp: '',
            type: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log(values);
            setPage(1);
        }
    });

    function handleLocation(coordinates) {
        console.log(coordinates);
        setLocation(coordinates);
    }

    const addressForm = useFormik({
        initialValues: {
            address: '',
            city: '',
            state: '',
            pincode: ''
        },
        onSubmit: (values) => {
            console.log(values);
            navigate('/seller/products');
        }
    });

    useEffect(() => {}, []);
    //     {
    //         id: 0,
    //         name: 'Bottles'
    //     },
    //     {
    //         id: 1,
    //         name: 'Cartons'
    //     },
    //     {
    //         id: 2,
    //         name: 'Metals'
    //     },
    //     {
    //         id: 3,
    //         name: 'Magazines'
    //     },
    //     {
    //         id: 4,
    //         name: 'e-waste'
    //     },
    //     {
    //         id: 5,
    //         name: 'Glasses'
    //     },
    //     {
    //         id: 6,
    //         name: 'Books'
    //     },
    //     {
    //         id: 4,
    //         name: 'e-waste'
    //     },
    //     {
    //         id: 5,
    //         name: 'Glasses'
    //     },
    //     {
    //         id: 6,
    //         name: 'Books'
    //     }
    // ];

    const products = [
        {
            id: 0,
            name: 'Bottles'
        },
        {
            id: 1,
            name: 'Cartons'
        },
        {
            id: 2,
            name: 'Metals'
        },
        {
            id: 3,
            name: 'Magazines'
        },
        {
            id: 4,
            name: 'e-waste'
        },
        {
            id: 5,
            name: 'Glasses'
        },
        {
            id: 6,
            name: 'Books'
        }
    ];

    return (
        <>
            <Box sx={{ flexGrow: 1, animation: animations.fadeIn }}>
                <Grid container spacing={0}>
                    <Grid
                        item
                        xs={12}
                        md={6}
                        style={{ height: height - 65, display: matches ? 'none' : 'block', animation: animations.fadeInUp }}
                    >
                        <img
                            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                            src="https://cdn.shopify.com/s/files/1/0098/1362/2848/products/community_600x.jpg?v=1597415519"
                            alt="ico"
                        ></img>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        md={6}
                        sx={{ animation: animations.fadeIn }}
                        style={page == 0 ? { height: height - 65, position: 'relative', overflow: 'auto' } : { display: 'none' }}
                    >
                        <div style={{ dimensions: '100%', padding: '5% 20%', textAlign: 'center' }}>
                            <h3 style={{ color: colors.primary }}>Scrapify</h3>
                            <div style={{ textAlign: 'start', color: colors.primary }}>
                                <p>
                                    <b>Seller Registration</b>
                                </p>
                            </div>
                            <form onSubmit={formik.handleSubmit}>
                                <div className="row col-md-12">
                                    <div className="col-md-6" style={{ minHeight: '65px', paddingTop: '5px' }}>
                                        <FormControl fullWidth>
                                            <TextField
                                                id="firstName"
                                                name="firstName"
                                                label="FirstName"
                                                value={formik.values.firstName}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                                                size="small"
                                                fullWidth={true}
                                                // variant="oulined"
                                            />
                                            <FormHelperText sx={{ color: 'red', margin: 0 }}>{formik.errors.firstName}</FormHelperText>
                                        </FormControl>
                                    </div>
                                    <div className="col-md-6" style={{ minHeight: '65px', paddingTop: '5px' }}>
                                        <FormControl fullWidth>
                                            <TextField
                                                id="lastName"
                                                name="lastName"
                                                label="LastName"
                                                value={formik.values.lastName}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                                                size="small"
                                                fullWidth={true}
                                                // variant="oulined"
                                            />
                                            <FormHelperText sx={{ color: 'red', margin: 0 }}>{formik.errors.lastName}</FormHelperText>
                                        </FormControl>
                                    </div>
                                    <div className="col-md-12" style={{ minHeight: '65px', paddingTop: '5px' }}>
                                        <FormControl fullWidth>
                                            <TextField
                                                id="mobile"
                                                name="mobile"
                                                label="Mobile"
                                                value={formik.values.mobile}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={formik.touched.mobile && Boolean(formik.errors.mobile)}
                                                size="small"
                                                fullWidth={true}
                                                // variant="oulined"
                                            />
                                            <FormHelperText sx={{ color: 'red', margin: 0 }}>{formik.errors.mobile}</FormHelperText>
                                        </FormControl>
                                    </div>
                                    <div className="col-md-12" style={{ minHeight: '65px', paddingTop: '5px' }}>
                                        <FormControl fullWidth>
                                            <TextField
                                                id="email"
                                                name="email"
                                                label="Email"
                                                value={formik.values.email}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={formik.touched.email && Boolean(formik.errors.email)}
                                                size="small"
                                                fullWidth={true}
                                                // variant="oulined"
                                            />
                                            <FormHelperText sx={{ color: 'red', margin: 0 }}>{formik.errors.email}</FormHelperText>
                                        </FormControl>
                                    </div>
                                    <div className="col-md-12" style={{ minHeight: '85px', paddingTop: '5px', textAlign: 'start' }}>
                                        <FormControl fullWidth>
                                            <FormLabel id="group-label">Gender</FormLabel>
                                            <RadioGroup
                                                row
                                                aria-labelledby="group-label"
                                                name="gender"
                                                value={formik.values.gender}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={true.toString()}
                                                // error={formik.touched.gender && Boolean(formik.errors.gender)}
                                                size="small"
                                            >
                                                <FormControlLabel value="female" control={<Radio size="small" />} label="Female" />
                                                <FormControlLabel value="male" control={<Radio size="small" />} label="Male" />
                                                <FormControlLabel value="other" control={<Radio size="small" />} label="Other" />
                                            </RadioGroup>
                                            <FormHelperText sx={{ color: 'red', margin: 0 }}>{formik.errors.gender}</FormHelperText>
                                        </FormControl>
                                    </div>
                                    <div className="col-md-12" style={{ minHeight: '65px', paddingTop: '5px' }}>
                                        <FormControl fullWidth>
                                            <TextField
                                                id="otp"
                                                name="otp"
                                                label="otp"
                                                value={formik.values.otp}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={formik.touched.otp && Boolean(formik.errors.otp)}
                                                size="small"
                                                fullWidth={true}
                                            />
                                            <FormHelperText sx={{ color: 'red', margin: 0 }}>{formik.errors.otp}</FormHelperText>
                                        </FormControl>
                                    </div>
                                </div>
                                <div className="col-md-12" style={{ minHeight: '65px', paddingTop: '5px', textAlign: 'start' }}>
                                    <FormControl fullWidth>
                                        <FormLabel id="group-label">Seller Type</FormLabel>
                                        <RadioGroup
                                            row
                                            aria-labelledby="group-label"
                                            name="type"
                                            value={formik.values.type}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            size="small"
                                        >
                                            <FormControlLabel value="1" control={<Radio size="small" />} label="City Corporation" />
                                            <FormControlLabel value="2" control={<Radio size="small" />} label="Premium Institution" />
                                            <FormControlLabel value="0" control={<Radio size="small" />} label="Other" />
                                        </RadioGroup>
                                        <FormHelperText sx={{ color: 'red', margin: 0 }}>{formik.errors.type}</FormHelperText>
                                    </FormControl>
                                </div>

                                <button type="submit" className="btn1" onClick={() => setPage(1)}>
                                    Next
                                </button>
                            </form>
                        </div>
                    </Grid>
                    <Grid
                        sx={{ animation: animations.fadeIn }}
                        item
                        xs={12}
                        md={6}
                        style={page === 1 ? { height: height - 65, position: 'relative' } : { display: 'none' }}
                    >
                        <div style={{ dimensions: '100%', padding: '5% 2%', textAlign: 'center' }}>
                            <h3 style={{ color: colors.primary }}>Scrapify</h3>
                            <div style={{ textAlign: 'start', color: colors.primary }}>
                                <p>
                                    <b>Pick Your Location</b>
                                </p>
                            </div>
                            <LocationPicker height={height - 400} handleLocation={handleLocation} />
                            <button
                                onClick={() => {
                                    setPage(2);
                                }}
                                style={{ maxWidth: '50%', marginTop: '10px' }}
                                type="button"
                                className="btn1"
                            >
                                Next
                            </button>
                            <br></br>
                            <button
                                type="button"
                                style={{ backgroundColor: '#f7f7f7', color: '#013f56', maxWidth: '50%' }}
                                className="btn1"
                                onClick={() => {
                                    setLocation(null);
                                    setPage(2);
                                }}
                            >
                                I will do it later
                            </button>
                        </div>
                    </Grid>
                    <Grid
                        sx={{ animation: animations.fadeIn }}
                        item
                        xs={12}
                        md={6}
                        style={page === 2 ? { height: height - 65, position: 'relative' } : { display: 'none' }}
                    >
                        <div style={{ dimensions: '100%', padding: '10% 20%', textAlign: 'center' }}>
                            <h3 style={{ color: colors.primary }}>Scrapify</h3>
                            <div style={{ textAlign: 'start', color: colors.primary }}>
                                <p>
                                    <b>Buisness Address</b>
                                </p>
                            </div>
                            <form onSubmit={addressForm.handleSubmit}>
                                <div style={{ minHeight: '65px', paddingTop: '5px' }}>
                                    <FormControl fullWidth>
                                        <TextField
                                            id="address"
                                            name="address"
                                            label="Address"
                                            value={addressForm.values.address}
                                            onChange={addressForm.handleChange}
                                            onBlur={addressForm.handleBlur}
                                            error={addressForm.touched.address && Boolean(addressForm.errors.address)}
                                            size="small"
                                            fullWidth={true}
                                        />
                                        <FormHelperText sx={{ color: 'red', margin: 0 }}>{addressForm.errors.address}</FormHelperText>
                                    </FormControl>
                                </div>
                                <div style={{ minHeight: '65px', paddingTop: '5px' }}>
                                    <FormControl fullWidth>
                                        <TextField
                                            id="city"
                                            name="city"
                                            label="City"
                                            value={addressForm.values.city}
                                            onChange={addressForm.handleChange}
                                            onBlur={addressForm.handleBlur}
                                            error={addressForm.touched.city && Boolean(addressForm.errors.city)}
                                            size="small"
                                            fullWidth={true}
                                        />
                                        <FormHelperText sx={{ color: 'red', margin: 0 }}>{addressForm.errors.city}</FormHelperText>
                                    </FormControl>
                                </div>
                                <div style={{ minHeight: '65px', paddingTop: '5px' }}>
                                    <FormControl fullWidth>
                                        <TextField
                                            id="state"
                                            name="state"
                                            label="State"
                                            value={addressForm.values.state}
                                            onChange={addressForm.handleChange}
                                            onBlur={addressForm.handleBlur}
                                            error={addressForm.touched.state && Boolean(addressForm.errors.state)}
                                            size="small"
                                            fullWidth={true}
                                        />
                                        <FormHelperText sx={{ color: 'red', margin: 0 }}>{addressForm.errors.state}</FormHelperText>
                                    </FormControl>
                                </div>
                                <div style={{ minHeight: '65px', paddingTop: '5px' }}>
                                    <FormControl fullWidth>
                                        <TextField
                                            id="pincode"
                                            name="pincode"
                                            label="Pincode"
                                            value={addressForm.values.pincode}
                                            onChange={addressForm.handleChange}
                                            onBlur={addressForm.handleBlur}
                                            error={addressForm.touched.pincode && Boolean(addressForm.errors.pincode)}
                                            size="small"
                                            fullWidth={true}
                                        />
                                        <FormHelperText sx={{ color: 'red', margin: 0 }}>{addressForm.errors.pincode}</FormHelperText>
                                    </FormControl>
                                </div>
                                <button type="submit" className="btn1">
                                    Next
                                </button>
                            </form>
                        </div>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}
export default SignUp;
