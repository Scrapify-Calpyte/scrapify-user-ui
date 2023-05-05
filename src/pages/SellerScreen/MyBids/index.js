import Header from './Header';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import bg from '~/assets/images/bg.png';
import { animations } from 'react-animation';
import { useContext, useEffect, useRef } from 'react';
import { ThemeContext } from '~/util/ThemeProvider';
import BidList from './BidList';
import { useState } from 'react';
import BidDetail from './BidDetail';
import DetailHeader from './DetailHeader';

function MyBids() {
    const matches = useMediaQuery('(max-width:768px)');
    const { colors, fonts } = useContext(ThemeContext);
    const [isDetail, setIsDetail] = useState(false);
    const [selectedTab, setSelectedTab] = useState(0);

    function tabChange(tab) {
        setSelectedTab(tab);
    }

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'auto' });
    }, [isDetail]);

    const bids = [
        {
            id: 0,
            name: 'asdfhg'
        },
        {
            id: 2,
            name: 'sdf'
        },
        {
            id: 3,
            name: 'sdf'
        },
        {
            id: 2,
            name: 'sdf'
        },
        {
            id: 3,
            name: 'sdf'
        }
    ];

    function getSelectedBid(id, action) {
        switch (action) {
            case 'more':
                setIsDetail(true);
                break;
            case 'modify':
                setIsDetail(true);
                break;
            default:
                setIsDetail(false);
                break;
        }
    }
    return (
        <>
            <Box
                sx={{
                    // backgroundImage: 'url(' + bg + ')',
                    // backgroundRepeat: 'no-repeat',
                    // backgroundSize: 'cover',
                    // objectFit: 'cover',
                    position: 'absolute',
                    width: '100%',
                    height: 'auto',
                    top: '8vh',
                    textAlign: 'center'
                    // animation: animations.fadeIn
                }}
            >
                <div style={{ position: 'fixed', width: '100%', height: '100%' }}>
                    <img src={bg} className="img-fluid" style={{ width: '100%', height: '100%' }} alt="ico"></img>
                </div>
                <Box
                    sx={{
                        backgroundColor: 'white',
                        width: '100%',
                        position: 'sticky',
                        top: '8vh',
                        zIndex: 1,
                        padding: !matches && '0  15%',
                        boxShadow: '0px 4px 30px rgba(0, 0, 0, 0.2)',
                        animation: animations.fadeIn
                    }}
                >
                    {isDetail ? <DetailHeader setIsDetail={setIsDetail} /> : <Header tabChange={tabChange} />}
                </Box>
                <br></br>
                <Box sx={{ justifyContent: 'center', width: '100%', display: 'flex', padding: '5px' }}>
                    {isDetail ? <BidDetail setIsDetail={setIsDetail} /> : <BidList bids={bids} handleActions={getSelectedBid} />}
                </Box>
            </Box>
        </>
    );
}

export default MyBids;
