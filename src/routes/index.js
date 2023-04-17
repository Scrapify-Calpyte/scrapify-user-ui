import MainLayout from '../layout/MainLayout';
import { useRoutes } from 'react-router-dom';
import Loadable from '/src/components/Loadable';
import { lazy } from 'react';

const BuyerScreen = Loadable(lazy(() => import('../pages/BuyerScreen')));
const SellerScreen = Loadable(lazy(() => import('../pages/SellerScreen')));

const ThemeRoutes = () => {
    return useRoutes([
        {
            path: '/',
            element: <MainLayout />,
            children: [
                {
                    path: '/buyer',
                    element: <BuyerScreen />
                },
                {
                    path: '/seller',
                    element: <SellerScreen />
                },
                {
                    path: '/',
                    element: <BuyerScreen />
                },
                {
                    path: '*',
                    element: <BuyerScreen />
                }
            ]
        },
        {
            path: '*',
            element: <MainLayout />
        }
    ]);
};

export default ThemeRoutes;
