' -- Byimaan -- '

import { useState } from "react";
import { useRefManager } from "../StateManagement/ReferenceManager";

export default function useProfileForms(){

    const refManager = useRefManager();

    const [showImgForm,setImgForm] = useState({
        showIt: false,
        reference: refManager.settingsUserImageForm
    });

    const [showPasswForm,setPasswForm] = useState({
        showIt: false,
        reference: refManager.settingsPasswForm
    });
    const [showUserNameForm, setUserNameForm] = useState({
        showIt: false,
        reference: refManager.settingsUserNameForm
    });

    const useMe = {

        globalState: () => {
            return [showImgForm,showPasswForm,showUserNameForm]
        },

        // if val is not given it will work as a toggle.
        // if val is true then it will display the form 
        // if val is false then it will close the form
        toggleImgForm : (val= !showImgForm.showIt) => {

            // As Object is a non primitive. So the following if statement will avoid the unneccessary rendering.
            if (val === showImgForm.showIt){
                return {
                    showIt: false,
                    reference: null
                }
            };

           
            const state = {
                ...showImgForm,
                showIt: val
            };

            setImgForm(state);
            return state;
        },

        togglePasswForm : (val= !showPasswForm.showIt) => {

            if (val === showPasswForm.showIt){
                return {
                    showIt: false,
                    reference: null
                }
            };

            const state = {
                ...showPasswForm,
                showIt: !showPasswForm.showIt
            };
            setPasswForm(state);
            return state
        },

        toggleUserNameForm: (val= !showUserNameForm.showIt) => {

            if (val === showUserNameForm.showIt){
                return {
                    showIt: false,
                    reference: null
                }
            };           
            const state = {
                ...showUserNameForm,
                showIt: val
            };
            setUserNameForm(state);
            return state;
        }
    };

    return useMe;

}    