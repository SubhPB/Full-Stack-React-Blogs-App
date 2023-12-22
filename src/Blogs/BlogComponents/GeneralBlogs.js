' -- Byimaan -- '

import React, {useState, useEffect} from "react";
import '../BlogCss/blogs.css';
import { useLoadingManager } from "../../GlobalStateManagement/StateManagement/LoadingManager";
import { useMessageManager } from "../../GlobalStateManagement/StateManagement/MessageManager";
import BlogsContainer from "./BlogsContainer";
import { useMenuManager } from "../../GlobalStateManagement/StateManagement/MenuManager";
import { useBlogsManager } from "../../GlobalStateManagement/StateManagement/BlogsManager";

export default function GeneralBlogs(){

    const [blogs,setblogs] = useState(null);
    const {loadingManager} = useLoadingManager();
    const msgManager = useMessageManager();
    const useMenu = useMenuManager();
    const blogsManager = useBlogsManager();

    useEffect(()=>{

        loadingManager.startLoading();

        // closing menu just to ensure if it is left open 
        useMenu.closeMenu();

        if (blogsManager.useBlogsHook.getBlogsType() !== 'general' || !blogsManager.useBlogsHook.haveBlogs()){
            blogsManager.getGeneralBlogs().then( res => {
                setblogs(res.blogs)
            }).catch( rej => {
                setblogs(null);
                if(rej?.frontMsg){
                    msgManager.sendGlobalMsg(rej.frontMsg);
                };
            })
        } else if (blogsManager.useBlogsHook.getBlogsType() === 'general' && blogsManager.useBlogsHook.haveBlogs()){
            setblogs(blogsManager.useBlogsHook.getBlogs());
        } else{
            setblogs(null);
        }

        loadingManager.stopLoading(1000);
    },[]);

    // showCrudbtns tells the BlogCard that can an user use the delete and patch buttons to edit the blog.
    // In the case of general blogs it is false.
    return (
        blogs ? <BlogsContainer blogs={blogs} showCrudBtns={false}/> : <NoBlogsFound/>
    );
};

export function NoBlogsFound({msg=false}){
    return (
        <div className="no-blog-found">
            {msg && <h1 className='no-blog-custom-msg'> {msg} </h1>}
            <h1><i className="ri-emotion-sad-line"></i> Sorry No Blogs Found!. </h1>
        </div>
    )
};

