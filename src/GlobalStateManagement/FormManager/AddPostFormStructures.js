' -- Byimaan -- '

import { axiosInsFormData } from "../../Axios/FormDataAxios";
// navigate = useNavigate();

export const addPostDraftFormStructure = {
    api : {
        method: 'post',
        url: 'blog/create/',
        submit: (body) => {
            // from here we will submit the form and send to the server
            return new Promise((resolve,reject) => {
                const blogFormData = new FormData();
                body.category = body?.category ? body.category : 'Not Given'
                for (var [k,v] of Object.entries(body)){
                    
                    if (k === 'category'){
                        blogFormData.append('category.name',v);
                        continue;
                    }
                    blogFormData.append(k,v);
                };
                console.log(" -- " + blogFormData)
                axiosInsFormData.post('blog/create/', blogFormData).then( (res) => {
                    return resolve({
                        data: res.data,
                        message:{
                            type: 'success',
                            body: 'Your blog has been successfully uploaded!.'
                        },
                        navigation: {
                            url: '/'
                        }
                    })
                }).catch( (rej) => {
                    return reject({
                        error: rej,
                        message: {
                            type: 'danger',
                            body: 'Oops! Your post request to add blog got failed. '
                        },
                        navigation:null,
                    });
                });
            });
        },
    },
    draftForm: {
        heading: 'ADD POST',
        fields: [
            {
                componentName: 'InputField',
                heading: '- Title',
                name: 'title',
                type: 'text',
                placeholder: 'add title for your post',
            },
            {
                componentName: 'InputField',
                heading: '- Excerpt',
                name: 'excerpt',
                type: 'text',
                placeholder: 'add excerpt',
            },
            {
                componentName: 'SelectInputField',
                heading: '- Post type',
                name: 'status',
            },
            {
                componentName: 'InputField',
                heading: '- Category',
                name: 'category',
                type: 'text',
                placeholder: 'add category',
            },
            {
                componentName: 'TextAreaInputField',
                heading: '- Content',
                name: 'content',
                placeholder: 'add description',
            },
            {
                componentName: 'UrlInputField',
                heading: '- Image-Url',
                name: 'image_url',
                type: 'url',
                placeholder: 'Optional',
            },
            {
                componentName: 'FileInputField',
                heading: '- Choose image',
                name: 'image',
                type: 'file', 
            },
            {
                componentName: 'ButtonInputField',
                type: 'post',
                textContent: 'Add Blog + ',
                color: 'green',
            }
        ]
    }
};
