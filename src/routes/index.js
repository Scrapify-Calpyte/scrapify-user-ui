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
const Home = Loadable(lazy(() => import('../pages/Home')));
const Contact = Loadable(lazy(() => import('../pages/Contact')));
const FAQ = Loadable(lazy(() => import('../pages/FAQ')));

const ThemeRoutes = () => {
    const { setAuthData } = useContext(AuthContext);
    useEffect(() => {
        const token = Cookies.get('token');
        if (token && token != undefined && token != 'undefined') {
            const { given_name, email } = JwtDecode(token);
            setAuthData({
                userName: given_name,
                email: email
            });
        }
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
                    path: 'home/:type',
                    element: <Home />
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
                    path: 'buyer',
                    element: (
                        <PrivateRoute isAuth={true}>
                            <BuyerScreen />
                        </PrivateRoute>
                    )
                },
                {
                    path: 'contact',
                    element: <Contact />
                },
                {
                    path: 'faq',
                    element: <FAQ />
                },
                {
                    path: 'home',
                    element: <Navigate to="/home/seller" replace={true} />
                },
                {
                    path: '/',
                    element: <Navigate to="/home/seller" replace={true} />
                }
                // ,
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
