' -- Byimaan -- '
import axios from "axios";
import { axiosInstance } from "./AxiosInstance";

const baseURL = 'http://127.0.0.1:8000/api/';

/* -- for the api calls that based on form data -- */
export const axiosInsFormData = axios.create({

    baseURL: baseURL,

    timeout: 5000,

    headers: {
        Authorization: localStorage.getItem('access_token') 
            ? 'JWT ' + localStorage.getItem('access_token') : null,    
    }
});

axiosInsFormData.interceptors.response.use(
    res => {
        return res;
    },

    async (error) => {
        const config = error.config;
        const serverRes = error.response;

        console.log("Form Data Interceptor was called!");

        if (serverRes.status === 401 && serverRes.statusText === 'Unauthorized' && !config.retry){

            const refreshToken = localStorage.getItem('refresh_token');
            config.retry = true;

            if (refreshToken){
                try {
                    
                    const response = await axiosInstance.post('/token/refresh/',{
                        refresh: refreshToken
                    });

                    const newAccess = await response.data.access;
                    const newRefresh = await response.data.refresh;

                    localStorage.setItem('access_token',newAccess);
                    localStorage.setItem('refresh_token',newRefresh);

                    axiosInstance.defaults.headers['Authorization'] = "JWT " + newAccess;
                    axiosInsFormData.defaults.headers['Authorization'] = 'JWT ' + newAccess;

                    config.headers["Authorization"] = "JWT " + newAccess;

                    return axiosInsFormData(config);

                } catch (refreshError){
                    console.log(refreshError);

                    localStorage.clear();

                    error.frontMsg = {
                        type: 'danger',
                        body: 'Request Failed! perhaps you got Un-authenticated or backend server is not running. Please log in first.'
                    };

                    return Promise.reject(error);

                } 
            } else {

                localStorage.clear();

                error.frontMsg = {
                    type: 'danger',
                    body: 'Request Failed! perhaps you got Un-authenticated or backend server is not running. Please log in first.'
                };
                return Promise.reject(error);
            }
        };

        return Promise.reject(error);
    }
);