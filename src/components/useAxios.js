import React, { createContext, useContext } from 'react';
import { useKeycloak } from '@react-keycloak/web';
import { environment } from '~/util/Environment';
import axios from 'axios';

const AxiosContext = createContext(null);

const AxiosProvider = ({ children }) => {
    const { keycloak } = useKeycloak();
    const instance = axios.create({
        baseURL: environment.baseURL // Set your base URL here
    });

    instance.interceptors.request.use(
        async (config) => {
            if (keycloak.authenticated) {
                config.headers.Authorization = `Bearer ${keycloak.token}`;
            }
            return config;
        },
        (error) => {
            // Do something with request error
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

export { AxiosProvider, useAxios };
