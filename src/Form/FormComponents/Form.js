' -- Byimaan -- '

import React, {useEffect} from "react";
import '../FormCss/form.css';
import { InputField, EmailInputField, PasswordInputField, UrlInputField,
     TextAreaInputField, ButtonInputField, FileInputField,
      SelectInputField } from "./FormSubComponts";
import { useAuthManager } from "../../GlobalStateManagement/AuthenticationManagement/AuthManager";
import { useFormManager } from "../../GlobalStateManagement/FormManager/FormStateManager";
import { useMessageManager } from "../../GlobalStateManagement/StateManagement/MessageManager";
import { useLoadingManager } from "../../GlobalStateManagement/StateManagement/LoadingManager";
import { useMenuManager } from "../../GlobalStateManagement/StateManagement/MenuManager";
import { useNavigate } from "react-router-dom";
import { useBlogsManager } from "../../GlobalStateManagement/StateManagement/BlogsManager";

/* ' -- This single form will be enough to do all the crud operations -- '
   ' --- like ->  user (creating and updating the user data ) ,blogs (create, patch, delete) --- ' */
      
export default function DynamicForm({formStructure}){

    const {loadingManager} = useLoadingManager();
    const authManager = useAuthManager();
    const msgManager = useMessageManager();
    const useMenu = useMenuManager();
    const navigate = useNavigate();
    const useBlogs = useBlogsManager().useBlogsHook;

    const {formData, initializeFormState, updateForm, resetForm} = useFormManager();

    const formFields = formStructure.draftForm.fields;
    
    const initialStateOfForm = formStructure.draftForm.initialState;

    const handleSubmit = async (event) => { 

        /* All the submission logic is done in the formSturture.api.submit(formToSubmit). Why! because this form 
           will be used for the all the crud operations related to user and blogs. */

        event.preventDefault();

        // Make sure to understand the formStructure. Most of the logic is written in there.
        formStructure.api.submit(formData).then( (res) => {

            if (formStructure.api.url === 'token/' || formStructure.api.url === 'user/register/'){
                updateAuthIfLogIn(res.data);
                if (res.navigation.url){
                    // why we do not use useNavigate here.
                    // -> because, after updating the authentication state it is really important to refresh the page.
                    // -> So, we can avoid the unexpected behaviors.
                    window.location.href = '/';
                };
            };
            
            msgManager.sendGlobalMsg(res.message);

            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });

            if (formStructure.api.url === 'blog/create/'){
                
                useBlogs.addBlog(res?.data);
                
                if (authManager.isAuthenticated()){
                    navigate('/user/profile/')
                } else {
                    navigate('/');
                }
            };


        }).catch((rej) => {

            console.log(rej.error);
            msgManager.sendGlobalMsg(rej.message);

            if (rej.navigation?.url || null){
                loadingManager.loadingDecoration(1500);
                navigate(rej.navigation.url);
            } 
        })
    }; 

    // if the purpose of the form was to login or signup the user.
    const updateAuthIfLogIn = (response) => {
        const accessToken = response.data.access;
        const refreshToken = response.data.refresh;
        authManager.doLogin(accessToken,refreshToken);
    };
    

    useEffect(()=>{
    
        // Make sure to close menu if left open from the previous component.
        useMenu.closeMenu();

        loadingManager.loadingDecoration(1200);
        initializeFormState(initialStateOfForm);

        return () =>{
            resetForm();
            useMenu.closeMenu();
        };
    },[]);


    return (
        <div id="form-wrapper">
            <form action="#" onSubmit={handleSubmit} id='dynamic-form'>
                <div className="form-heading">
                    <h2>{formStructure.draftForm.heading}</h2>
                </div>
                {
                   formFields.map((field) => componentSwitcher(field, updateForm, formData))
                }
            </form>
        </div>
    )
};

function componentSwitcher(field, updateForm,formData){
    switch (field.componentName){

        case 'InputField': return <InputField data={field} handleChange={updateForm} formState={formData}/>;
        case 'EmailInputField': return <EmailInputField data={field} handleChange={updateForm} formState={formData}/>;
        case 'SelectInputField': return <SelectInputField  data={field} handleChange={updateForm} formState={formData}/>;
        case 'PasswordInputField': return <PasswordInputField  data={field} handleChange={updateForm} formState={formData}/>;
        case 'TextAreaInputField': return <TextAreaInputField  data={field} handleChange={updateForm} formState={formData}/>; 
        case 'UrlInputField': return <UrlInputField  data={field} handleChange={updateForm} formState={formData}/>;
        case 'FileInputField': return <FileInputField  data={field} handleChange={updateForm} formState={formData}/>;
        case 'ButtonInputField': return <ButtonInputField  data={field}/>;

    }
};
