import { useEffect, useState, useContext } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { FormControl, IconButton, Stack, Tooltip, Typography } from '@mui/material/index';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import OtpInput from 'react-otp-input';
import { toast } from 'react-toastify';
import Badge from '@mui/material/Badge';
import CloseIcon from '@mui/icons-material/Close';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';
import StorefrontIcon from '@mui/icons-material/Storefront';
import LocationPicker from '~/pages/ReusableComponents/LocationPicker';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { useAxios } from '~/components/useAxios';
import SelectedProducts from './SelectedProducts';
import FormHelperText from '@mui/material/FormHelperText';
import { AuthContext } from '~/context/AuthProvider/index';
import ProductSelection from './ProductSelection';
import Cookies from 'js-cookie';
import JwtDecode from '~/util/JwtDecode';
import { ApiConfig } from '~/components/ApiConfig';
import { ThemeButton, ThemeButton2 } from '~/util/MyComponents';
import ImageUploading from 'react-images-uploading';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import { useTheme } from '@mui/material/styles';

// import keycloak from '~/keycloak';

function Register({ open, close, switchToLogin }) {
    const [step, setStep] = useState(0);
    const [checkedValues, setCheckedValues] = useState([]);
    const axios = useAxios();
    const [categories, setCategories] = useState([]);
    const [formValues, setFormValues] = useState({
        name: '',
        buisnessType: '',
        email: '',
        phone: '',
        otp: '',
        address: '',
        userType: 'seller',
        image: []
    });
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [isTouched, setIsTouched] = useState(false);
    const { authData, setAuthData } = useContext(AuthContext);
    const [location, setLocation] = useState(null);
    const { palette } = useTheme();
    var userId = null;

    function getProducts() {
        axios
            .get(ApiConfig.getAllCategories)
            .then((res) => {
                if (res?.data && res?.data?.length > 0) {
                    setCategories(res?.data.filter((obj) => obj?.id != null));
                }
            })
            .catch((err) => toast.error('Error: ' + err.message));
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
            },
            (error) => {
                setLocation({
                    lat: 13.0827,
                    lng: 80.2707
                });
                console.log(error);
                alert('Location is not enabled and default location is chennai');
            }
        );
    }, []);

    const handleClose = () => {
        close();
    };

    const handleChange = (event) => {
        const { name, value } = event;
        setFormValues((prevState) => ({ ...prevState, [name]: value }));
    };

    const HelperText = styled(FormHelperText)({
        color: 'red'
    });

    const handleForward = async () => {
        setIsTouched(true);
        if (step === 1) {
            if (formValues.name.trim() === '') {
                toast.error('Name is Required');
            } else {
                setStep(step + 1);
                setIsTouched(false);
            }
        } else if (step === 2) {
            if (formValues.buisnessType.trim() === '') toast.error('Buisness type is Required');
            else {
                setStep(step + 1);
                setIsTouched(false);
            }
        } else if (step === 3) {
            if (formValues.email.trim() !== '') {
                if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formValues.email)) setStep(step + 1);
                else toast.error('Enter a valid Email');
            } else {
                setStep(step + 1);
                setIsTouched(false);
            }
        } else if (step === 4) {
            if (formValues.phone.trim() === '') toast.error('Phone Number is Required');
            else if (/^[1-9]{1}[0-9]{9}$/.test(formValues.phone)) {
                setStep(step + 1);
                setIsTouched(false);
            } else toast.error('Enter a valid phone number');
        } else if (step === 5) {
            if (formValues.otp.trim() === '' || formValues.otp.length !== 6) {
                toast.error('Enter OTP');
            } else {
                // setStep(step + 1);
                // setIsTouched(false);
                saveConsumer();
                console.log(formValues);
            }
        } else if (step === 6) {
            console.log(location);
            getProducts();
            if (formValues.address.trim() === '') toast.error('Address Is Required');
            else {
                setStep(step + 1);
                setIsTouched(false);
            }
        } else if (step === 7) {
            if (checkedValues?.length > 0 && checkedValues?.length <= 9) {
                setStep(step + 1);
                setIsTouched(false);
                getSelectedProducts();
            } else toast.error('Please selected atleast 1 product but should not exceed 9');
        } else if (step === 8) {
            await saveAddress();
            saveProducts();
            toast.success('Registered Successfully !');
            handleClose();
        } else {
            setStep(step + 1);
            setIsTouched(false);
        }
    };

    function saveConsumer() {
        const formData = new FormData();
        let data = {
            firstName: formValues?.name,
            lastName: formValues?.name,
            mobile: formValues?.phone,
            email: formValues?.email,
            role: formValues?.userType,
            password: formValues?.otp
        };
        formData.append('file', formValues.image[0]?.file ? formValues.image[0]?.file : null);
        formData.append('request', JSON.stringify(data));
        axios
            .post(ApiConfig.saveConsumer, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then((res) => {
                userId = res?.data?.id;
                login(res?.data);
            })
            .catch((err) => toast.error(err?.message));
    }

    function login(data) {
        let obj = {
            userName: data?.mobile,
            password: data?.password
        };
        axios
            .post(ApiConfig.getAccessToken, obj)
            .then((res) => {
                if (res?.data?.auth && res?.data?.token) {
                    Cookies.set('token', res?.data?.auth);
                    Cookies.set('refreshToken', res?.data?.token);
                    const { given_name, email } = JwtDecode(res?.data?.auth);
                    setAuthData({
                        userName: given_name,
                        email: email
                    });
                    setStep(step + 1);
                }
                setIsTouched(false);
            })
            .catch((err) => toast.error(err?.message));
    }

    async function saveAddress() {
        let addressData = {
            id: userId,
            addresses: [
                {
                    name: formValues.address,
                    latitude: location.lat,
                    longitude: location.lng,
                    geocode: null
                }
            ]
        };
        await axios
            .put(ApiConfig.saveConsumerAddress, addressData)
            .then((res) => {
                toast.success('Address Added');
            })
            .catch((err) => toast.error(err.message));
    }

    async function saveProducts() {
        let products = [];
        selectedProducts.forEach((e) => {
            products = [...products, ...e.products];
        });
        let productsData = {
            id: userId,
            products: products
        };
        await axios
            .put(ApiConfig.saveConsumerProducts, productsData)
            .then((res) => {
                toast.success('Products Added');
            })
            .catch((err) => toast.error(err.message));
    }

    function getSelectedProducts() {
        let arr = [];
        categories.forEach((category) => {
            let products = [...category?.products];
            let obj = {
                id: category?.id,
                name: category?.name,
                icon: category?.icon,
                products: products.filter((product) => checkedValues.includes(product?.id))
            };
            arr.push(obj);
        });
        setSelectedProducts(arr.filter((e) => e?.products?.length > 0));
    }

    const handleBackward = () => {
        if (step !== 0) {
            setStep(step - 1);
        }
    };

    const buisnessTypes = [
        {
            id: '0',
            name: 'organization'
        },
        {
            id: '1',
            name: 'indivudual'
        }
    ];

    const onChangeImage = (imageList, addUpdateIndex) => {
        // const selectedImageBlob = imageList[addUpdateIndex].file;
        setFormValues((prev) => ({ ...prev, ['image']: imageList }));
    };

    return (
        <>
            <Dialog
                BackdropProps={{
                    invisible: false
                }}
                maxWidth="xs"
                fullWidth
                sx={{ background: '#004159', opacity: '0.9' }}
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
                            color="primary"
                            sx={{ fontSize: '2rem', fontWeight: 'bold', overflow: 'hidden' }}
                        >
                            Scrapify
                        </Typography>
                    </Stack>
                </DialogTitle>
                <DialogContent sx={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Grid container spacing={1} rowSpacing={1}>
                        {
                            {
                                0: (
                                    <>
                                        <Grid
                                            item
                                            xs={6}
                                            sx={{ justifyContent: 'center' }}
                                            onClick={() => handleChange({ name: 'userType', value: 'seller' })}
                                        >
                                            <Stack
                                                sx={{
                                                    color:
                                                        formValues.userType === 'seller'
                                                            ? palette?.primary?.main
                                                            : palette?.secondary?.main,
                                                    border:
                                                        formValues.userType === 'seller'
                                                            ? 'solid 2px' + palette?.primary?.main
                                                            : 'solid 2px' + palette?.secondary?.main,
                                                    padding: '10px 25px',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    borderRadius: '10px'
                                                }}
                                            >
                                                <IconButton sx={{ textAlign: 'center' }}>
                                                    <StorefrontIcon
                                                        color={formValues.userType === 'seller' ? 'primary' : 'secondary'}
                                                        sx={{ fontSize: '2rem' }}
                                                    />
                                                </IconButton>
                                                <Typography component="div" varient="h6">
                                                    Seller
                                                </Typography>
                                            </Stack>
                                        </Grid>
                                        <Grid
                                            item
                                            xs={6}
                                            sx={{ justifyContent: 'center' }}
                                            onClick={() => handleChange({ name: 'userType', value: 'buyer' })}
                                        >
                                            <Stack
                                                sx={{
                                                    color:
                                                        formValues.userType === 'buyer' ? palette?.primary?.main : palette?.secondary?.main,
                                                    border:
                                                        formValues.userType === 'buyer'
                                                            ? 'solid 2px' + palette?.primary?.main
                                                            : 'solid 2px ' + palette?.secondary?.main,
                                                    padding: '10px 25px',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    borderRadius: '10px'
                                                }}
                                            >
                                                <IconButton>
                                                    <PersonIcon
                                                        color={formValues.userType === 'buyer' ? 'primary' : 'secondary'}
                                                        sx={{
                                                            fontSize: '2rem'
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
                                        <Grid item xs={12} sx={{ textAlign: 'center' }}>
                                            <br></br>
                                            <ImageUploading
                                                value={formValues?.image ? formValues?.image : []}
                                                onChange={onChangeImage}
                                                maxNumber={1}
                                                dataURLKey="data_url"
                                            >
                                                {({
                                                    imageList,
                                                    onImageUpload,
                                                    onImageRemoveAll,
                                                    onImageUpdate,
                                                    onImageRemove,
                                                    isDragging,
                                                    dragProps
                                                }) => (
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
                                                                    <IconButton>
                                                                        <Avatar
                                                                            sx={{
                                                                                height: '10vh',
                                                                                width: '10vh'
                                                                            }}
                                                                            src={image['data_url']}
                                                                        ></Avatar>
                                                                    </IconButton>
                                                                </Badge>
                                                            ))
                                                        ) : (
                                                            <Tooltip arrow title="Upload Image">
                                                                <IconButton
                                                                    style={isDragging ? { color: 'red' } : undefined}
                                                                    onClick={onImageUpload}
                                                                    {...dragProps}
                                                                >
                                                                    <Avatar src="" sx={{ width: '10vh', height: '10vh' }}>
                                                                        <PersonRoundedIcon sx={{ width: '8vh', height: '8vh' }} />
                                                                    </Avatar>
                                                                </IconButton>
                                                            </Tooltip>
                                                        )}
                                                    </>
                                                )}
                                            </ImageUploading>
                                            <FormControl fullWidth>
                                                <FormHelperText sx={{ margin: 0 }}>Name *</FormHelperText>
                                                <TextField
                                                    sx={{ margin: 0 }}
                                                    id="name"
                                                    name="name"
                                                    value={formValues.name}
                                                    required
                                                    error={isTouched && formValues.name.trim() === ''}
                                                    onChange={(e) => handleChange(e.target)}
                                                    margin="normal"
                                                    fullWidth
                                                    size="small"
                                                />
                                            </FormControl>
                                        </Grid>
                                    </>
                                ),
                                2: (
                                    <>
                                        <Grid item xs={12} sx={{ justifyContent: 'center' }}>
                                            <FormControl sx={{ width: '100%', marginTop: '10px' }}>
                                                <FormHelperText sx={{ margin: 0 }}>Buisness type *</FormHelperText>
                                                <Select
                                                    id="buisnessType"
                                                    value={formValues.buisnessType}
                                                    name="buisnessType"
                                                    required
                                                    fullWidth
                                                    error={isTouched && formValues.buisnessType.trim() === ''}
                                                    margin="none"
                                                    size="small"
                                                    sx={{ minWidth: '300px' }}
                                                    onChange={(e) => handleChange(e.target)}
                                                >
                                                    {buisnessTypes?.length > 0 &&
                                                        buisnessTypes.map((type, index) => {
                                                            return (
                                                                <MenuItem key={index} value={type?.id}>
                                                                    {type?.name}
                                                                </MenuItem>
                                                            );
                                                        })}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                    </>
                                ),
                                3: (
                                    <>
                                        <Grid item xs={12} sx={{ justifyContent: 'center' }}>
                                            <FormHelperText sx={{ margin: 0 }}>Email</FormHelperText>
                                            <TextField
                                                sx={{ margin: 0 }}
                                                id="email"
                                                name="email"
                                                value={formValues.email}
                                                error={isTouched && !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formValues.email)}
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
                                        <Grid item xs={12} sx={{ justifyContent: 'center' }}>
                                            <TextField
                                                id="phone"
                                                name="phone"
                                                label="Phone Number"
                                                error={isTouched && !/^[1-9]{1}[0-9]{9}$/.test(formValues.phone)}
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
                                        <Grid item xs={12} sx={{ justifyContent: 'center', alignItems: 'center' }}>
                                            <Stack sx={{ justifyContent: 'center', alignItems: 'center' }}>
                                                <Typography
                                                    id="group-label"
                                                    component="div"
                                                    varient="p"
                                                    color="secondary"
                                                    sx={{ fontSize: '0.7rem' }}
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
                                                    color="secondary"
                                                    sx={{ textTransform: 'none', fontSize: '0.7rem' }}
                                                >
                                                    Resend Code
                                                </Typography>
                                            </Stack>
                                        </Grid>
                                    </>
                                ),
                                6: (
                                    <>
                                        <Grid item xs={12} sx={{ justifyContent: 'center', alignItems: 'center' }}>
                                            <Stack sx={{ justifyContent: 'center', alignItems: 'center' }}>
                                                <Typography
                                                    id="group-label"
                                                    component="div"
                                                    varient="p"
                                                    color="secondary"
                                                    sx={{ fontSize: '1rem' }}
                                                >
                                                    Select your shop location
                                                </Typography>
                                                <br></br>
                                                <LocationPicker location={location} setLocation={setLocation} height="35vh" />
                                                <TextField
                                                    sx={{ zIndex: 2 }}
                                                    id="address"
                                                    name="address"
                                                    label="Address"
                                                    value={formValues.address}
                                                    required
                                                    multiline
                                                    error={isTouched && formValues.address.trim() === ''}
                                                    maxRows={4}
                                                    onChange={(e) => handleChange(e.target)}
                                                    margin="normal"
                                                    fullWidth
                                                    size="small"
                                                />
                                            </Stack>
                                        </Grid>
                                    </>
                                ),
                                7: (
                                    <>
                                        <Grid item xs={12} sx={{ justifyContent: 'center', alignItems: 'center' }}>
                                            <ProductSelection
                                                checkedValues={checkedValues}
                                                categories={categories}
                                                setCheckedValues={setCheckedValues}
                                            />
                                        </Grid>
                                    </>
                                ),
                                8: (
                                    <Grid item xs={12} sx={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <SelectedProducts categories={selectedProducts} />
                                    </Grid>
                                )
                            }[step]
                        }
                        {step !== 0 && (
                            <Grid item xs={6} sx={{ marginTop: '20px' }}>
                                <ThemeButton2 varient="contained" onClick={handleBackward} sx={{ width: '100%' }}>
                                    Back
                                </ThemeButton2>
                            </Grid>
                        )}
                        <Grid item xs={step === 0 ? 12 : 6} sx={{ marginTop: '20px' }}>
                            <ThemeButton varient="contained" onClick={handleForward} sx={{ width: '100%' }}>
                                {step === 4 ? 'Get OTP' : step === 8 ? 'Done' : 'Next'}
                            </ThemeButton>
                        </Grid>
                        <Grid item xs={12} display="flex" justifyContent="center">
                            <Typography
                                component={Button}
                                onClick={switchToLogin}
                                varient="p"
                                color="secondary"
                                sx={{ textTransform: 'none', fontSize: '0.7rem' }}
                            >
                                Registered User ? Login
                            </Typography>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        </>
    );
}
export default Register;
