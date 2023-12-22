' -- Byimaan -- '

import React,{createContext,useContext,useRef} from "react";

const referenceManager = createContext();

// This can be very useful to change the DOM properties of parent component from the child components.
// Really Awesome!. we can change the properties from anywhere.
export const ReferenceManagementProvider = ({children}) => {

    const references = {
        appRef: useRef(null),
        navbarRef: useRef(null),
        menuRef: useRef(null),
        navbarSearchRef: useRef(null),
        settingsPasswForm: useRef(null),
        settingsUserNameForm: useRef(null),
        settingsUserImageForm: useRef(null),
        triggerProfileImgForm: useRef(null)
    };

    return (
        <referenceManager.Provider value={references}>
            {children}
        </referenceManager.Provider>
    )
};

export const useRefManager = () => {
    return useContext(referenceManager);
};