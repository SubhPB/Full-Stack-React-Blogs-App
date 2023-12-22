' -- byimaan -- '

import axios from "axios";

const baseURL = 'http://127.0.0.1:8000/api/';

' -- if the user is unauthenticated then this api can be used to get the read only data -- '

export const readOnlyAxiosInstance = axios.create({
    baseURL: baseURL,

    timeout: 5000,
})