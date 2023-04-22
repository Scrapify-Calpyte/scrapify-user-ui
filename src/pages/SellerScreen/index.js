import Loadable from '~/components/Loadable';
import { useRoutes, Navigate } from 'react-router-dom';
import { lazy } from 'react';

const SignUpScreen = Loadable(lazy(() => import('./SignUp')));
const StockPage = Loadable(lazy(() => import('./StockPage')));

export default function SellerScreen() {
    return useRoutes([
        { path: '/', element: <Navigate to="register" replace={true} /> },
        { path: '*', element: <Navigate to="register" replace={true} /> },
        { path: '/login', element: <p>Login Page</p> },
        { path: '/register', element: <SignUpScreen /> },
        { path: '/products', element: <StockPage /> }
    ]);
}
