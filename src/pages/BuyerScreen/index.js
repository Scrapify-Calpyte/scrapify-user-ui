import Loadable from '~/components/Loadable';
import { useRoutes, Navigate } from 'react-router-dom';
import { lazy } from 'react';

const Inventory = Loadable(lazy(() => import('./BuyerInventory')));

function BuyerScreen() {
    return useRoutes([
        { path: '/', element: <Navigate to="inventory" replace={true} /> },
        { path: '*', element: <Navigate to="inventory" replace={true} /> },
        { path: '/inventory', element: <Inventory /> }
    ]);
}

export default BuyerScreen;
