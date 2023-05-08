import Header from './Header';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import bg from '~/assets/images/bg.png';
import { animations } from 'react-animation';
import { useContext } from 'react';
import { ThemeContext } from '~/util/ThemeProvider';
import BidList from './BidList';
import { useState } from 'react';
import BidDetail from './BidDetail';
import DetailHeader from './DetailHeader';
import { useEffect } from 'react';
import { useAxios } from '~/components/useAxios';
import { ToastContainer, toast } from 'react-toastify';

function MyBids() {
    const matches = useMediaQuery('(max-width:768px)');
    const { colors, fonts } = useContext(ThemeContext);
    const [isDetail, setIsDetail] = useState(false);
    const [selectedTab, setSelectedTab] = useState(0);
    const [bidList, setBidList] = useState([]);
    const axios = useAxios();

    function tabChange(tab) {
        setSelectedTab(tab);
    }

    function getMyBids() {
        axios
            .get()
            .then((res) => {
                setBidList(res);
            })
            .catch((err) => toast.error(err?.message));
    }

    useEffect(() => {}, []);

    const bids = [
        {
            id: 0,
            name: 'asdfhg'
        },
        {
            id: 2,
            name: 'sdf'
        }
        // {
        //     id: 3,
        //     name: 'sdf'
        // },
        // {
        //     id: 2,
        //     name: 'sdf'
        // },
        // {
        //     id: 3,
        //     name: 'sdf'
        // }
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
                    position: 'relative',
                    width: '100%',
                    height: '92vh',
                    textAlign: 'center'
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
