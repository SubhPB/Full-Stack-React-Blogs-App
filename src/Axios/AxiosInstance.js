' -- Byimaan -- '

import axios from "axios";
import { axiosInsFormData } from "./FormDataAxios";

const baseURL = 'http://127.0.0.1:8000/api/';


export const axiosInstance = axios.create({
    baseURL: baseURL,

    timeout: 5000,

    headers: {
        Authorization: localStorage.getItem('access_token')
        ? 'JWT ' + localStorage.getItem('access_token')
        :  null,  

        'Content-Type': 'application/json',

        accept: 'application/json'
    }
});

axiosInstance.interceptors.response.use(
    res => {
        return res;
    },

    async (error) => {

        const config = error.config;
        const serverRes = error.response;

        console.log("Interceptor was called!");

        if (serverRes.status === 401 && serverRes.statusText === 'Unauthorized' && !config.retry && config.url !== 'token/refresh/'){
            // retry ensures that make the api callback only once
            config.retry = true;

            const refreshToken = localStorage.getItem('refresh_token');

            console.log(" activated -> serverRes.status === 401 && serverRes.statusText === 'Unauthorized' && !config.retry && config.url !== 'token/refresh/' ")

            if (refreshToken){

                try{
                    console.log('sending api call for new access token');

                    const response = await axiosInstance.post('token/refresh/',{
                        refresh: refreshToken
                    });

                    const newRefreshToken = await response.data.refresh;
                    const newAccessToken = await response.data.access;

                    localStorage.setItem('refresh_token',newRefreshToken);
                    localStorage.setItem('access_token',newAccessToken);

                    axiosInstance.defaults.headers['Authorization'] = 'JWT ' + newAccessToken;
                    axiosInsFormData.defaults.headers['Authorization'] = 'JWT ' + newAccessToken;
                    config.headers['Authorization'] = 'JWT ' + newAccessToken;

                    return axiosInstance(config);

                } catch (refreshError){
                    console.log("refresh error occured!.")
                    console.log(refreshError);

                    //  make user unauthenticated by clearing the local storage
                    localStorage.clear();

                    error.frontMsg = {
                        type: 'danger',
                        body: 'Request Failed! perhaps you got Un-authenticated or backend server is not running. Please log in first.'
                    };

                    return Promise.reject(error)
                }
            } else {
                // user do not have refresh token so make him un-authenticated

                localStorage.clear();
                console.log("Interceptor - do not have the refresh")

                error.frontMsg = {
                    type: 'danger',
                    body: 'Request Failed! perhaps you got Un-authenticated or backend server is not running. Please log in first.'
                };
                window.location.href = '/'

                return Promise.reject(error);
            };
        };

        return Promise.reject(error);
    }
);