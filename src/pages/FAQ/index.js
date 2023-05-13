import bg from '~/assets/images/bg.png';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import img from '~assets/images/seller_img1.PNG';
import { Box, useMediaQuery } from '@mui/material/index';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function FAQ() {
    // const [expanded, setExpanded] = React.useState(false);

    // const handleChange = (panel) => (event, isExpanded) => {
    //     setExpanded(isExpanded ? panel : false);
    // };

    const matches = useMediaQuery('(max-width:768px)');
    return (
        <>
            <div style={{ position: 'fixed', width: '100%', height: '100%' }}>
                <img src={bg} className="img-fluid" style={{ width: '100%', height: '100%' }} alt="ico"></img>
            </div>
            <Box
                sx={{
                    height: '92vh',
                    width: '100%',
                    position: 'absolute',
                    display: 'flex',
                    justifyContent: 'center'
                }}
            >
                <Stack
                    sx={{
                        width: matches ? '98%' : '60%',
                        height: '92vh'
                    }}
                >
                    <Box sx={{ height: '8vh' }}>
                        <Typography>Frequently Asked Questions</Typography>
                    </Box>
                    <Box
                        sx={{
                            boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                            borderRadius: '12px',
                            backgroundColor: 'white',
                            height: '75vh',
                            overflow: 'auto',
                            padding: '5%'
                        }}
                    >
                        <Typography>
                            Scrapify MarketPlace is a platform that brings together buyer and sellers of scrap materials from all over the
                            world. Whether you are a manufacturer looking to sell the excess scrap, or a buyer looking for raw materials,
                            Scrapify Marketplace provides a streamlined, efficient way to connect with others in the industry.
                        </Typography>
                        <br />
                        <div style={{ width: '100%', padding: '1%' }}>
                            <Accordion
                            // sx={{
                            //     '&:hover': {
                            //         backgroundColor: 'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px'
                            //     }
                            // }}
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    itemKey={1}
                                    aria-controls="panel2a-content"
                                    id="panel2a-header"
                                >
                                    <Typography>What types of scrap materials are commonly bought and sold?</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        Commonly bought and sold scrap materials include metals (such as steel, aluminum, copper, and
                                        brass), paper, plastic, and e-waste(electronic waste).
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
                                    <Typography>What is the process for selling scrap materials?</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography></Typography>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
                                    <Typography>How can i find Buyers are sellers for scrap materials?</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography></Typography>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
                                    <Typography>What factors determine the price of scrap materials?</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography></Typography>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
                                    <Typography>What are some common challenges in the scrap buying and selling industry?</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography></Typography>
                                </AccordionDetails>
                            </Accordion>
                        </div>
                    </Box>
                </Stack>
            </Box>
        </>
    );
}

export default FAQ;

{
    /* <p>Frequently Asked Questions</p>
<Stack
    alignItems="center"
    gap={2}
    sx={{ boxShadow: '0px 20px 30px rgba(0, 0, 0, 0.25)', backgroundColor: 'white', padding: '2%', width: '100%' }}
> 
</Stack>


<div style={{ position: 'fixed', width: '100%', height: '100%' }}>
<img src={bg} className="img-fluid" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="ico"></img>
</div>
*/
}
