' -- Byimaan -- '

import React, {  useState } from "react";
import '../../UserCss/profile_form.css';
import { useRefManager } from "../../../GlobalStateManagement/StateManagement/ReferenceManager";
import { useMessageManager } from "../../../GlobalStateManagement/StateManagement/MessageManager";
import { axiosInsFormData } from "../../../Axios/FormDataAxios";
import { useBlogsManager } from "../../../GlobalStateManagement/StateManagement/BlogsManager";

export default function ChangeUserNameForm({closeMe}){

    const refManager = useRefManager();
    const [username,setUsername] = useState(null);
    const msgManager = useMessageManager();
    const blogsManager = useBlogsManager();
    const useBlogs = blogsManager.useBlogsHook;

    const handleChange = (e) => {
        setUsername(e.target.value);
    };

    const scrollUp = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        scrollUp();
        if (username.length < 4){
            const msg = {
                type: 'warning',
                body: 'Please give a valid username. Length is too short!'
            };
            msgManager.sendGlobalMsg(msg);
            return
        };

        const formData = new FormData();

        formData.append('user_name',username);

        axiosInsFormData.patch('user/update/', formData).then(
            res => {
                console.log(res);
                const msg = {
                    type: 'success',
                    body: 'Your username has been updated'
                };
                useBlogs.updateUserInfo('user_name',username)
                msgManager.sendGlobalMsg(msg);
            }
        ).catch ( rej => {

            console.log("The Request to change the user name was rejected!");
            console.log(rej);
            if (rej?.frontMsg){
                msgManager.sendGlobalMsg(rej.frontMsg);
            };

        });
        window.location.reload();
    };

    return (
        <form ref={refManager.settingsUserNameForm} id="profile-username-form" className="profile-form" onSubmit={handleSubmit}>
            <div className="profile-form-cancel">
                <h2><i class="ri-close-line" onClick={() => closeMe()}></i></h2>
            </div>


            <div className="profile-form-field">
                <input onChange={handleChange} type="text" name='user_name' placeholder="Enter new username"/>
            </div>

            <button className="profile-form-btn">
                <h2>Request </h2>
            </button>

        </form>
    )
}