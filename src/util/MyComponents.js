import { styled } from '@mui/material/styles';
import theme from './theme';
import Button from '@mui/material/Button';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export const ThemeButton = styled(Button)({
    backgroundColor: theme.colors.primary,
    textTransform: 'none',
    color: '#FDFEFE',
    borderRadius: '30px',
    padding: '5px 10px',
    width: 'fit-content',
    height: 'fit-content',
    border: 'solid 1px' + theme.colors.primary,
    '&:hover': {
        backgroundColor: theme.colors.primary
    }
});

export const ThemeButton2 = styled(Button)({
    backgroundColor: '#FDFEFE',
    textTransform: 'none',
    color: theme.colors.primary,
    borderRadius: '30px',
    padding: '5px 10px',
    border: 'solid 1px' + theme.colors.primary,
    width: 'fit-content',
    height: 'fit-content',
    '&:hover': {
        backgroundColor: 'white'
    }
});

export const MyToggleButtonGroup = styled(ToggleButtonGroup)({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    border: '1px solid #ccc',
    padding: '1px',
    borderRadius: '30px',
    overflow: 'hidden',
    height: 'fit-content',
    '.MuiToggleButton-root': {
        color: '#333',
        border: 'none',
        backgroundColor: 'transparent',
        borderRadius: '30px !important',
        padding: '6px 10px',
        width: '100%',
        // padding: '8px 15px',
        '&.Mui-selected': {
            backgroundColor: theme.colors.primary,
            transition: 'background-color 500ms',
            color: '#fff'
        },
        '&.Mui-selected:hover': {
            backgroundColor: '#013f56'
        }
    }
});
