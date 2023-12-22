' -- Byimaan -- '

import React from "react";
import '../UserCss/settings_passw.css';
import { useRefManager } from "../../GlobalStateManagement/StateManagement/ReferenceManager";

export default function SettingsPassword(){

    const refManager = useRefManager();

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(e);
    };
    return (
        <form ref={refManager.settingsPasswForm} className="passw-form" onSubmit={handleSubmit}>

            <div className="passw-field">
                <input type="text" name='old_password' placeholder="Enter old password"/>
            </div>
            <div className="passw-field">
                <input type="text" name='new_password' placeholder="Enter new password"/>
            </div>
            <button className="passw-btn">
                <h2>Request </h2>
            </button>

        </form>
    )
}