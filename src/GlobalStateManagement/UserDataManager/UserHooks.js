' -- Byimaan -- '

import { useState } from "react";

// this will be triggered whenenver user tries to fill the form to change the password
export function usePasswordHook(){
    const initialStatePwd = {
        'old_password': '',
        'new_password': ''
    };

    const [password,setPassword] = useState(initialStatePwd);

    const resetPasswordForm = () => {
        setPassword(initialStatePwd);
    };

    const setOldPassword = (data) => {
        setPassword({
            ...password,
            'old_password': data
        });
    };

    const setNewPassword = (data) => {
        setPassword({
            ...password,
            'new_password': data
        });
    };

    const usePassword = {
        setNew: (data) => {
            setNewPassword(data)
        },
        setOld: (data) => {
            setOldPassword(data);
        },
        reset: () => {
            resetPasswordForm();
        },
        isValid: () => {

            const oldP = password.old_password;
            const newP = password.new_password;


            if (oldP === newP || oldP.length === 0 || newP.length === 0 ){
                const msg = {
                    type: 'warning',
                    body: 'The given passwords are not valid. These needs to different for security concerns.'
                };
                return {
                    ok: false,
                    frontMsg: msg
                };
            };

            if (newP.length < 4){
                const msg = {
                    type: 'warning',
                    body: 'Not Valid!. Your password is too short.'
                }
                return {
                    ok: false,
                    frontMsg: msg
                };
            };

            return {
                ok: true,
            };
        }
    };

    return [password,usePassword];
}

