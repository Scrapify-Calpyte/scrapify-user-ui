import useScreenSize from './useScreenSize';
import PropTypes from 'prop-types';
import { Box } from '@mui/material/index';

function FlexBox({ children }) {
    const [width, height] = useScreenSize();
    return <Box sx={{ width: '100%', height: height - 65 }}>{children}</Box>;
}
FlexBox.propTypes = {
    children: PropTypes.node
};
export default FlexBox;
