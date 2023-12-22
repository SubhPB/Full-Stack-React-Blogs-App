// ' -- Byimaan -- '

// import axios from "axios";
// import { axiosInstance } from "./AxiosInstance";
// axiosInstance.interceptors.response.use(
//     res => {
//         return res;
//     },

//     async (error) => {

//         const config = error.config;
//         const serverRes = error.response;

//         console.log("Interceptor was called!");

//         if (serverRes.status === 401 && serverRes.statusText === 'Unauthorized' && !config.retry){
//             // retry ensures that make the api callback only once
//             config.retry = true;

//             const refreshToken = localStorage.getItem('refresh_token');

//             if (refreshToken){

//                 try{
//                     console.log('sending api call for new access token');

//                     const response = await axiosInstance.post('token/refresh/');

//                     const newRefreshToken = await response.data.get('refresh');
//                     const newAccessToken = await response.data.get('access');

//                     localStorage.setItem('refresh_token',newRefreshToken);
//                     localStorage.setItem('access_token',newAccessToken);

//                     axiosInstance.defaults.headers['Authorization'] = 'JWT ' + newAccessToken;
//                     config.defaults.headers['Authorization'] = 'JWT ' + newAccessToken;

//                     return axiosInstance(config);

//                 } catch (refreshError){
//                     console.log(refreshError);

//                     //  make user unauthenticated by clearing the local storage
//                     localStorage.clear();

//                     error.frontMsg = {
//                         type: 'danger',
//                         body: 'Request Failed! perhaps you got Un-authenticated or backend server is not running. Please log in first.'
//                     };

//                     return Promise.reject(error)
//                 }
//             } else {
//                 // user do not have refresh token so make him un-authenticated

//                 localStorage.clear();

//                 error.frontMsg = {
//                     type: 'danger',
//                     body: 'Request Failed! perhaps you got Un-authenticated or backend server is not running. Please log in first.'
//                 };

//                 return Promise.reject(error);
//             };
//         };

//         localStorage.clear();
//         return Promise.reject(error);

//     }
// )