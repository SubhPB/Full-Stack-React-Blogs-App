' -- Byimaan -- '

import React, {useRef} from "react";
import { Routes, Route } from "react-router-dom";
import '../UserCss/workarea.css';
import PersonalBlogs from "../../Blogs/BlogComponents/PersonalBlogs";
import UserSettings from "./UserSettings";
import { useNavigate } from "react-router-dom";
import { useLoadingManager } from "../../GlobalStateManagement/StateManagement/LoadingManager";
import UserBlog from "./UserBlog/UserBlog";


export default function UserWorkArea({data}){

    return(
        <div className="workarea">
            {/* This is just gives the options to user where he wants to go 'settings' or 'posts' */}
            <FeatureBtns data={data}/>
        </div>
    )
};

function FeatureBtns({data}){

    const parentRef = useRef(null);
    const navigate = useNavigate();
    const {loadingManager} = useLoadingManager();
    
    function handleClick(e){

        loadingManager.loadingDecoration(1200);
        parentRef.current.childNodes.forEach( btn => {
            if ( e.target.closest('.btn') === btn ){

                btn.style.borderBottom = '3.2px solid coral';
                btn.style.opacity = 1;

                switch(btn.dataset.id){
                    case 'user-posts': {
                        navigate('/user/profile');
                        break;
                    } case 'user-settings' : {
                        navigate('/user/profile/settings');
                        break;
                    } case 'user-blog': {
                        navigate('/user/profile/blog');
                        break;
                    };
                    default: { navigate('/user/profile');
                        break; 
                    }
                };
            } else{

                btn.style.borderBottom = 'none';
                btn.style.opacity = 0.64;

            };
        });
    };

    const clickMeWhenSettingsrender = (unMount=false,index=0) => {
        // why we are doing this.
        // we need to update the state of element which is second child of parent ref
        // So that can change it's style properties if user reach the settings url without clicking the childNodes of parent.

        if (unMount){
            parentRef.current.childNodes[0].click();
            return;
        }
        parentRef.current.childNodes[index].click();
    };

    return (
        <>
            <div ref={parentRef} className="feature-btns">
                <div  onClick={handleClick} data-id="user-posts" className="btn">
                    <h2><i className="ri-stack-line"></i>Your Posts</h2>
                </div>
                <div  onClick={handleClick} data-id="user-settings" className="btn">
                    <h2><i className="ri-settings-4-line"></i>Settings</h2>
                </div>
                <div  onClick={handleClick} data-id="user-blog" className="btn">
                    <h2><i className="ri-article-fill"></i> Blog</h2>
                </div>
            </div>

            <Routes>

                <Route path='' element={<PersonalBlogs blogs={data.blogs}/>} ></Route>

                <Route path='/settings/:address' element={<UserSettings clickMe={clickMeWhenSettingsrender}/>}></Route>

                <Route path='/settings' element={<UserSettings clickMe={clickMeWhenSettingsrender}/>}></Route>

                <Route path="/blog" element={<UserBlog clickMe={clickMeWhenSettingsrender}/>}></Route>

                <Route path="/blog/:task/:id" element={<UserBlog blogs={data.blogs} clickMe={clickMeWhenSettingsrender}/>}></Route>

            </Routes>
        </>
    )
}
