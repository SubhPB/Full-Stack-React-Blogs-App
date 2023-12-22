' -- Byimaan -- '

import { loginFormStructure } from "./LoginFormStructure";
import { axiosInsFormData } from "../../Axios/FormDataAxios";

export const signUpFormStructure = {
    api: {
        method: 'post',
        url: 'user/register/',
        submit: (body) => {

            return new Promise((resolve,reject) => {
                const UserFormData = new FormData();

                for(var [k,v] of Object.entries(body)){
                    UserFormData.append(k,v);
                };

                axiosInsFormData.post('/user/register/',UserFormData).then((res) => {
                    return resolve({
                        data: res,
                        message: {
                            type: 'success',
                            body: 'Your Account has been created. Thanks!'
                        },
                        navigation: {
                            url: '/user/profile/',
                        }
                    })
                }).catch((err) => {
                    return reject({
                        error: err,
                        message: {
                            type: 'warning',
                            body: 'Error! Make sure you are putting the valid data.'
                        },
                        navigation: null
                    });
                });
            });
        },
    },
    draftForm: {

        initialState: {
            email: '',
            user_name: '',
            password: '',
            // user_image: null,
        },

        heading: 'SIGN-UP',

        fields: [
            {
                componentName: 'EmailInputField',
                heading: '- Email',
                name: 'email',
                type: 'email',
                placeholder: ' Email is required.',
            },
            {
                componentName: 'InputField',
                heading: '- Username',
                name: 'user_name',
                type: 'text',
                placeholder: ' Username is required.',
            },
            {
                componentName: 'FileInputField',
                heading: '- Choose profile picture ',
                name: 'user_image',
                type: 'file', 
            },
            {
                componentName: 'PasswordInputField',
                heading: '- password',
                name: 'password',
                type: 'password',
                placeholder: ' The password length should be more than 4. ',
            },
            {
                componentName: 'ButtonInputField',
                type: 'post',
                textContent: 'SignUp!',
                color: 'green',
            }
        ]    
    }
};