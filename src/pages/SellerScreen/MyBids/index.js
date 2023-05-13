import Header from './Header';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import bg from '~/assets/images/bg.png';
import { animations } from 'react-animation';
import BidList from './BidList';
import { useState } from 'react';
import BidDetail from './BidDetail';
import DetailHeader from './DetailHeader';
import { useEffect } from 'react';
import { useAxios } from '~/components/useAxios';
import { toast } from 'react-toastify';
import MessageDrawer from './MessageDrawer';
import { ApiConfig } from '~/components/ApiConfig';

function MyBids() {
    const [isDetail, setIsDetail] = useState(false);
    const [selectedTab, setSelectedTab] = useState('open');
    const [bidStore, setBidStore] = useState({
        open: [],
        modified: [],
        confirmed: [],
        closed: []
    });
    const [selectedBid, setSelectedBid] = useState(null);
    const axios = useAxios();
    const [isMessage, setIsMessage] = useState(false);

    function tabChange(tab) {
        setSelectedTab(tab);
    }

    function getMyBids() {
        axios
            .get(ApiConfig.getSellerBids)
            .then((res) => {
                let openBids = res?.data.filter((bid) => bid?.status?.toLowerCase() === 'open');
                let confirmedBids = res?.data.filter((bid) => bid?.status?.toLowerCase() === 'accepted');
                let rejectedBids = res?.data.filter((bid) => bid?.status?.toLowerCase() === 'rejected');
                let modifiedBids = res?.data.filter((bid) => bid?.status?.toLowerCase() === 'modified');
                setBidStore((prev) => ({
                    ...prev,
                    ['open']: [...openBids],
                    ['modified']: [...modifiedBids],
                    ['confirmed']: [...confirmedBids],
                    ['closed']: [...rejectedBids]
                }));
            })
            .catch((err) => toast.error(err?.message));
    }

    useEffect(() => {
        getMyBids();
    }, []);

    function acceptBid(id) {
        axios
            .put(ApiConfig.acceptBid(id))
            .then((res) => {
                getMyBids();
            })
            .catch((err) => toast.error(err?.message));
    }

    function rejectBid(id) {
        axios
            .put(ApiConfig.rejectBid(id))
            .then((res) => {
                getMyBids();
            })
            .catch((err) => toast.error(err?.message));
    }

    function getSelectedBid(id, action) {
        switch (action) {
            case 'more':
                let data = bidStore[selectedTab].find((bid) => bid?.id === id);
                setSelectedBid(data);
                setIsDetail(true);
                break;
            case 'modify':
                setIsMessage(true);
                break;
            case 'accept':
                acceptBid(id);
                break;
            case 'reject':
                rejectBid(id);
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
                        display: 'flex',
                        justifyContent: 'center',
                        boxShadow: '0px 4px 30px rgba(0, 0, 0, 0.2)',
                        animation: animations.fadeIn
                    }}
                >
                    {isDetail ? (
                        <DetailHeader setIsDetail={setIsDetail} />
                    ) : (
                        <Header
                            tabChange={tabChange}
                            count={{
                                open: bidStore?.open?.length,
                                modified: bidStore?.modified?.length,
                                confirmed: bidStore?.confirmed?.length,
                                closed: bidStore?.closed?.length
                            }}
                        />
                    )}
                </Box>
                <br></br>
                <Box sx={{ justifyContent: 'center', width: '100%', display: 'flex', padding: '5px' }}>
                    {isDetail ? (
                        <BidDetail setIsDetail={setIsDetail} bid={selectedBid}  handleActions={getSelectedBid} selectedTab={selectedTab}  />
                    ) : (
                        <BidList bids={bidStore[selectedTab]} handleActions={getSelectedBid} selectedTab={selectedTab}/>
                    )}
                </Box>
            </Box>
            <MessageDrawer open={isMessage} setOpen={setIsMessage} />
        </>
    );
}

export default MyBids;
