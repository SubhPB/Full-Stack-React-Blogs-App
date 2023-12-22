' -- Byimaan -- '

import React, {useContext,createContext, useState} from "react";
import { axiosInstance } from "../../Axios/AxiosInstance";
import { useMessageManager } from "../StateManagement/MessageManager";
import { usePasswordHook } from "./UserHooks";

const userManager = createContext();

export default function UserManagementProvider({children}){

    const msgManager = useMessageManager();
    
    const [passwordState,usePassword] = usePasswordHook();

    const passwordForm = {
        getOldPassword: () => {
            return passwordState.old_password;
        },
        getNewPassword: () => {
            return passwordState.new_password;
        },
        setOldPassword: (data) => {
            usePassword.setOld(data);   
        },
        setNewPassword: (data) => {
            usePassword.setNew(data)
        },
        resetPassword: () => {
            usePassword.reset();
        },
        checkIfValid: () => {
            const oldP = passwordState.old_password;
            const newP = passwordState.new_password;

            if (oldP.length === 0 || newP.length === 0){
                msgManager.sendGlobalMsg({
                    type: 'warning',
                    body: 'Both input fields are required to be filled.'
                });
                return false;
            } else if (oldP === newP){
                msgManager.sendGlobalMsg({
                    type: 'warning',
                    body: 'The old password should be different from new one'
                });
                return false;
            } else if (newP.length < 4){
                msgManager.sendGlobalMsg({
                    type: 'warning',
                    body: 'The given password is too short'
                });
                return false
            } else {
                return true
            }
        },
        submitRequest: async () => {

            return new Promise((resolve,reject) => {

                if (!passwordForm.checkIfValid()){
                    return reject({
                        'error': 'Given Data is not valid!'
                    })
                };
                try{
                    axiosInstance.patch(
                        'user/change/password/',passwordState
                    ).then ( res => {
                        console.log("Successfully changed password!");
                        console.log(res);

                        return resolve({
                            data: res
                        });

                    }).catch( err => {
                        console.log("Request got Failed to change the password");
                        console.log(err);

                        return reject({
                            error: err
                        });
                    });
                } catch {
                    err => {
                        console.log("Request Falied due to following reason");
                        console.log(err);

                        return reject({
                            error: err
                        });
                    };
                };
            });
        },
    };

    return (
        <userManager.Provider value={{passwordForm}}>
            {children}
        </userManager.Provider>
    )
};


export const useUserManager = () => {
    return useContext(userManager);
}