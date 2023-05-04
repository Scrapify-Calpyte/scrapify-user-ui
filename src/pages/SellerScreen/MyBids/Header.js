import Box from '@mui/material/Box';
import { Avatar, Badge, Stack, Typography } from '@mui/material/index';
import { useContext } from 'react';
import { ThemeContext } from '~/util/ThemeProvider';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

export default function Header() {
    const { colors, fonts } = useContext(ThemeContext);
    const [value, setValue] = React.useState(0);

    function handleChange(e, newValue) {
        setValue(newValue);
        console.log(newValue);
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
            <Box sx={{ backgroundColor: '#FFFFFF', boxShadow: '0px 4px 30px rgba(0, 0, 0, 0.2)', padding: '10px 0 0 25%' }}>
                <Typography color={colors.primary} component="div" variant="h6" fontWeight="bold">
                    My Bids
                </Typography>
                <Tabs
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
            <p>sjkdhgf</p>
        </>
    );
}
