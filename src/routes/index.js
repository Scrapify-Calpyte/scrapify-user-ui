import MainLayout from '../layout/MainLayout';
import { useRoutes } from 'react-router-dom';

const ThemeRoutes = () => {
    return useRoutes([
        {
            path: '/',
            element: <MainLayout />
        }
    ]);
};

export default ThemeRoutes;
