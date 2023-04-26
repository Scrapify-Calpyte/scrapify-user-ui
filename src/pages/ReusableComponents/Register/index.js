import { useEffect, useState, useContext } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { Box, FormControl, IconButton, Stack, Tooltip, Typography } from '@mui/material/index';
import { useMediaQuery } from '@mui/material/index';
import { ThemeContext } from '~/util/ThemeProvider';
import { styled } from '@mui/material/styles';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import GoogleIcon from '@mui/icons-material/Google';
import OtpInput from 'react-otp-input';
import { ToastContainer, toast } from 'react-toastify';
import Badge from '@mui/material/Badge';
import CloseIcon from '@mui/icons-material/Close';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';
import StorefrontIcon from '@mui/icons-material/Storefront';

function Register({ open, setOpen }) {
    const { colors, fonts } = useContext(ThemeContext);
    const [userType, setUserType] = useState('seller');
    const [step, setStep] = useState(0);
    const [formValues, setFormValues] = useState({
        name: '',
        buisnessType: '',
        email: '',
        phone: '',
        otp: '',
        address: ''
    });

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        const { name, value } = event;
        setFormValues((prevState) => ({ ...prevState, [name]: value }));
    };

    const ThemeButton = styled(Button)({
        backgroundColor: colors.primary,
        color: 'white',
        borderRadius: '30px',
        width: '100%',
        height: 'fit-content',
        border: 'solid 1px' + colors.primary,
        '&:hover': {
            backgroundColor: colors.primary // new background color on hover
        }
    });

    const ThemeButton2 = styled(Button)({
        backgroundColor: 'white',
        color: colors.primary,
        borderRadius: '30px',
        border: 'solid 1px' + colors.primary,
        width: '100%',
        height: 'fit-content',
        '&:hover': {
            backgroundColor: 'white' // new background color on hover
        }
    });

    const handleForward = () => {
        setStep(step + 1);
        console.log(formValues);
    };
    const handleBackward = () => {
        setStep(step - 1);
    };

    return (
        <>
            <Dialog
                BackdropProps={{
                    invisible: false
                }}
                maxWidth="xs"
                open={open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
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
                            sx={{ color: colors.secondary, fontSize: '2rem', fontWeight: 'bold', overflow: 'hidden' }}
                        >
                            Scrapify
                        </Typography>
                    </Stack>
                </DialogTitle>
                <DialogContent sx={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Grid container spacing={1}>
                        {
                            {
                                0: (
                                    <>
                                        <Grid item xs={6} sx={{ justifyContent: 'center' }} onClick={() => setUserType('seller')}>
                                            <Stack
                                                sx={{
                                                    color: userType === 'seller' ? colors.secondary : colors.primary,
                                                    border: userType === 'seller' ? 'solid 2px' + colors.secondary : 'solid 2px #EAECEE',
                                                    padding: '10px 25px',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    borderRadius: '10px'
                                                }}
                                            >
                                                <IconButton sx={{ textAlign: 'center' }}>
                                                    <StorefrontIcon
                                                        sx={{
                                                            fontSize: '2rem',
                                                            color: userType === 'seller' ? colors.secondary : colors.primary
                                                        }}
                                                    />
                                                </IconButton>
                                                <Typography component="div" varient="h6">
                                                    Seller
                                                </Typography>
                                            </Stack>
                                        </Grid>
                                        <Grid item xs={6} sx={{ justifyContent: 'center' }} onClick={() => setUserType('buyer')}>
                                            <Stack
                                                sx={{
                                                    color: userType === 'buyer' ? colors.secondary : colors.primary,
                                                    border: userType === 'buyer' ? 'solid 2px' + colors.secondary : 'solid 2px #EAECEE',
                                                    padding: '10px 25px',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    borderRadius: '10px'
                                                }}
                                            >
                                                <IconButton>
                                                    <PersonIcon
                                                        sx={{
                                                            fontSize: '2rem',
                                                            color: userType === 'buyer' ? colors.secondary : colors.primary
                                                        }}
                                                    />
                                                </IconButton>
                                                <Typography component="div" varient="h6">
                                                    Buyer
                                                </Typography>
                                            </Stack>
                                        </Grid>
                                    </>
                                ),
                                1: (
                                    <>
                                        <Grid item xs={12} sx={{ justifyContent: 'center' }} onClick={() => setUserType('buyer')}>
                                            <TextField
                                                id="name"
                                                name="name"
                                                label="Name"
                                                value={formValues.name}
                                                required
                                                onChange={(e) => handleChange(e.target)}
                                                margin="normal"
                                                fullWidth
                                                size="small"
                                            />
                                        </Grid>
                                    </>
                                ),
                                2: (
                                    <>
                                        <Grid item xs={12} sx={{ justifyContent: 'center' }} onClick={() => setUserType('buyer')}>
                                            <p> works</p>
                                        </Grid>
                                    </>
                                ),
                                3: (
                                    <>
                                        <Grid item xs={12} sx={{ justifyContent: 'center' }} onClick={() => setUserType('buyer')}>
                                            <TextField
                                                id="email"
                                                name="email"
                                                label="Email"
                                                value={formValues.email}
                                                required
                                                onChange={(e) => handleChange(e.target)}
                                                margin="normal"
                                                fullWidth
                                                size="small"
                                            />
                                        </Grid>
                                    </>
                                ),
                                4: (
                                    <>
                                        <Grid item xs={12} sx={{ justifyContent: 'center' }} onClick={() => setUserType('buyer')}>
                                            <TextField
                                                id="phone"
                                                name="phone"
                                                label="Phone Number"
                                                inputProps={{ pattern: '^[1-9]{1}[0-9]{9}$' }}
                                                value={formValues.phone}
                                                required
                                                onChange={(e) => handleChange(e.target)}
                                                InputProps={{
                                                    startAdornment: <InputAdornment position="start">+91-</InputAdornment>
                                                }}
                                                margin="normal"
                                                fullWidth
                                                size="small"
                                            />
                                        </Grid>
                                    </>
                                ),
                                5: (
                                    <>
                                        <Grid
                                            item
                                            xs={12}
                                            sx={{ justifyContent: 'center', alignItems: 'center' }}
                                            onClick={() => setUserType('buyer')}
                                        >
                                            <Stack sx={{ justifyContent: 'center', alignItems: 'center' }}>
                                                <Typography
                                                    id="group-label"
                                                    component="div"
                                                    varient="p"
                                                    sx={{ fontSize: '0.7rem', color: colors.primary }}
                                                >
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
                                                        // borderRadius: '4px',
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
                                                <Typography
                                                    component={Button}
                                                    // onClick={}
                                                    varient="p"
                                                    sx={{ textTransform: 'none', fontSize: '0.7rem', color: colors.primary }}
                                                >
                                                    Resend Code
                                                </Typography>
                                            </Stack>
                                        </Grid>
                                    </>
                                )
                            }[step]
                        }
                        <Grid item xs={6}>
                            <ThemeButton2 varient="contained" onClick={handleBackward}>
                                Back
                            </ThemeButton2>
                        </Grid>
                        <Grid item xs={6}>
                            <ThemeButton varient="contained" onClick={handleForward}>
                                Next
                            </ThemeButton>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
            <ToastContainer position="top-center" autoClose={1000} />
        </>
    );
}
export default Register;
