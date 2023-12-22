' -- Byimaan -- '

import React, { useState } from "react";
import '../../UserCss/profile_form.css';
import { useRefManager } from "../../../GlobalStateManagement/StateManagement/ReferenceManager";
import {axiosInsFormData} from '../../../Axios/FormDataAxios';
import { useMessageManager } from "../../../GlobalStateManagement/StateManagement/MessageManager";
import { useBlogsManager } from "../../../GlobalStateManagement/StateManagement/BlogsManager";


export default function ChangeProfileImgForm({closeMe}){

    const refManager = useRefManager();
    const [image,setImage] = useState(null);
    const msgManager = useMessageManager();
    const blogsManager = useBlogsManager();
    const useBlogs = blogsManager.useBlogsHook;
    
    const handleImgChange = (e) => {
        setImage(e.target.files[0])
    };

    const scrollUp = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        scrollUp();
        if (image === null){
            const msg = {
                type: 'warning',
                body: 'Invalid Request!. Please provide an image before submitting'
            };
            msgManager.sendGlobalMsg(msg);
            return;
        }
        
        const formData = new FormData();
        formData.append('user_image',image)

        axiosInsFormData.patch('user/update/', formData).then ( res => {

            console.log(res)
            const msg = {
                type: 'success',
                body: 'Your profile has been updated.'
            };

            useBlogs.updateUserInfo('user_image',res?.data?.user_image);

            msgManager.sendGlobalMsg(msg);
            closeMe();
        }).catch( rej => {
            console.log("Request to update the profile was rejected");
            console.log(rej);
            if (rej?.frontMsg){
                msgManager.sendGlobalMsg(rej.frontMsg);
            };
            closeMe();
        });
        window.location.reload();
    };
    return (
        <form ref={refManager.settingsUserImageForm} id="profile-image-form" className="profile-form" onSubmit={handleSubmit}>

            <div className="profile-form-cancel">
                <h2><i class="ri-close-line" onClick={() => closeMe()}></i></h2>
            </div>

            <div className="profile-hide-input">
                <input onChange={handleImgChange} type="file" name='user_image' id='change-img-input' accept="image/*"/>
            </div>

            <button className="profile-form-btn" type='submit'>
                <h2>Select Image</h2>
            </button>

        </form>
    )
}