' -- Byimaan -- '

import React,{useEffect, useState} from "react";
import { useLoadingManager } from "../../GlobalStateManagement/StateManagement/LoadingManager";
import { useMessageManager } from "../../GlobalStateManagement/StateManagement/MessageManager";
import BlogsContainer from "./BlogsContainer";
import { useMenuManager } from "../../GlobalStateManagement/StateManagement/MenuManager";
import { useBlogsManager } from "../../GlobalStateManagement/StateManagement/BlogsManager";
import { useNavigate, useParams } from "react-router-dom";
import { NoBlogsFound } from "./GeneralBlogs";
import '../BlogCss/blogs.css';

export default function SearchedBlogs(){

    const {data} = useParams();

    const useBlogs = useBlogsManager().useBlogsHook;
    const {loadingManager} = useLoadingManager();
    const useMenu = useMenuManager();
    const msgManager = useMessageManager();
    const navigate = useNavigate();

    const [blogs, setBlogs] = useState(null);

    const handleClick = () => {
        loadingManager.loadingDecoration(1000);
        navigate('/')
    }

    useEffect(()=>{

        useMenu.closeMenu();

        if (data) {
            loadingManager.startLoading();

            useBlogs.searchBlogs(data).then( res => {
                console.log('At the search endpoint');
                console.log(data)
                console.log(res.data);

                if (res.data.length > 0){

                    setBlogs(res.data);
                } else if (res.data.length === 0){

                    msgManager.sendGlobalMsg({
                        type: 'warning',
                        body: 'No Matching result found!'
                    });
                };



            }) .catch ( err => {
                console.log('At the search endpoint');
                console.log(err);

                msgManager.sendGlobalMsg({
                    type: 'danger',
                    body: 'Your search request got rejected by server.'
                });
            });
            loadingManager.stopLoading(800);
        };

        return () => {
            setBlogs(null);
        }


    },[data]);

    return (
        <>
        <div className="search-title">
            <h3> Results related to {data} - </h3>

            <h2 onClick={handleClick}> <i className="ri-arrow-go-back-line"></i> Go Back!. </h2>
        </div>
        {blogs ? <BlogsContainer blogs={blogs} showCrudBtns={false}/> : <NoBlogsFound msg={`There is no matching result found related to the '${data}'`}/>}
        </>
    )

}