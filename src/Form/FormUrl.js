' -- Byimaan -- '

import React from "react";
import { Routes, Route } from "react-router-dom";
import FormManagementProvider from "../GlobalStateManagement/FormManager/FormStateManager";
import Form from './FormComponents/Form';
import { addPostDraftFormStructure } from "../GlobalStateManagement/FormManager/AddPostFormStructures";
import { loginFormStructure } from "../GlobalStateManagement/FormManager/LoginFormStructure";
import { signUpFormStructure } from "../GlobalStateManagement/FormManager/SignupFormSturucture";

export default function FormUrl(){

    return (

        <FormManagementProvider>
        
            <Routes>
                
                <Route path='/user/login' element={<Form formStructure={loginFormStructure}/>}></Route>

                <Route path='/user/signup' element={<Form formStructure={signUpFormStructure}/>}></Route>

                <Route path='/blogs/add' element={<Form formStructure={addPostDraftFormStructure}/>}></Route>

            </Routes>
          

        </FormManagementProvider>
    );

};