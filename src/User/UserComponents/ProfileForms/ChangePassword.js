' -- Byimaan -- '

import React from "react";
import '../../UserCss/profile_form.css';
import { useRefManager } from "../../../GlobalStateManagement/StateManagement/ReferenceManager";
import { usePasswordHook } from "../../../GlobalStateManagement/UserDataManager/UserHooks";
import { useMessageManager } from "../../../GlobalStateManagement/StateManagement/MessageManager";
import { axiosInstance } from "../../../Axios/AxiosInstance";

export default function ChangePasswordForm({closeMe}){

    const refManager = useRefManager();
    const msgManager = useMessageManager();

    const [password,setPassword] = usePasswordHook();

    const scrollUp = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    };

    const handleChange = (e) => {
        switch (e.target.name){
            case 'old_password': 
                setPassword.setOld(e.target.value);
                break; 
            ; case 'new_password':
                setPassword.setNew(e.target.value);
                break;    
            ; default : break;
        };
    };

    const handleSubmit = (e) => {
        scrollUp();
        e.preventDefault();

        const checkForm = setPassword.isValid();

        if (!checkForm.ok){
            if (checkForm?.frontMsg){
                msgManager.sendGlobalMsg(checkForm.frontMsg);
            };
            return
        };

        axiosInstance.patch('user/change/password/',password).then(
            res => {
                console.log("request to change the password was accepted.");
                console.log(res);
                msgManager.sendGlobalMsg({
                    type: 'success',
                    body: 'Your request to change the password has been accepted'
                });
            }
        ).catch( rej => {
            console.log("Request to change the password got rejected");
            console.log(rej);

            msgManager.sendGlobalMsg({
                type: 'danger',
                body: 'Request Failed!. your request to change the password got rejected by the server'
            });

            if (rej?.frontMsg){
                msgManager.sendGlobalMsg(rej.frontMsg);
            };
        })

    };

    return (
        <form ref={refManager.settingsPasswForm} id="profile-passw-form" className="profile-form" onSubmit={handleSubmit}>

            <div className="profile-form-cancel">
                <h2><i class="ri-close-line" onClick={() => closeMe()}></i></h2>
            </div>

            <div className="profile-form-field">
                <input type="text" onChange={handleChange} name='old_password' placeholder="Enter old password" required/>
            </div>

            <div className="profile-form-field">
                <input type="text" onChange={handleChange} name='new_password' placeholder="Enter new password" required/>
            </div>
            <button className="profile-form-btn">
                <h2>Request </h2>
            </button>

        </form>
    )
}