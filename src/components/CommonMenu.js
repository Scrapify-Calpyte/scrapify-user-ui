import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined';
import InventoryIcon from '@mui/icons-material/Inventory';

export const CommonMenus = [
    {
        icon: <HomeOutlinedIcon />,
        label: 'Home',
        link: '/home'
    },
    {
        icon: <InventoryIcon />,
        label: 'Inventory',
        link: '/seller/inventory'
    },
    {
        icon: <PersonAddAltOutlinedIcon />,
        label: 'My Bids',
        link: '/seller/bids'
    },
    {
        icon: <CurrencyExchangeOutlinedIcon />,
        label: 'Retail Buying',
        link: '/refer-earn'
    },
    {
        icon: <CurrencyExchangeOutlinedIcon />,
        label: 'Rewards',
        link: '/refer-earn'
    },
    {
        icon: <CurrencyExchangeOutlinedIcon />,
        label: 'Scrap Rates',
        link: '/refer-earn'
    },
    {
        icon: <CurrencyExchangeOutlinedIcon />,
        label: 'FAQ',
        link: '/faq'
    },
    {
        icon: <CallOutlinedIcon />,
        label: 'Contact',
        link: '/contact'
    }
];
