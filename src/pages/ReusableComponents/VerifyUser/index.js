import { useEffect, useState } from 'react';
import Login from '../Login/index';
import Register from '../Register/index';

const VerifyUser = ({ type, handleClose }) => {
    const [isLogin, setIsLogin] = useState(false);
    const [isRegister, setIsRegister] = useState(false);

    useEffect(() => {
        alert('hitted');
        if (type === 'login') {
            setIsLogin(true);
        }
        if (type === 'register') {
            setIsRegister(false);
        }
    }, []);

    const switchPage = (isLogin, isRegister) => {
        setIsLogin(isLogin);
        setIsRegister(isRegister);
    };

    function handleClose() {
        handleClose(true);
    }

    return (
        <>
            <p>works</p>
            {/* {isLogin ? <Login open={isLogin} switchPage={switchPage} close={handleClose} /> : <></>}
            {isRegister ? <Register open={isRegister} switchPage={switchPage} close={handleClose}></Register> : <></>} */}
        </>
    );
};

export default VerifyUser;
