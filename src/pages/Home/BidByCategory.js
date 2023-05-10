import { ThemeButton } from '~/util/MyComponents';
import PropTypes from 'prop-types';

function BidByCategory({ setIsByCategory }) {
    return (
        <>
            <p>Bid By Category</p>
            <ThemeButton onClick={() => setIsByCategory(false)}>Back</ThemeButton>
        </>
    );
}

BidByCategory.propTypes = {
    setIsByCategory: PropTypes.func.isRequired
};
export default BidByCategory;
