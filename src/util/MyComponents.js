import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import MuiAppBar from '@mui/material/AppBar';
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    typography: {
        fontFamily: 'Inter Tight, Cursive , Arial, sans-serif',
        head: {
            fontSize: '1rem'
        },
        subtitle: {
            fontSize: '0.8rem'
        }
    },
    palette: {
        primary: {
            main: '#1cd8a2' // Set the desired primary color
        },
        secondary: {
            main: '#013F56' // Set the desired secondary color
        },
        light: {
            main: '#FBFCFC'
        },
        dark: {
            main: '#343a40'
        },
        grey: {
            main: '#818694'
        }
    },
    components: {
        MuiInputBase: {
            styleOverrides: {
                root: {
                    '&.Mui-disabled': {
                        backgroundColor: '#EAEDED' // Set your desired background color for disabled TextField
                    },
                    '& .MuiInputAdornment-root': {
                        backgroundColor: '#EAEDED',
                        padding: '19px 14px'
                    }
                }
            }
        },
        MuiDialog: {
            styleOverrides: {
                root: {
                    background : 'rgba(1, 63, 86, 0.9)', 
                    // opacity: '0.9'
                }
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    paddingRight: 0,
                    paddingLeft: 0,
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        border: 'solid 1.5px #013F56', // Replace with your secondary color value
                        color: '#34495E'
                    }
                }
            }
        }
    }
});

export const ThemeButton = styled(Button)((props) => ({
    backgroundColor: props.theme.palette.secondary.main,
    textTransform: 'none',
    color: props.theme.palette.light.main,
    borderRadius: '30px',
    padding: '5px 10px',
    width: 'fit-content',
    height: 'fit-content',
    border: 'solid 1px' + props.theme.palette.secondary.main,
    '&:hover': {
        backgroundColor: props.theme.palette.secondary.main
    }
}));

export const ThemeButton2 = styled(Button)((props) => ({
    backgroundColor: '#FDFEFE',
    textTransform: 'none',
    color: props.theme.palette.secondary.main,
    borderRadius: '30px',
    padding: '5px 10px',
    border: 'solid 1px' + props.theme.palette.secondary.main,
    width: 'fit-content',
    height: 'fit-content',
    '&:hover': {
        backgroundColor: props.theme.palette.light.main
    }
}));

export const MyToggleButtonGroup = styled(ToggleButtonGroup)((props) => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: props.theme.palette.light.main,
    border: '1px solid ' + props.theme.palette.light.main,
    padding: '1px',
    borderRadius: '40px',
    overflow: 'hidden',
    height: 'fit-content',
    '.MuiToggleButton-root': {
        color: props.theme.palette.secondary.main,
        border: 'none',
        backgroundColor: 'transparent',
        borderRadius: '40px !important',
        padding: '6px 20px',
        width: '100%',
        '&.Mui-selected': {
            backgroundColor: props.theme.palette.secondary.main,
            transition: 'background-color 500ms',
            color: props.theme.palette.light.main
        },
        '&.Mui-selected:hover': {
            backgroundColor: props.theme.palette.secondary.main
        }
    }
}));

export const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open'
})((props) => ({
    boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
    color: props.theme.palette.light.main,
    alignItems: 'space-between',
    justifyContent: 'center',
    width: `100%`,
    height: '8vh'
}));
