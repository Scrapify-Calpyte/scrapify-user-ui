import TextField from '@mui/material/TextField';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';

const validationSchema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    mobile: yup
        .string()
        .matches(/^[1-9]{1}[0-9]{9}$/, 'Invalid mobile number')
        .required('Mobile number is required'),
    email: yup.string().email().required(),
    gender: yup.string().required(),
    password: yup
        .string()
        .min(8, 'Password must be at least 8 characters')
        .max(20, 'Password must be at most 20 characters')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
            'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
        )
        .required('Password is required')
});

export default function SignUp() {
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            mobile: '',
            email: '',
            gender: '',
            password: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log(values);
        }
    });

    return (
        <>
            <div style={{ display: 'flex' }} className="col-md-12">
                <div className="col-md-6">
                    <img
                        style={{ objectFit: 'cover', width: '100%', height: window.innerHeight - 65 }}
                        src="https://cdn.shopify.com/s/files/1/0098/1362/2848/products/community_600x.jpg?v=1597415519"
                        alt="ico"
                    ></img>
                </div>
                <div
                    className="col-md-6"
                    style={{
                        padding: '5% 10%',
                        textAlign: 'center'
                    }}
                >
                    <h3>Buyer Registration</h3>
                    <form onSubmit={formik.handleSubmit} style={{ width: '100%', height: '100%', zIndex: 0 }}>
                        <div className="col-12" style={{ minHeight: '65px', paddingTop: '5px' }}>
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
                        <div className="col-12" style={{ minHeight: '65px', paddingTop: '5px' }}>
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
                        <div className="col-12" style={{ minHeight: '65px', paddingTop: '5px' }}>
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
                        <div className="col-12" style={{ minHeight: '65px', paddingTop: '5px' }}>
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
                        <div className="col-12" style={{ minHeight: '65px', paddingTop: '5px', textAlign: 'start' }}>
                            <FormControl fullWidth>
                                <FormLabel id="group-label">Gender</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="group-label"
                                    name="gender"
                                    value={formik.values.gender}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.gender && Boolean(formik.errors.gender)}
                                    size="small"
                                >
                                    <FormControlLabel value="female" control={<Radio size="small" />} label="Female" />
                                    <FormControlLabel value="male" control={<Radio size="small" />} label="Male" />
                                    <FormControlLabel value="other" control={<Radio size="small" />} label="Other" />
                                </RadioGroup>
                                <FormHelperText sx={{ color: 'red', margin: 0 }}>{formik.errors.gender}</FormHelperText>
                            </FormControl>
                        </div>
                        <div className="col-12" style={{ minHeight: '65px', paddingTop: '5px' }}>
                            <FormControl fullWidth>
                                <TextField
                                    id="password"
                                    name="password"
                                    label="Password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.password && Boolean(formik.errors.password)}
                                    size="small"
                                    fullWidth={true}
                                />
                                <FormHelperText sx={{ color: 'red', margin: 0 }}>{formik.errors.password}</FormHelperText>
                            </FormControl>
                        </div>
                        <Button type="submit">Submit</Button>
                    </form>
                </div>
            </div>
        </>
    );
}
