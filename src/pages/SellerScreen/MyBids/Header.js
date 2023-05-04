import Box from '@mui/material/Box';
import { Avatar, Badge, Stack, Typography } from '@mui/material/index';
import { useContext, useState } from 'react';
import { ThemeContext } from '~/util/ThemeProvider';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

export default function Header({ tabChange }) {
    const { colors, fonts } = useContext(ThemeContext);
    const [value, setValue] = useState(0);

    function handleChange(e, newValue) {
        setValue(newValue);
        console.log(newValue);
        tabChange(newValue);
    }

    let tabs = [
        {
            key: 0,
            value: 'Open'
        },
        {
            key: 1,
            value: 'Modified'
        },
        {
            key: 2,
            value: 'Confirmed'
        },
        {
            key: 3,
            value: 'Closed'
        }
    ];

    return (
        <>
            <Box
                sx={{
                    padding: '10px 10px 0 10px',
                    width: '100%',
                    textAlign: 'start'
                }}
            >
                <Typography color={colors.primary} component="div" variant="subtitle1" fontWeight="bold">
                    My Bids
                </Typography>
                <Tabs
                    sx={{ maxWidth: '85vw' }}
                    variant="scrollable"
                    scrollButtons="auto"
                    value={value}
                    onChange={handleChange}
                    textColor={colors.primary}
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
                                                30
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
