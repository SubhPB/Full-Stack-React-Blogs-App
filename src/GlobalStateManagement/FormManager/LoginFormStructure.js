' -- Byimaan -- '

import { axiosInstance } from "../../Axios/AxiosInstance";

export const loginFormStructure = {
    api: {
        method: 'post',
        url: 'token/',
        submit: (body) => {

            return new Promise((resolve,reject) => {
                axiosInstance.post('token/',body).then(
                    (res) => {

                        return resolve({
                            data:res,
                            message: {
                                type: 'success',
                                body: 'You are successfully logged In!.'
                            },
                            navigation:{
                                /* if we want to go to other page after the successfull response give url path 
                                   or Instead return null to stay on the same page */
                                url: '/',
                            }
                        })
                    }
                ). catch( (rej) => {

                    return reject({
                        error: rej,
                        message: {
                            type: 'danger',
                            body: 'Your authentication has been failed!.'
                        },
                        navigation: null,
                    });

                });
            });
        },
    },
    draftForm: {
        heading: 'LOGIN',

        initialState: {
            email: '',
            user_name: '',
            password: ''
        },

        fields: [
            {
                componentName: 'EmailInputField',
                heading: '- Email',
                name: 'email',
                type: 'email',
                placeholder: 'anonymous@gmail.ca',
            },
            {
                componentName: 'InputField',
                heading: '- Username',
                name: 'user_name',
                type: 'text',
                placeholder: ' - Byimaan - ',
            },
            {
                componentName: 'PasswordInputField',
                heading: '- password',
                name: 'password',
                type: 'password',
                placeholder: ' not given ',
            },
            {
                componentName: 'ButtonInputField',
                type: 'post',
                textContent: 'Login',
                color: 'green',
            }
        ]
    },
};

