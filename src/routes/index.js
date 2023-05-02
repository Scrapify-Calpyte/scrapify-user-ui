import MainLayout from '~/layout/MainLayout';
import { useRoutes, Navigate } from 'react-router-dom';
import Loadable from '/src/components/Loadable';
import { lazy, useEffect } from 'react';
import PrivateRoute from '~/components/PrivateRoute';
import Cookies from 'js-cookie';
import { AuthContext } from '~/context/AuthProvider/index';
import { useContext } from 'react';
import JwtDecode from '~/util/JwtDecode';

const BuyerScreen = Loadable(lazy(() => import('../pages/BuyerScreen')));
const SellerScreen = Loadable(lazy(() => import('../pages/SellerScreen')));
const SignUpScreen = Loadable(lazy(() => import('../pages/BuyerScreen/SignUp')));
const Home = Loadable(lazy(() => import('../pages/Home')));

const ThemeRoutes = () => {
    const { setAuthData } = useContext(AuthContext);
    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            const { given_name, email } = JwtDecode(token);
            setAuthData({
                token: token,
                userName: given_name,
                email: email
            });
        }
        return () => {
            alert('main routes unmount');
        };
    }, []);

    return useRoutes([
        {
            path: '/',
            element: (
                <PrivateRoute isAuth={false}>
                    <MainLayout />
                </PrivateRoute>
            ),
            children: [
                {
                    path: 'buyer',
                    element: (
                        <PrivateRoute isAuth={true}>
                            <BuyerScreen />
                        </PrivateRoute>
                    )
                },
                {
                    path: 'seller/*',
                    element: (
                        <PrivateRoute isAuth={true}>
                            <SellerScreen />
                        </PrivateRoute>
                    )
                },
                {
                    path: 'home/:type',
                    element: <Home />
                },
                {
                    path: 'login',
                    element: (
                        <PrivateRoute isAuth={true}>
                            <SignUpScreen />
                        </PrivateRoute>
                    )
                },
                {
                    path: 'home',
                    element: <Navigate to="/home/seller" replace={true} />
                },
                {
                    path: '/',
                    element: <Navigate to="/home/seller" replace={true} />
                }
                // {
                //     path: '*',
                //     element: <BuyerScreen />
                // }
            ]
        },
        {
            path: '*',
            element: <MainLayout />
        }
    ]);
};

export default ThemeRoutes;
