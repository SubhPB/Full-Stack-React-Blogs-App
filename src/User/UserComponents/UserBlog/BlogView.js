' -- Byimaan -- '

import React, { useEffect, useState, useRef } from "react";
import '../../UserCss/blog_view.css';
import { useBlogsManager } from "../../../GlobalStateManagement/StateManagement/BlogsManager";
import { useLoadingManager } from "../../../GlobalStateManagement/StateManagement/LoadingManager";
import gsap from "gsap";

export default function BlogView(){

    const useViewBlog = useBlogsManager().useViewBlog;
    const {loadingManager} = useLoadingManager();
    const [blog,setBlog] = useState(null);
    const divContainer = useRef(null);

    const handelCancel= () => {
        let t1 = gsap.timeline();

        loadingManager.loadingDecoration(3000);
        t1.to(divContainer.current,{
            top: '-100%',
            duration: 2,
            ease: 'power2.inOut',
            onComplete: () => {
                t1.set(divContainer.current,{
                    top: 0,
                })
                useViewBlog.closeBlog();     
            }
        })
    };

    useEffect(() => {

        loadingManager.startLoading();
        const getBlog = useViewBlog.getIfHaveBlog;

        if (getBlog){
            setBlog(getBlog);
        };

        document.body.style.overflow = 'hidden';

        loadingManager.stopLoading(1500);
        return () => {
            document.body.style.overflow = '';
        }
    },[])
    

    if (!blog){
        return (
            <p>No Blog was found</p>
        )
    } 

    return (
        <div ref={divContainer} className="view-card-container">
            <div className="view-body">

                <div onClick={handelCancel} className="view-cancel">
                    <i className="ri-close-line"></i>
                </div>

                <div className="view-title">
                    <h4>{blog?.title}</h4>
                </div>

                <div className="view-middle">
                    <div className="view-img">
                        <div className="view-auth">
                            <p>{blog?.author}</p>
                        </div>
                        <img src={blog?.image} alt="img"/>

                    </div>

                    <div className="side-p">
                        <div className="view-excerpt">
                            <p>{blog?.excerpt}</p>
                        </div>
                        <div className="view-desc">
                            <p>{blog?.content}</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};