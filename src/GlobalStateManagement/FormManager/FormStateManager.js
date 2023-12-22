' -- Byimaan -- '

import React, {createContext,useContext,useState} from "react";

const formStateManager = createContext();

export default function FormManagementProvider({children}){

    /* 
    -- Byimaan --
    Initial state is unknown until we do not know the type of form.
    Initial state for each form like (login, signup and for any other crud operation for blogs)
       will be different so that can be initialized with the ' initializeFormState '
    */

    var initialState = null;

    const [formData, updateFormData] = useState(initialState);

    const initializeFormState = (state) => {
        initialState = state;
        updateFormData(initialState);
    };  

    const updateForm = (key,value) => {
        updateFormData({
            ...formData,
            [key]: value
        })
    };

    const resetForm = () => {
        updateForm({
            initialState
        });
    };

    return (
        <formStateManager.Provider value={{formData,initializeFormState,updateForm,resetForm}}>
            {children}
        </formStateManager.Provider>
    );  
};

export function useFormManager() {
    return useContext(formStateManager);
}