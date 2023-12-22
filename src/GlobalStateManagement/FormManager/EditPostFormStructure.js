' -- Byimaan -- '

import { axiosInsFormData } from "../../Axios/FormDataAxios";
import { addPostDraftFormStructure } from "./AddPostFormStructures";


export const editPostDraftFormStructure = (editableBlog) => {


    const blogFields = addPostDraftFormStructure.draftForm.fields.map( (field,index) => {
        if (Object.keys(editableBlog).includes(field.name)){
            if (field.componentName === "ButtonInputField"){
                field.textContent = 'Update Blog'
            }
            field.value = editableBlog[field.name];
        };        
        return field
    });

    return {
        api: {
            method: 'patch',
            url: `personal/${editableBlog.id}/blogs/`,
            submit: (body) => {
                // later
                return new Promise((resolve,reject) => {
                    console.log('This is what you submitted!.')
                    return resolve({
                        'data': body
                    })
                })
            }
        },
        draftForm: {
            heading: 'EDIT POST',
            fields : blogFields
        }
    }
} 