import React, { createContext, useContext } from 'react';
// import { useKeycloak } from '@react-keycloak/web';
import { environment } from '~/util/Environment';
import axios from 'axios';
import PropTypes from 'prop-types';
import { AuthContext } from '~/context/AuthProvider/index';
import { useEffect } from 'react';
import Cookies from 'js-cookie';

const AxiosContext = createContext(null);

const AxiosProvider = ({ children }) => {
    const { authData, setAuthData } = useContext(AuthContext);

    useEffect(() => {}, [authData]);
    // const { keycloak } = useKeycloak();
    const instance = axios.create({
        baseURL: environment.baseURL // Set your base URL here
    });

    instance.interceptors.request.use(
        async (config) => {
            config.headers['Access-Control-Allow-Origin'] = '*';
            // config.headers['Content-Type'] = 'application/x-www-form-urlencoded';

            // if (keycloak.authenticated) {
            //     config.headers.Authorization = `Bearer ${keycloak.token}`;
            // }
            let token = Cookies.get('token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            // Do something with request error
            return Promise.reject(error);
        }
    );

    instance.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            const originalRequest = error.config;
            const statusCode = error.response.status;
            if (statusCode === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                const refreshToken = Cookies.get('refreshToken');
                return axios
                    .post(environment.baseURL + 'user/unsecure/token', { token: refreshToken })
                    .then((response) => {
                        const { token, refreshToken } = response.data;
                        Cookies.set('token', token);
                        Cookies.set('refreshToken', refreshToken);
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        return instance(originalRequest);
                    })
                    .catch((error) => {
                        setAuthData(null);
                        Cookies.remove('token');
                        Cookies.remove('refreshToken');
                        return Promise.reject(error);
                    });
            }
            return Promise.reject(error);
        }
    );

    return <AxiosContext.Provider value={instance}>{children}</AxiosContext.Provider>;
};

const useAxios = () => {
    const axiosInstance = useContext(AxiosContext);
    if (!axiosInstance) {
        throw new Error(
            'useAxios must be used within an AxiosProvider. ' + 'Wrap a parent component in <AxiosProvider> to fix this error.'
        );
    }
    return axiosInstance;
};

AxiosProvider.propTypes = {
    children: PropTypes.node
};

export { AxiosProvider, useAxios };
