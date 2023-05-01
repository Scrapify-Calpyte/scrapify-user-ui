import { useEffect, useState } from 'react';
import Login from '../Login/index';
import Register from '../Register/index';
import { useNavigate } from 'react-router-dom';

const VerifyUser = ({ onClose }) => {
    const [isLogin, setIsLogin] = useState(false);
    const [isRegister, setIsRegister] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setIsLogin(true);
    }, []);

    const switchToLogin = () => {
        setIsLogin(true);
        setIsRegister(false);
    };

    const switchToRegister = () => {
        setIsRegister(true);
        setIsLogin(false);
    };

    function handleClose() {
        setIsLogin(false);
        setIsRegister(false);
        onClose(false);
    }

    return (
        <>
            {isLogin ? <Login open={isLogin} switchToRegister={switchToRegister} close={handleClose} /> : <></>}
            {isRegister ? <Register open={isRegister} switchToLogin={switchToLogin} close={handleClose}></Register> : <></>}
        </>
    );
};

export default VerifyUser;
