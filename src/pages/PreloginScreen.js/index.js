import Loadable from '~/components/Loadable';
import { useRoutes, Navigate } from 'react-router-dom';
import { lazy } from 'react';

const SignUpScreen = Loadable(lazy(() => import('./SignUp')));
const ScrapSelectionPage = Loadable(lazy(() => import('./ScrapSelectionPage')));
const StockPage = Loadable(lazy(() => import('./StockPage')));

function PreloginScreen() {
    return useRoutes([
        { path: '/', element: <Navigate to="register" replace={true} /> },
        { path: '*', element: <Navigate to="register" replace={true} /> },
        { path: '/home', element: <p>Login Page</p> },
        { path: '/register', element: <SignUpScreen /> },
        { path: '/products', element: <ScrapSelectionPage /> },
        { path: '/stock', element: <StockPage /> }
    ]);
}

export default PreloginScreen;
