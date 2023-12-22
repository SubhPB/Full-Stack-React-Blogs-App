' -- Byimaan -- '

import React, {useState, useEffect} from "react";
import '../BlogCss/blogs.css';
import BlogsContainer from "./BlogsContainer";
import { NoBlogsFound } from "./GeneralBlogs";
import { useNavigate } from "react-router-dom";

export default function PersonalBlogs({blogs}){

    if (blogs.length === 0){
        return (
            <ZeroPersonalBlogs/>
        )
    };
    return (
        blogs ? <BlogsContainer blogs={blogs} showCrudBtns={true}/> : <NoBlogsFound/>
    );
};

export function ZeroPersonalBlogs({
       info={
        heading1:'You have not posted any blog yet.',
        heading2: " Get Started! ",
        heading3: '+ Add Blog Right Now!',
        url: '/form/blogs/add',
       }
    }){


    // if user have no personal blogs

    const navigate = useNavigate();

    return (
        <div className="zero-blogs">
            <h1>{info.heading1}</h1>
            <h1> {info.heading2} </h1>
            {
                info.url
                  && 
                <button onClick={() => navigate(info.url)}><h2> {info.heading3} </h2></button>
            }
        </div>
    )
}