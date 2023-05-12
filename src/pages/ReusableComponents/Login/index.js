import { useState, useContext } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { FormControl, FormHelperText, IconButton, Stack, Tooltip, Typography } from '@mui/material/index';
import ToggleButton from '@mui/material/ToggleButton';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import GoogleIcon from '@mui/icons-material/Google';
import OtpInput from 'react-otp-input';
import { ToastContainer, toast } from 'react-toastify';
import CloseIcon from '@mui/icons-material/Close';
import { useAxios } from '~/components/useAxios';
import { AuthContext } from '~/context/AuthProvider/index';
import Cookies from 'js-cookie';
import JwtDecode from '~/util/JwtDecode';
import { ApiConfig } from '~/components/ApiConfig';
import { MyToggleButtonGroup, ThemeButton, ThemeButton2 } from '~/util/MyComponents';

export default function Login({ open, close, switchToRegister }) {
    const [toggle, setToggle] = useState('seller');
    const [step, setStep] = useState(0);
    const axios = useAxios();
    const { authData, setAuthData } = useContext(AuthContext);

    const [formValues, setFormValues] = useState({
        phone: '',
        otp: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues((prevState) => ({ ...prevState, [name]: value }));
    };

    function handleToggle(event, value) {
        if (value) {
            setFormValues({
                phone: '',
                otp: ''
            });
            setToggle(value);
            setStep(0);
        }
    }

    function handleOTP() {
        if (step === 0) {
            if (formValues.phone.length === 0) {
                toast.error('🧐 Phone Number is Required!');
            } else {
                const pattern = /^[1-9]{1}[0-9]{9}$/;
                const isMatch = pattern.test(formValues.phone);
                if (isMatch) {
                    toast.success('😉 OTP sent !');
                    setStep(1);
                } else toast.error('🧐 Invalid Phone Number!');
            }
        } else if (step === 1) {
            console.log(formValues);
            if (formValues.otp.length === 6) {
                console.log(formValues);
                login();
            } else toast.error('🧐 Invalid OTP !');
        }
    }

    function login() {
        let obj = {
            userName: formValues.phone,
            password: formValues.otp
        };
        axios
            .post(ApiConfig.getAccessToken, obj)
            .then((res) => {
                if (res?.data && res?.data?.auth && res?.data?.token) {
                    Cookies.set('token', res?.data?.auth);
                    Cookies.set('refreshToken', res?.data?.token);
                    const { given_name, email } = JwtDecode(res?.data?.auth);
                    setAuthData({
                        userName: given_name,
                        email: email
                    });
                    toast.success('😉 Login Successfully !');
                }
                close();
            })
            .catch((err) => toast.error(err?.message));
    }

    const handleClose = () => {
        close();
    };

    return (
        <>
            <Dialog
                BackdropProps={{
                    invisible: true
                }}
                open={open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth="xs"
                // PaperProps={{
                //     style: {
                //         width: '492px'
                //     }
                // }}
                fullWidth
            >
                <DialogTitle id="alert-dialog-title">
                    <Stack flexDirection="row" justifyContent="end">
                        <IconButton size="small" onClick={handleClose}>
                            <Tooltip title="close">
                                <CloseIcon sx={{ fontSize: '1rem' }} />
                            </Tooltip>
                        </IconButton>
                    </Stack>
                    <Stack justifyContent="center" alignItems="center" spacing={1}>
                        <Typography
                            noWrap
                            component="div"
                            color="primary"
                            sx={{ fontSize: '2rem', fontWeight: 'bold', overflow: 'hidden' }}
                        >
                            Scrapify
                        </Typography>
                        <MyToggleButtonGroup
                            sx={{ border: 'solid 2px #134f61' }}
                            value={toggle}
                            onChange={handleToggle}
                            exclusive
                            aria-label="Platform"
                        >
                            <ToggleButton size="small" value="seller" sx={{ fontSize: '0.7rem' }}>
                                Seller
                            </ToggleButton>
                            <ToggleButton size="small" value="buyer" sx={{ fontSize: '0.7rem' }}>
                                Buyer
                            </ToggleButton>
                        </MyToggleButtonGroup>
                    </Stack>
                </DialogTitle>
                <DialogContent sx={{ alignItems: 'center', textAlign: 'center' }} fullWidth>
                    {
                        {
                            0: (
                                <>
                                    <FormControl fullWidth>
                                        <FormHelperText style={{ margin: '0' }} className="label-text">
                                            Phone Number
                                        </FormHelperText>
                                        <TextField
                                            id="phone"
                                            name="phone"
                                            inputProps={{ pattern: '^[1-9]{1}[0-9]{9}$' }}
                                            value={formValues.phone}
                                            required
                                            onChange={handleChange}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">+91-</InputAdornment>
                                            }}
                                            margin="normal"
                                            fullWidth
                                            size="small"
                                            style={{ margin: '0', padding: '0' }}
                                        />
                                    </FormControl>
                                    <br></br>
                                    <br></br>
                                    <Stack spacing={1}>
                                        <ThemeButton sx={{ width: '100%' }} type="submit" varient="contained" onClick={handleOTP}>
                                            GET OTP
                                        </ThemeButton>
                                        <ThemeButton2 sx={{ width: '100%' }} varient="contained">
                                            Login With&nbsp;
                                            <GoogleIcon sx={{ height: '0.7rem' }} />
                                        </ThemeButton2>
                                        <Stack sx={{ alignItems: 'center' }}>
                                            <Typography
                                                onClick={switchToRegister}
                                                component={Button}
                                                varient="p"
                                                color="secondary"
                                                sx={{ textTransform: 'none', fontSize: '0.7rem' }}
                                            >
                                                Don't have an account ? <b>Register Here</b>
                                            </Typography>
                                        </Stack>
                                    </Stack>
                                </>
                            ),
                            1: (
                                <>
                                    <FormControl style={{ alignItems: 'center' }}>
                                        <Typography id="group-label" component="div" varient="p" color="secondary" fontSize="0.7rem">
                                            Verication Code is Sent to <b>+91-{formValues.phone}</b>
                                        </Typography>
                                        <br></br>
                                        <OtpInput
                                            inputStyle={{
                                                width: '1.5rem',
                                                height: '1.5rem',
                                                marginRight: '0.5rem',
                                                fontSize: '1rem',
                                                border: 'none',
                                                boxShadow: 'none',
                                                border: '0.5px solid grey'
                                            }}
                                            id="otp"
                                            name="otp"
                                            value={formValues.otp}
                                            onChange={(e) => setFormValues((prevState) => ({ ...prevState, otp: e }))}
                                            onChangeRegex={/^([0-9]{0,})$/}
                                            numInputs={6}
                                            inputType="tel"
                                            separator={<span>-</span>}
                                            renderInput={(props) => <input {...props} />}
                                        />
                                    </FormControl>
                                    <br></br>
                                    <br></br>
                                    <Stack spacing={1}>
                                        <ThemeButton2
                                            type="submit"
                                            sx={{ width: '100%' }}
                                            varient="contained"
                                            onClick={() => toast.success('OTP is resended !')}
                                        >
                                            Resend Code
                                        </ThemeButton2>
                                        <ThemeButton sx={{ width: '100%' }} onClick={handleOTP} varient="contained">
                                            Verify
                                        </ThemeButton>
                                        <Stack sx={{ alignItems: 'center' }}>
                                            <Typography
                                                component={Button}
                                                onClick={switchToRegister}
                                                varient="p"
                                                color="secondary"
                                                sx={{ textTransform: 'none', fontSize: '0.7rem' }}
                                            >
                                                Don't have an account ? <b>&nbsp;Register Here</b>
                                            </Typography>
                                        </Stack>
                                    </Stack>
                                </>
                            )
                        }[step]
                    }
                </DialogContent>
            </Dialog>
            <ToastContainer position="top-center" autoClose={1000} />
        </>
    );
}
