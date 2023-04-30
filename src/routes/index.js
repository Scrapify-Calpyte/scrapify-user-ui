import MainLayout from '~/layout/MainLayout';
import { useRoutes, Navigate } from 'react-router-dom';
import Loadable from '/src/components/Loadable';
import { lazy } from 'react';
import PrivateRoute from '~/components/PrivateRoute';

const BuyerScreen = Loadable(lazy(() => import('../pages/BuyerScreen')));
const SellerScreen = Loadable(lazy(() => import('../pages/SellerScreen')));
const SignUpScreen = Loadable(lazy(() => import('../pages/BuyerScreen/SignUp')));

const ThemeRoutes = () => {
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
                    element: <BuyerScreen />
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
                    path: 'home',
                    element: <Navigate to="buyer" replace={true} />
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
                    path: '/',
                    element: <Navigate to="buyer" replace={true} />
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
