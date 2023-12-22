' -- Byimaan --'

import React, {useState} from "react";
import DynamicForm from "../../../Form/FormComponents/Form";
import { editPostDraftFormStructure } from "../../../GlobalStateManagement/FormManager/EditPostFormStructure";
import { useParams } from "react-router-dom";
import { ZeroPersonalBlogs } from "../../../Blogs/BlogComponents/PersonalBlogs";

export default function CrudBlog({blogs}){

    let {id} = useParams();
    
    const [blog,setBlog] = useState(blogs.filter( item => item.id === id)[0])

    if (!blog){
        const info = {
            heading1: 'Please Go back or create a new one.',
            heading2: 'No Blog Found to update!',
            heading3: '+ Add Blog Right Now!',
            url: '/form/blogs/add',
        };

        return <ZeroPersonalBlogs info={info}/>
    }

    console.log("Have blog")
    return (
        <>
        {
            blog.map( val => <p> {blog[val]} </p>)
        }
        </>
    )


}