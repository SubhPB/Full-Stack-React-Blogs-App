' -- Byimaan -- '

import React from "react";
import '../../UserCss/user_blog.css';
import EditBlogField from "./BlogFields";

export default function BlogUpdate({blog=null}){

    if (!blog){
        return(
            <p>
                this is the blog update view.
            </p>
        );
    };   

    return (
        <div className="blog-update">

            <EditBlogField value={blog[0].title} name={'title'} blogId={blog[0].id}/>

            <EditBlogField value={blog[0].excerpt} name={'excerpt'} blogId={blog[0].id}/>

            <EditBlogField value={blog[0].content} name={'content'} blogId={blog[0].id}/>

            <EditBlogField value={blog[0].image_url} name={'image_url'} blogId={blog[0].id}/>

            <EditBlogField name={'image'} blogId={blog[0].id}/>

        </div>
    )
}