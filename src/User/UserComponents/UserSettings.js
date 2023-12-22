' -- Byimaan -- '

import React, { useEffect } from "react";
import '../UserCss/settings.css';
import ChangePasswordForm from "./ProfileForms/ChangePassword";
import ChangeUserNameForm from "./ProfileForms/ChangeUserName";
import gsap from "gsap";
import useProfileForms from "../../GlobalStateManagement/CustomHooks/useProfileForms";
import ChangeProfileImgForm from "./ProfileForms/ChangeProfileImg";
import { useRefManager } from "../../GlobalStateManagement/StateManagement/ReferenceManager";
import { useParams } from "react-router-dom";

export default function UserSettings({clickMe}){

    // most of logic to close or open the form is coded in this custom hook.
    const useForms = useProfileForms();
    const refManager = useRefManager();
    let {address} = useParams();

    if (!address){
        address = '/'
    }

    const scrollUpOrDown = (val=0) => {
        window.scrollTo({
            top: val,
            behavior: 'smooth'
        })
    };

    // this will perform the animation to close or open the forms.
    const toggleForms = ({showIt,reference}) => {
        
        if (reference){
            var t1 = gsap.timeline();
    
            if (showIt){
                // this will be executed when user wants to see the form.
                t1.to(reference.current,{
                    top: 0,
                    duration: 1.2,
                    ease: 'power2.inOut',
                    position: 'relative'
                })
            } else{
                // if form needs to get close 
                t1.to(reference.current,{
                    top: '-50vh',
                    duration: 1.5,
                    ease: 'power2.in',
                }).to(reference.current,{
                    position: 'absolute'
                })
            };
        };
    };


    useEffect(()=> {

        clickMe(false,1);

        if (address){
            switch (address) {
                case '/' || '': break;
    
                case 'img': 
                   let targetScroll = refManager.triggerProfileImgForm.current.offsetTop;
                   scrollUpOrDown(targetScroll);
                   toggleForms(useForms.toggleImgForm(true));
                   break;
    
                case 'username':
                    toggleForms(useForms.toggleUserNameForm(true));
                    break;
                case 'password':
                    toggleForms(useForms.togglePasswForm(true));
                    break;
                default: break;        
            };
        };

        
    },[address])

    return(
        <div className="user-settings">

            <div className="setting-field">
                <h1><i className="ri-copyright-line"></i> Byimaan </h1>
            </div>

            <div onClick={() => toggleForms(useForms.toggleImgForm(true))} ref={refManager.triggerProfileImgForm} className="setting-field">
                <h2><i className="ri-image-edit-line"></i> Update profile image.</h2>
                <ChangeProfileImgForm closeMe={() => toggleForms(useForms.toggleImgForm(false))}/>
            </div>

            <div onClick={() => toggleForms(useForms.toggleUserNameForm(true))} className="setting-field">
                <h2><i className="ri-account-box-line"></i> Change profile name</h2>
                <ChangeUserNameForm closeMe={() => toggleForms(useForms.toggleUserNameForm(false))}/>
            </div>

            <div onClick={() => toggleForms(useForms.togglePasswForm(true))} className="setting-field">
                <h2><i className="ri-key-2-fill"></i> Change password</h2>
                <ChangePasswordForm closeMe={() => toggleForms(useForms.togglePasswForm(false))}/>
            </div>

        </div>
    )
};