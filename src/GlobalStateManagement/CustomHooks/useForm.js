' -- Byimaan -- '

import { useState } from "react";
import { axiosInsFormData } from "../../Axios/FormDataAxios";


class FormError{
    constructor(msg='There is an error in the form!.'){
        this.msg = msg
    };

    send(){
        throw new Error(this.msg);
    }

    keyNotExist(key = 'key'){
        throw new Error(`Given ${key} does not exist in the form.`)
    };

    wrongDataType(){
        throw new Error("The given data type is not allowed for initializing the state of form!")
    };
}

export default function useFormHook(val={}){

    const [formState,setFormState] = useState(val);

    const initializeState = (state) => {
        if (typeof(state) !== 'object' || Array.isArray(state)){
            throw new FormError.wrongDataType();
        }
        setFormState(state);
    };

    const setField = (key,value) => {

        setFormState({
            ...formState,
            [key]: value
        })
    };

    const doesKeyExist = (key) => {
        if (formState.hasOwnProperty(key)){
            return true
        };
        return false;
    }

    const deleteField = (key) => {
        if (doesKeyExist(key)){
            const newState = {...formState};
            delete newState[key];
            setFormState(newState);
            return
        };
    };

    const resetForm = () => {
        setFormState({});
    };

    const formIsEmpty = (form=formState) => {
        return Object.keys(form).length === 0;
    };

    const fieldIsEmpty = (key) => {
        key = key.trim();
        if (doesKeyExist(key)){
            return Object.keys(formState[key]).length === 0
        };
        throw new FormError.keyNotExist(key);
    };

    const getKeyValue = (key) => {
        if (doesKeyExist(key)){
            return formState[key]
        };
        return new FormError.keyNotExist();
    };

    const filterForm = () => {
        const newState = {...formState};
        if (!formIsEmpty()){
            for (let [key,val] of Object.entries(formState)){
                try{
                    if(fieldIsEmpty(key)){
                        continue;
                    } else{
                        newState[key] = val;
                    }
                } catch (keyNotExist){
                    continue;
                }
            };
            if (formIsEmpty(newState)){
                return false;
            };

            setFormState(newState);
            return newState;
        };
        return false;
    }

    const submitForm = async(apiInfo) => {
        // axiosIns is based on the form data

        if (!apiInfo?.url && !apiInfo?.method){
            // In the rare case, this error will happen due to the developer's fault
            throw new Error('Api address and method is reqired to make apin call')
        };

        if (!filterForm()){
            return new Promise((res,rej) => {
                // this error will happen if the form is not filterted from the userEnd or from the frontend logic.
                return rej({
                    error: 'The form is not valid for submission',
                    frontMsg: {
                        type: 'warning',
                        body: 'The form is not valid for submission',
                    }
                });
            });
        };

        return new Promise(async(res,rej) => {
            try{
                const getResponse = () => {
                    const formData = new FormData();

                    for (var [key,val] of Object.entries(formState)){
                        formData.append(key,val)
                    };

                    if (apiInfo.method === 'patch'){
                        return  axiosInsFormData.patch(apiInfo.url,formData);
                    } else if (apiInfo.method === 'post'){
                        return axiosInsFormData.post(apiInfo.url,formData);
                    }
                };

                const response = await getResponse(apiInfo.url)

                response.frontMsg = {
                    type: 'success',
                    body: ' Your form request got accepted! '
                };

                console.log(response.frontMsg.body);
                console.log(response);

                return res(response);
            } catch (formSubmissionErr) {

                formSubmissionErr.frontMsg = {
                    type: 'danger',
                    body: ' Oops! Your form request got rejected'
                };

                console.log(formSubmissionErr);

                return rej(formSubmissionErr);
            };
        });
    }

    const useForm = {
        initializeState: initializeState,
        setField: setField,
        doesKeyExist: doesKeyExist,
        deleteField: deleteField,
        resetForm: resetForm,
        formIsEmpty: formIsEmpty,
        fieldIsEmpty: fieldIsEmpty,
        getKeyValue: getKeyValue,
        filterForm: filterForm,
        submitForm: submitForm,
    };

    return [formState,useForm];

}



