import Loadable from '~/components/Loadable';
import { useRoutes, Navigate } from 'react-router-dom';
import { lazy } from 'react';

const SellerInventory = Loadable(lazy(() => import('./SellerInventory')));

export default function SellerScreen() {
    return useRoutes([
        { path: '/', element: <Navigate to="inventory" replace={true} /> },
        { path: '*', element: <Navigate to="inventory" replace={true} /> },
        { path: '/inventory', element: <SellerInventory /> }
    ]);
}
