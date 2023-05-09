import Box from '@mui/material/Box';
import { Avatar, Badge, Stack, Typography, useMediaQuery } from '@mui/material/index';
import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '~/util/ThemeProvider';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { animations } from 'react-animation';

export default function Header({ tabChange, count }) {
    const { colors, fonts } = useContext(ThemeContext);
    const [value, setValue] = useState('open');
    const matches = useMediaQuery('(max-width:768px)');

    useEffect(() => {}, []);

    function handleChange(e, newValue) {
        setValue(newValue);
        tabChange(newValue);
    }

    let tabs = [
        {
            key: 'open',
            value: 'Open',
            count: count?.open
        },
        {
            key: 'modified',
            value: 'Modified',
            count: count?.modified
        },
        {
            key: 'confirmed',
            value: 'Confirmed',
            count: count?.confirmed
        },
        {
            key: 'closed',
            value: 'Closed',
            count: count?.closed
        }
    ];

    return (
        <>
            <Box
                sx={{
                    padding: '10px 10px 0 10px',
                    width: matches ? '100%' : '70%',
                    textAlign: 'start',
                    animation: animations.fadeIn
                }}
            >
                <Typography color={colors.primary} component="div" variant="subtitle1" fontWeight="bold">
                    My Bids
                </Typography>
                <Tabs
                    sx={{ maxWidth: '95vw' }}
                    variant="scrollable"
                    scrollButtons={true}
                    allowScrollButtonsMobile
                    value={value}
                    onChange={handleChange}
                    TabIndicatorProps={{
                        style: {
                            backgroundColor: colors.secondary
                        }
                    }}
                >
                    {tabs?.length > 0 &&
                        tabs.map((tab, index) => {
                            return (
                                <Tab
                                    key={index}
                                    label={
                                        <Stack flexDirection="row" gap={1}>
                                            <Typography
                                                component="div"
                                                variant="subtitle2"
                                                sx={{ textTransform: 'none', color: value === tab?.key && colors.secondary }}
                                            >
                                                {tab?.value}
                                            </Typography>
                                            <Avatar
                                                sx={{
                                                    height: '20px',
                                                    width: '20px',
                                                    fontSize: '10px',
                                                    backgroundColor: value === tab?.key && colors.secondary
                                                }}
                                            >
                                                {tab?.count}
                                            </Avatar>
                                        </Stack>
                                    }
                                    value={tab?.key}
                                />
                            );
                        })}
                </Tabs>
            </Box>
        </>
    );
}
