' -- Byimaan -- '

import React from "react";
import { Routes, Route, useParams } from "react-router-dom";
import BlogUpdate from "./BlogUpdate";
import BlogAdd from "./BlogAdd";
import BlogView from "./BlogView";
import { ZeroPersonalBlogs } from "../../../Blogs/BlogComponents/PersonalBlogs";
import BlogDelete from "./BlogDelete";
import '../../UserCss/user_blog.css';

export default function UserBlog({blogs=null}){

    /* 

     This component is responsilble to add, view and updating the user's blog 

     '/user/profile/blog' ----> for adding the post/blog.
     '/user/profile/:task/:id  ----> task can be equal to 'view', 'update' , 'add', 'delete'

    */

    let {id} = useParams();
    let {task} = useParams();

    if (task && blogs && id){

        const blog = blogs.filter( blog => blog.id == id);

        if (blog.length === 0){
            const info = {
                heading1:' Invalid blog Id! ',
                heading2: " No Blog Found to " + task,
                heading3: '+ Add Blog Right Now!',
                url: '/form/blogs/add',
               }  
            return (
                <ZeroPersonalBlogs info={info}/>
            );   
        };

        switch (task){
          
            case 'update': 
                return (
                    <div className="user-blog">
                        <BlogUpdate blog={blog}/>
                    </div>
                );
            case 'delete': 
                return (
                    <div className="user-blog">
                         <BlogDelete blog={blog}/>  
                    </div>
                );
            default : 
                return (
                    <div className="user-blog">
                        <BlogAdd/>
                    </div> 
                );          
        };
    };

    return (

        <div className="user-blog">
            <Routes>

               <Route path="/" element={<BlogAdd/>}></Route>

            </Routes>
        </div>

    )
}