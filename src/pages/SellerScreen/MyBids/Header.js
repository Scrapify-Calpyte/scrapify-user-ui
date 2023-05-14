import Box from '@mui/material/Box';
import { Avatar, Badge, Button, Stack, Typography, useMediaQuery } from '@mui/material/index';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { animations } from 'react-animation';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';

export default function Header({ selectedTab, setSelectedTab, count }) {
    const matches = useMediaQuery('(max-width:768px)');
    const { palette } = useTheme();
    const navigate = useNavigate();

    useEffect(() => {}, []);

    function handleChange(e, newValue) {
        setSelectedTab(newValue);
    }

    function goToInventory() {
        navigate('/seller/inventory');
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
                <Stack flexDirection="row" justifyContent="space-between">
                    <Typography color="secondary" component="div" variant="subtitle1" fontWeight="bold">
                        My Bids
                    </Typography>
                    <Typography color="secondary" sx={{ textTransform: 'none' }} component={Button} onClick={goToInventory}>
                        <DashboardCustomizeIcon /> &nbsp; Stock
                    </Typography>
                </Stack>
                <Tabs
                    sx={{ maxWidth: '95vw' }}
                    variant="scrollable"
                    scrollButtons={true}
                    allowScrollButtonsMobile
                    value={selectedTab}
                    onChange={handleChange}
                    TabIndicatorProps={{
                        style: {
                            backgroundColor: palette?.primary?.main
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
                                                color={selectedTab === tab?.key && 'primary'}
                                                sx={{ textTransform: 'none' }}
                                            >
                                                {tab?.value}
                                            </Typography>
                                            <Avatar
                                                sx={{
                                                    height: '20px',
                                                    width: 'fit-content',
                                                    minWidth: '20px',
                                                    fontSize: '10px',
                                                    backgroundColor: selectedTab === tab?.key && palette?.primary?.main
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
