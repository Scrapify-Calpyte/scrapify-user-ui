import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import MuiAppBar from '@mui/material/AppBar';

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
    borderRadius: '30px',
    overflow: 'hidden',
    height: 'fit-content',
    '.MuiToggleButton-root': {
        color: props.theme.palette.secondary.main,
        border: 'none',
        backgroundColor: 'transparent',
        borderRadius: '30px !important',
        padding: '6px 10px',
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
