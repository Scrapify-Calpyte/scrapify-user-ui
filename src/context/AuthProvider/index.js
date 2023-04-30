import { createContext } from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [authData, setAuthData] = useState(null);

    return <AuthContext.Provider value={{ authData, setAuthData }}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
    children: PropTypes.node
};

export { AuthProvider };
